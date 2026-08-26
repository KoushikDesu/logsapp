import { Router, Response } from 'express';
import bcrypt from 'bcryptjs';
import { query } from '../config/db.js';
import { authenticateToken, AuthRequest } from '../middleware/authMiddleware.js';

const router = Router();

// Middleware: Require Admin role
const requireAdmin = (req: AuthRequest, res: Response, next: Function) => {
  if (req.user?.role !== 'admin' && req.user?.username !== 'admin') {
    res.status(403).json({ error: 'Access denied: Administrator privileges required' });
    return;
  }
  next();
};

// Get Admin Overview Stats & Reports
router.get('/stats', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userCount = await query('SELECT COUNT(*) FROM users');
    const chatCount = await query('SELECT COUNT(*) FROM chats');
    const messageCount = await query('SELECT COUNT(*) FROM messages');
    const reportCount = await query('SELECT COUNT(*) FROM reports WHERE status = $1', ['pending']);
    const storageSum = await query('SELECT COALESCE(SUM(storage_used_bytes), 0) as total_bytes FROM users');

    res.json({
      stats: {
        totalUsers: Number(userCount.rows[0].count),
        totalChats: Number(chatCount.rows[0].count),
        totalMessages: Number(messageCount.rows[0].count),
        pendingReports: Number(reportCount.rows[0].count),
        totalStorageBytes: Number(storageSum.rows[0].total_bytes)
      }
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch admin stats' });
  }
});

// List All Reports (with Reporter, Reported User, and Snapshot)
router.get('/reports', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const reportsRes = await query(`
      SELECT r.id, r.reason, r.description, r.chat_snapshot, r.status, r.created_at,
             u1.id as reporter_id, u1.username as reporter_username, u1.display_name as reporter_name, u1.royal_id as reporter_royal_id,
             u2.id as reported_id, u2.username as reported_username, u2.display_name as reported_name, u2.royal_id as reported_royal_id, u2.is_blocked as reported_is_blocked
      FROM reports r
      JOIN users u1 ON u1.id = r.reporter_id
      JOIN users u2 ON u2.id = r.reported_user_id
      ORDER BY r.created_at DESC
    `);

    res.json({ reports: reportsRes.rows });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch reports' });
  }
});

// Resolve/Dismiss a Report
router.put('/reports/:id/resolve', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const reportId = req.params.id as string;
    const { status } = req.body; // 'resolved', 'dismissed'

    await query(`
      UPDATE reports SET status = $1 WHERE id = $2
    `, [status || 'resolved', reportId]);

    res.json({ message: `Report marked as ${status || 'resolved'}` });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to update report status' });
  }
});

// List All Users for Admin
router.get('/users', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const usersRes = await query(`
      SELECT id, username, royal_id, display_name, email, role, avatar_url, 
             storage_used_bytes, storage_limit_bytes, is_blocked, last_active_at, created_at
      FROM users
      ORDER BY created_at DESC
    `);

    res.json({ users: usersRes.rows });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Edit User Details (Name, Role, Storage limit, Block/Unblock, Password Reset)
router.put('/users/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const targetUserId = req.params.id as string;
    const { display_name, role, is_blocked, storage_limit_bytes, new_password } = req.body;

    let passwordHash = null;
    if (new_password) {
      const salt = await bcrypt.genSalt(10);
      passwordHash = await bcrypt.hash(new_password, salt);
    }

    const updateRes = await query(`
      UPDATE users
      SET display_name = COALESCE($1, display_name),
          role = COALESCE($2, role),
          is_blocked = COALESCE($3, is_blocked),
          storage_limit_bytes = COALESCE($4, storage_limit_bytes),
          password_hash = COALESCE($5, password_hash),
          updated_at = NOW()
      WHERE id = $6
      RETURNING id, username, royal_id, display_name, role, is_blocked, storage_limit_bytes
    `, [
      display_name || null,
      role || null,
      typeof is_blocked === 'boolean' ? is_blocked : null,
      storage_limit_bytes || null,
      passwordHash,
      targetUserId
    ]);

    res.json({ message: 'User updated successfully', user: updateRes.rows[0] });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Delete User
router.delete('/users/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const targetUserId = req.params.id as string;

    await query('DELETE FROM users WHERE id = $1', [targetUserId]);

    res.json({ message: 'User deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// Admin Broadcast / Direct Message to Any User
router.post('/message/:targetUserId', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const adminId = req.user?.id;
    const targetUserId = req.params.targetUserId as string;
    const { content } = req.body;

    if (!content) {
      res.status(400).json({ error: 'Message content is required' });
      return;
    }

    // Find or create direct chat between admin and target user
    let chatRes = await query(`
      SELECT c.id FROM chats c
      JOIN chat_participants cp1 ON cp1.chat_id = c.id AND cp1.user_id = $1
      JOIN chat_participants cp2 ON cp2.chat_id = c.id AND cp2.user_id = $2
      WHERE c.is_group = false
      LIMIT 1
    `, [adminId, targetUserId]);

    let chatId = chatRes.rows[0]?.id;
    if (!chatId) {
      const newChat = await query('INSERT INTO chats (is_group, created_by) VALUES (false, $1) RETURNING id', [adminId]);
      chatId = newChat.rows[0].id;
      await query('INSERT INTO chat_participants (chat_id, user_id, role) VALUES ($1, $2, $3), ($1, $4, $5)', [chatId, adminId, 'admin', targetUserId, 'member']);
    }

    const msgRes = await query(`
      INSERT INTO messages (chat_id, sender_id, content, message_type)
      VALUES ($1, $2, $3, 'text')
      RETURNING *
    `, [chatId, adminId, `🛡️ [ADMIN NOTICE]: ${content}`]);

    res.json({ message: 'Admin message sent', sentMessage: msgRes.rows[0], chatId });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to send admin message' });
  }
});

export default router;
