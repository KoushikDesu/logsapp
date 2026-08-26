import { Router, Response } from 'express';
import { query } from '../config/db.js';
import { authenticateToken, AuthRequest } from '../middleware/authMiddleware.js';
import { checkAndPurgeChatStorage } from '../services/storagePurgeService.js';

const router = Router();

// Get Messages for a chat
router.get('/:chatId', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const chatId = req.params.chatId as string;
    const userId = req.user?.id;
    const limit = parseInt(req.query.limit as string) || 60;
    const before = req.query.before as string;

    // Check membership
    const memberCheck = await query(
      'SELECT id FROM chat_participants WHERE chat_id = $1 AND user_id = $2',
      [chatId, userId]
    );

    if (memberCheck.rows.length === 0) {
      res.status(403).json({ error: 'Not a member of this chat' });
      return;
    }

    // Check if user cleared this chat
    const clearCheck = await query(
      'SELECT cleared_at FROM cleared_chats WHERE user_id = $1 AND chat_id = $2',
      [userId, chatId]
    );
    const clearedAt = clearCheck.rows[0]?.cleared_at || null;

    let sql = `
      SELECT 
        m.id,
        m.chat_id,
        m.sender_id,
        m.content,
        m.message_type,
        m.file_id,
        m.file_name,
        m.file_path,
        m.file_size_bytes,
        m.file_mime_type,
        m.quick_code,
        m.is_purged,
        m.is_deleted,
        m.forwarded_from_id,
        m.created_at,
        u.username as sender_username,
        u.display_name as sender_display_name,
        u.avatar_url as sender_avatar_url,
        u.royal_id as sender_royal_id,
        (
          SELECT json_agg(json_build_object(
            'emoji', mr.emoji,
            'user_id', mr.user_id,
            'username', ru.username
          ))
          FROM message_reactions mr
          JOIN users ru ON ru.id = mr.user_id
          WHERE mr.message_id = m.id
        ) as reactions
      FROM messages m
      LEFT JOIN users u ON u.id = m.sender_id
      WHERE m.chat_id = $1
    `;

    const params: any[] = [chatId];

    if (clearedAt) {
      params.push(clearedAt);
      sql += ` AND m.created_at > $${params.length}`;
    }

    if (before) {
      params.push(before);
      sql += ` AND m.created_at < $${params.length}`;
    }

    sql += ` ORDER BY m.created_at DESC LIMIT $${params.length + 1}`;
    params.push(limit);

    const msgsRes = await query(sql, params);

    // Update last_read_at
    await query(
      'UPDATE chat_participants SET last_read_at = NOW() WHERE chat_id = $1 AND user_id = $2',
      [chatId, userId]
    );

    // Return in chronological order
    const messages = msgsRes.rows.reverse();

    res.json({ messages });
  } catch (error: any) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Send Text Message (with Block Check)
router.post('/:chatId', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const chatId = req.params.chatId as string;
    const userId = req.user?.id;
    const { content } = req.body;

    if (!content || !content.trim()) {
      res.status(400).json({ error: 'Message content cannot be empty' });
      return;
    }

    // Verify membership
    const memberCheck = await query(
      'SELECT id FROM chat_participants WHERE chat_id = $1 AND user_id = $2',
      [chatId, userId]
    );

    if (memberCheck.rows.length === 0) {
      res.status(403).json({ error: 'Not a member of this chat' });
      return;
    }

    // Check if other participant in 1-on-1 chat has blocked sender or sender is blocked
    const chatInfo = await query('SELECT is_group FROM chats WHERE id = $1', [chatId]);
    if (!chatInfo.rows[0]?.is_group) {
      const otherPart = await query(
        'SELECT user_id FROM chat_participants WHERE chat_id = $1 AND user_id != $2',
        [chatId, userId]
      );
      if (otherPart.rows.length > 0) {
        const otherId = otherPart.rows[0].user_id;
        const blockCheck = await query(`
          SELECT id FROM user_blocks 
          WHERE (blocker_id = $1 AND blocked_id = $2)
             OR (blocker_id = $2 AND blocked_id = $1)
        `, [otherId, userId]);

        if (blockCheck.rows.length > 0) {
          res.status(403).json({ error: 'Cannot send message: conversation is blocked' });
          return;
        }
      }
    }

    const insertRes = await query(
      `INSERT INTO messages (chat_id, sender_id, content, message_type)
       VALUES ($1, $2, $3, 'text')
       RETURNING *`,
      [chatId, userId, content.trim()]
    );

    const message = insertRes.rows[0];

    // Update chat updated_at
    await query('UPDATE chats SET updated_at = NOW() WHERE id = $1', [chatId]);

    // Check storage limits
    checkAndPurgeChatStorage(chatId).catch(console.error);

    const senderRes = await query('SELECT username, display_name, royal_id, avatar_url FROM users WHERE id = $1', [userId]);
    const sender = senderRes.rows[0];

    res.status(201).json({
      message: {
        ...message,
        sender_username: sender.username,
        sender_display_name: sender.display_name,
        sender_avatar_url: sender.avatar_url,
        sender_royal_id: sender.royal_id,
        reactions: []
      }
    });
  } catch (error: any) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Forward Message
router.post('/:messageId/forward', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const messageId = req.params.messageId as string;
    const userId = req.user?.id;
    const { targetChatIds } = req.body; // Array of chat IDs

    if (!Array.isArray(targetChatIds) || targetChatIds.length === 0) {
      res.status(400).json({ error: 'targetChatIds array is required' });
      return;
    }

    const originalMsgRes = await query('SELECT * FROM messages WHERE id = $1', [messageId]);
    if (originalMsgRes.rows.length === 0) {
      res.status(404).json({ error: 'Original message not found' });
      return;
    }

    const orig = originalMsgRes.rows[0];
    const forwardedMessages = [];

    for (const targetChatId of targetChatIds) {
      const memberCheck = await query(
        'SELECT id FROM chat_participants WHERE chat_id = $1 AND user_id = $2',
        [targetChatId, userId]
      );
      if (memberCheck.rows.length === 0) continue;

      const fwdRes = await query(`
        INSERT INTO messages (
          chat_id, sender_id, content, message_type,
          file_id, file_name, file_path, file_size_bytes, file_mime_type, quick_code,
          forwarded_from_id
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING *
      `, [
        targetChatId,
        userId,
        orig.content,
        orig.message_type,
        orig.file_id,
        orig.file_name,
        orig.file_path,
        orig.file_size_bytes,
        orig.file_mime_type,
        orig.quick_code,
        orig.sender_id
      ]);

      await query('UPDATE chats SET updated_at = NOW() WHERE id = $1', [targetChatId]);
      forwardedMessages.push(fwdRes.rows[0]);
    }

    res.json({ message: 'Message forwarded successfully', forwardedCount: forwardedMessages.length });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to forward message' });
  }
});

// Clear Chat History for Current User
router.post('/clear/:chatId', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const chatId = req.params.chatId as string;
    const userId = req.user?.id;

    await query(`
      INSERT INTO cleared_chats (user_id, chat_id, cleared_at)
      VALUES ($1, $2, NOW())
      ON CONFLICT (user_id, chat_id)
      DO UPDATE SET cleared_at = NOW()
    `, [userId, chatId]);

    res.json({ message: 'Chat cleared successfully' });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to clear chat' });
  }
});

// Delete Message for Everyone
router.delete('/:messageId', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const messageId = req.params.messageId as string;
    const userId = req.user?.id;

    const msgRes = await query('SELECT sender_id, chat_id FROM messages WHERE id = $1', [messageId]);
    if (msgRes.rows.length === 0) {
      res.status(404).json({ error: 'Message not found' });
      return;
    }

    if (msgRes.rows[0].sender_id !== userId) {
      const adminCheck = await query(
        "SELECT role FROM chat_participants WHERE chat_id = $1 AND user_id = $2 AND role = 'admin'",
        [msgRes.rows[0].chat_id, userId]
      );
      if (adminCheck.rows.length === 0 && req.user?.role !== 'admin') {
        res.status(403).json({ error: 'Unauthorized to delete this message' });
        return;
      }
    }

    await query(`
      UPDATE messages 
      SET content = '🚫 This message was deleted', 
          is_deleted = TRUE,
          file_name = NULL,
          file_path = NULL 
      WHERE id = $1
    `, [messageId]);

    res.json({ message: 'Message deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to delete message' });
  }
});

// Reactions
router.post('/reactions/:messageId', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const messageId = req.params.messageId as string;
    const userId = req.user?.id;
    const { emoji } = req.body;

    if (!emoji) {
      res.status(400).json({ error: 'Emoji is required' });
      return;
    }

    const existing = await query(
      'SELECT id FROM message_reactions WHERE message_id = $1 AND user_id = $2 AND emoji = $3',
      [messageId, userId, emoji]
    );

    if (existing.rows.length > 0) {
      await query('DELETE FROM message_reactions WHERE id = $1', [existing.rows[0].id]);
      res.json({ action: 'removed', emoji });
    } else {
      await query(
        'INSERT INTO message_reactions (message_id, user_id, emoji) VALUES ($1, $2, $3)',
        [messageId, userId, emoji]
      );
      res.json({ action: 'added', emoji });
    }
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to update reaction' });
  }
});

export default router;
