import { Router, Response } from 'express';
import { query } from '../config/db.js';
import { authenticateToken, AuthRequest } from '../middleware/authMiddleware.js';

const router = Router();

// Get all chats for current user (1-on-1 and groups)
router.get('/', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;

    const chatsRes = await query(
      `SELECT 
         c.id, 
         c.is_group, 
         c.name, 
         c.description, 
         c.avatar_url, 
         c.created_by, 
         c.max_storage_bytes, 
         c.current_storage_bytes, 
         c.created_at, 
         c.updated_at,
         cp.role as user_role,
         cp.last_read_at,
         -- Get latest message
         (
           SELECT json_build_object(
             'id', m.id,
             'content', m.content,
             'message_type', m.message_type,
             'file_name', m.file_name,
             'file_size_bytes', m.file_size_bytes,
             'sender_id', m.sender_id,
             'created_at', m.created_at
           )
           FROM messages m 
           WHERE m.chat_id = c.id 
           ORDER BY m.created_at DESC 
           LIMIT 1
         ) as last_message,
         -- Unread message count
         (
           SELECT COUNT(*) 
           FROM messages m 
           WHERE m.chat_id = c.id 
             AND m.sender_id != $1 
             AND m.created_at > COALESCE(cp.last_read_at, '1970-01-01'::timestamptz)
         )::int as unread_count,
         -- Get other participants info for 1-on-1 chats
         (
           SELECT json_agg(json_build_object(
             'id', u.id,
             'username', u.username,
             'royal_id', u.royal_id,
             'display_name', u.display_name,
             'avatar_url', u.avatar_url,
             'is_online', u.is_online,
             'last_seen', u.last_seen,
             'role', cp2.role
           ))
           FROM chat_participants cp2
           JOIN users u ON u.id = cp2.user_id
           WHERE cp2.chat_id = c.id AND cp2.user_id != $1
         ) as other_participants,
         -- Total participants count
         (
           SELECT COUNT(*) FROM chat_participants cp3 WHERE cp3.chat_id = c.id
         )::int as participant_count
       FROM chats c
       JOIN chat_participants cp ON cp.chat_id = c.id AND cp.user_id = $1
       ORDER BY c.updated_at DESC`,
      [userId]
    );

    res.json({ chats: chatsRes.rows });
  } catch (error: any) {
    console.error('Error fetching chats:', error);
    res.status(500).json({ error: 'Failed to fetch chats' });
  }
});

// Create or get 1-on-1 direct chat with a user
router.post('/direct', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { targetUserId } = req.body;

    if (!targetUserId) {
      res.status(400).json({ error: 'targetUserId is required' });
      return;
    }

    if (userId === targetUserId) {
      res.status(400).json({ error: 'Cannot start a direct chat with yourself' });
      return;
    }

    // Check if target user exists
    const targetCheck = await query('SELECT id, username, royal_id, display_name, avatar_url FROM users WHERE id = $1', [targetUserId]);
    if (targetCheck.rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // Check if 1-on-1 chat already exists between both users
    const existingChat = await query(
      `SELECT c.id 
       FROM chats c
       JOIN chat_participants cp1 ON cp1.chat_id = c.id AND cp1.user_id = $1
       JOIN chat_participants cp2 ON cp2.chat_id = c.id AND cp2.user_id = $2
       WHERE c.is_group = FALSE
       LIMIT 1`,
      [userId, targetUserId]
    );

    if (existingChat.rows.length > 0) {
      res.json({ chatId: existingChat.rows[0].id, isNew: false });
      return;
    }

    // Create new direct chat
    const newChatRes = await query(
      `INSERT INTO chats (is_group, created_by, max_storage_bytes)
       VALUES (FALSE, $1, 1073741824)
       RETURNING id, is_group, max_storage_bytes, current_storage_bytes, created_at`,
      [userId]
    );
    const newChat = newChatRes.rows[0];

    // Add both participants
    await query(
      `INSERT INTO chat_participants (chat_id, user_id, role)
       VALUES ($1, $2, 'member'), ($1, $3, 'member')`,
      [newChat.id, userId, targetUserId]
    );

    res.status(201).json({ chatId: newChat.id, isNew: true });
  } catch (error: any) {
    console.error('Error creating direct chat:', error);
    res.status(500).json({ error: 'Failed to create direct chat' });
  }
});

// Create Group Chat
router.post('/group', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { name, description, avatar_url, member_ids, max_storage_bytes } = req.body;

    if (!name || !name.trim()) {
      res.status(400).json({ error: 'Group name is required' });
      return;
    }

    const groupAvatar = avatar_url || `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(name)}`;
    const storageLimit = max_storage_bytes ? Number(max_storage_bytes) : 1073741824; // 1 GB default

    const newGroupRes = await query(
      `INSERT INTO chats (is_group, name, description, avatar_url, created_by, max_storage_bytes)
       VALUES (TRUE, $1, $2, $3, $4, $5)
       RETURNING id, is_group, name, description, avatar_url, created_by, max_storage_bytes, current_storage_bytes, created_at`,
      [name.trim(), description || null, groupAvatar, userId, storageLimit]
    );

    const group = newGroupRes.rows[0];

    // Insert creator as admin
    await query(
      `INSERT INTO chat_participants (chat_id, user_id, role)
       VALUES ($1, $2, 'admin')`,
      [group.id, userId]
    );

    // Insert other members
    if (Array.isArray(member_ids) && member_ids.length > 0) {
      for (const mId of member_ids) {
        if (mId !== userId) {
          await query(
            `INSERT INTO chat_participants (chat_id, user_id, role)
             VALUES ($1, $2, 'member')
             ON CONFLICT DO NOTHING`,
            [group.id, mId]
          );
        }
      }
    }

    res.status(201).json({ group });
  } catch (error: any) {
    console.error('Error creating group:', error);
    res.status(500).json({ error: 'Failed to create group' });
  }
});

// Get Chat Details & Participants
router.get('/:chatId', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const chatId = req.params.chatId as string;
    const userId = req.user?.id;

    // Verify membership
    const memberCheck = await query(
      'SELECT role FROM chat_participants WHERE chat_id = $1 AND user_id = $2',
      [chatId, userId]
    );

    if (memberCheck.rows.length === 0) {
      res.status(403).json({ error: 'Not a participant of this chat' });
      return;
    }

    const chatRes = await query(
      `SELECT c.*, 
              (
                SELECT json_agg(json_build_object(
                  'id', u.id,
                  'username', u.username,
                  'royal_id', u.royal_id,
                  'display_name', u.display_name,
                  'avatar_url', u.avatar_url,
                  'is_online', u.is_online,
                  'last_seen', u.last_seen,
                  'role', cp.role,
                  'joined_at', cp.joined_at
                ))
                FROM chat_participants cp
                JOIN users u ON u.id = cp.user_id
                WHERE cp.chat_id = c.id
              ) as participants
       FROM chats c
       WHERE c.id = $1`,
      [chatId]
    );

    if (chatRes.rows.length === 0) {
      res.status(404).json({ error: 'Chat not found' });
      return;
    }

    res.json({ chat: chatRes.rows[0] });
  } catch (error: any) {
    console.error('Error fetching chat details:', error);
    res.status(500).json({ error: 'Failed to fetch chat details' });
  }
});

// Update Chat Settings / Storage limit
router.patch('/:chatId/settings', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const chatId = req.params.chatId as string;
    const userId = req.user?.id;
    const { max_storage_bytes, name, description, avatar_url } = req.body;

    const chatRes = await query('SELECT created_by, is_group FROM chats WHERE id = $1', [chatId]);
    if (chatRes.rows.length === 0) {
      res.status(404).json({ error: 'Chat not found' });
      return;
    }

    const updateRes = await query(
      `UPDATE chats 
       SET max_storage_bytes = COALESCE($1, max_storage_bytes),
           name = COALESCE($2, name),
           description = COALESCE($3, description),
           avatar_url = COALESCE($4, avatar_url),
           updated_at = NOW()
       WHERE id = $5
       RETURNING *`,
      [max_storage_bytes, name, description, avatar_url, chatId]
    );

    res.json({ chat: updateRes.rows[0] });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to update chat settings' });
  }
});

// Add members to group
router.post('/:chatId/members', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const chatId = req.params.chatId as string;
    const { user_ids } = req.body;

    if (!Array.isArray(user_ids) || user_ids.length === 0) {
      res.status(400).json({ error: 'user_ids array required' });
      return;
    }

    for (const uId of user_ids) {
      await query(
        `INSERT INTO chat_participants (chat_id, user_id, role)
         VALUES ($1, $2, 'member')
         ON CONFLICT (chat_id, user_id) DO NOTHING`,
        [chatId, uId]
      );
    }

    res.json({ message: 'Members added successfully' });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to add members' });
  }
});

// Leave / Remove from group
router.delete('/:chatId/members/:targetUserId', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const chatId = req.params.chatId as string;
    const targetUserId = req.params.targetUserId as string;
    const userId = req.user?.id;

    if (userId !== targetUserId) {
      // Check if admin
      const adminCheck = await query(
        "SELECT role FROM chat_participants WHERE chat_id = $1 AND user_id = $2 AND role = 'admin'",
        [chatId, userId]
      );
      if (adminCheck.rows.length === 0) {
        res.status(403).json({ error: 'Only admins can remove members' });
        return;
      }
    }

    await query('DELETE FROM chat_participants WHERE chat_id = $1 AND user_id = $2', [chatId, targetUserId]);
    res.json({ message: 'Participant removed' });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to remove member' });
  }
});

export default router;
