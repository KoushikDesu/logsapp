import { Router, Response } from 'express';
import { query } from '../config/db.js';
import { authenticateToken, AuthRequest } from '../middleware/authMiddleware.js';

const router = Router();

function generateGroupRoyalId(): string {
  const min = 1000000;
  const max = 9999999;
  return String(Math.floor(Math.random() * (max - min + 1)) + min);
}

// Ensure Self-Chat ("Message Yourself (You)") exists for the user
async function ensureSelfChat(userId: string): Promise<string> {
  const selfCheck = await query(`
    SELECT c.id FROM chats c
    JOIN chat_participants cp ON cp.chat_id = c.id
    WHERE c.is_group = FALSE
    GROUP BY c.id
    HAVING COUNT(cp.user_id) = 1 AND MAX(cp.user_id) = $1
    LIMIT 1
  `, [userId]);

  if (selfCheck.rows.length > 0) {
    return selfCheck.rows[0].id;
  }

  const newChat = await query(
    `INSERT INTO chats (is_group, created_by, max_storage_bytes)
     VALUES (FALSE, $1, 1073741824)
     RETURNING id`,
    [userId]
  );
  const chatId = newChat.rows[0].id;

  await query(
    `INSERT INTO chat_participants (chat_id, user_id, role)
     VALUES ($1, $2, 'owner')`,
    [chatId, userId]
  );

  return chatId;
}

// Get all chats for current user (Self-chat, 1-on-1, and groups)
router.get('/', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    // Ensure Self-chat is initialized
    await ensureSelfChat(userId);

    const chatsRes = await query(
      `SELECT 
         c.id, 
         c.is_group, 
         c.is_public,
         c.group_royal_id,
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
         -- Check if this is a self-chat (Message yourself)
         ((SELECT COUNT(*) FROM chat_participants cpSelf WHERE cpSelf.chat_id = c.id) = 1 AND c.is_group = FALSE) as is_self,
         -- Get latest message
         (
           SELECT json_build_object(
             'id', m.id,
             'content', m.content,
             'message_type', m.message_type,
             'file_name', m.file_name,
             'file_size_bytes', m.file_size_bytes,
             'sender_id', m.sender_id,
             'is_deleted', m.is_deleted,
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
       ORDER BY 
         -- Keep self-chat prioritized, followed by latest updated chats
         ((SELECT COUNT(*) FROM chat_participants cpSelf WHERE cpSelf.chat_id = c.id) = 1 AND c.is_group = FALSE) DESC,
         c.updated_at DESC`,
      [userId]
    );

    res.json({ chats: chatsRes.rows });
  } catch (error: any) {
    console.error('Error fetching chats:', error);
    res.status(500).json({ error: 'Failed to fetch chats' });
  }
});

// Search Public Groups
router.get('/search/groups', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const q = ((req.query.q as string) || '').trim().replace(/^[#@]+/, '');
    const userId = req.user?.id;

    if (!q) {
      // Return top 15 public groups
      const topGroups = await query(`
        SELECT c.id, c.name, c.description, c.avatar_url, c.group_royal_id, c.is_public, c.created_at,
               (SELECT COUNT(*) FROM chat_participants WHERE chat_id = c.id)::int as participant_count,
               EXISTS(SELECT 1 FROM chat_participants WHERE chat_id = c.id AND user_id = $1) as is_member
        FROM chats c
        WHERE c.is_group = true AND c.is_public = true
        ORDER BY c.updated_at DESC
        LIMIT 15
      `, [userId]);
      res.json({ groups: topGroups.rows });
      return;
    }

    const groupsRes = await query(`
      SELECT c.id, c.name, c.description, c.avatar_url, c.group_royal_id, c.is_public, c.created_at,
             (SELECT COUNT(*) FROM chat_participants WHERE chat_id = c.id)::int as participant_count,
             EXISTS(SELECT 1 FROM chat_participants WHERE chat_id = c.id AND user_id = $1) as is_member
      FROM chats c
      WHERE c.is_group = true AND c.is_public = true
        AND (LOWER(c.name) LIKE LOWER($2) OR c.group_royal_id = $3)
      ORDER BY c.updated_at DESC
      LIMIT 20
    `, [userId, `%${q}%`, q]);

    res.json({ groups: groupsRes.rows });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to search public groups' });
  }
});

// Join a Public Group
router.post('/group/join/:groupId', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const groupId = req.params.groupId as string;
    const userId = req.user?.id;

    const groupCheck = await query('SELECT id, is_public, name FROM chats WHERE id = $1 AND is_group = true', [groupId]);
    if (groupCheck.rows.length === 0) {
      res.status(404).json({ error: 'Group not found' });
      return;
    }

    if (!groupCheck.rows[0].is_public) {
      res.status(403).json({ error: 'This is a private group. You need an invitation from the creator.' });
      return;
    }

    await query(`
      INSERT INTO chat_participants (chat_id, user_id, role)
      VALUES ($1, $2, 'member')
      ON CONFLICT (chat_id, user_id) DO NOTHING
    `, [groupId, userId]);

    res.json({ message: `Successfully joined ${groupCheck.rows[0].name}`, chatId: groupId });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to join group' });
  }
});

// Create or get 1-on-1 direct chat with a user (supports self chat)
router.post('/direct', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { targetUserId } = req.body;

    if (!targetUserId) {
      res.status(400).json({ error: 'targetUserId is required' });
      return;
    }

    // If starting chat with self
    if (userId === targetUserId) {
      const selfChatId = await ensureSelfChat(userId!);
      res.json({ chatId: selfChatId, isNew: false, isSelf: true });
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

// Create Group Chat (Public or Private with 7-digit Group Royal ID)
router.post('/group', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { name, description, avatar_url, member_ids, is_public, max_storage_bytes } = req.body;

    if (!name || !name.trim()) {
      res.status(400).json({ error: 'Group name is required' });
      return;
    }

    const groupAvatar = avatar_url || `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(name.trim())}`;
    const storageLimit = max_storage_bytes ? Number(max_storage_bytes) : 1073741824; // 1 GB default
    const groupRoyalId = generateGroupRoyalId();

    const newGroupRes = await query(
      `INSERT INTO chats (is_group, is_public, group_royal_id, name, description, avatar_url, created_by, max_storage_bytes)
       VALUES (TRUE, $1, $2, $3, $4, $5, $6, $7)
       RETURNING id, is_group, is_public, group_royal_id, name, description, avatar_url, created_by, max_storage_bytes, current_storage_bytes, created_at`,
      [Boolean(is_public), groupRoyalId, name.trim(), description || null, groupAvatar, userId, storageLimit]
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
             ON CONFLICT (chat_id, user_id) DO NOTHING`,
            [group.id, mId]
          );
        }
      }
    }

    res.status(201).json({ group, chat: group });
  } catch (error: any) {
    console.error('Error creating group:', error);
    res.status(500).json({ error: 'Failed to create group' });
  }
});

// Add Members to Group (New members can see past messages)
router.post('/group/:groupId/members', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const groupId = req.params.groupId as string;
    const { userIds } = req.body;

    if (!Array.isArray(userIds) || userIds.length === 0) {
      res.status(400).json({ error: 'userIds array is required' });
      return;
    }

    const groupRes = await query('SELECT is_public, created_by FROM chats WHERE id = $1 AND is_group = true', [groupId]);
    if (groupRes.rows.length === 0) {
      res.status(404).json({ error: 'Group not found' });
      return;
    }

    for (const uId of userIds) {
      await query(`
        INSERT INTO chat_participants (chat_id, user_id, role)
        VALUES ($1, $2, 'member')
        ON CONFLICT (chat_id, user_id) DO NOTHING
      `, [groupId, uId]);
    }

    res.json({ message: 'Members added successfully' });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to add group members' });
  }
});

// Mark chat as read
router.post('/:chatId/read', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const chatId = req.params.chatId as string;
    const userId = req.user?.id;
    await query('UPDATE chat_participants SET last_read_at = NOW() WHERE chat_id = $1 AND user_id = $2', [chatId, userId]);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: 'Failed to mark as read' });
  }
});

export default router;
