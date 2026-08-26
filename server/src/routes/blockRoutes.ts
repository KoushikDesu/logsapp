import { Router, Response } from 'express';
import { query } from '../config/db.js';
import { authenticateToken, AuthRequest } from '../middleware/authMiddleware.js';

const router = Router();

// Get list of users blocked by the current user
router.get('/', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const blocksRes = await query(`
      SELECT b.id, b.blocked_id, b.created_at,
             u.username, u.display_name, u.royal_id, u.avatar_url
      FROM user_blocks b
      JOIN users u ON u.id = b.blocked_id
      WHERE b.blocker_id = $1
      ORDER BY b.created_at DESC
    `, [userId]);

    res.json({ blockedUsers: blocksRes.rows });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch blocked users' });
  }
});

// Block a user
router.post('/:targetUserId', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const targetUserId = req.params.targetUserId as string;

    if (userId === targetUserId) {
      res.status(400).json({ error: 'You cannot block yourself' });
      return;
    }

    await query(`
      INSERT INTO user_blocks (blocker_id, blocked_id)
      VALUES ($1, $2)
      ON CONFLICT (blocker_id, blocked_id) DO NOTHING
    `, [userId, targetUserId]);

    res.json({ message: 'User blocked successfully' });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to block user' });
  }
});

// Unblock a user
router.delete('/:targetUserId', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const targetUserId = req.params.targetUserId as string;

    await query(`
      DELETE FROM user_blocks
      WHERE blocker_id = $1 AND blocked_id = $2
    `, [userId, targetUserId]);

    res.json({ message: 'User unblocked successfully' });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to unblock user' });
  }
});

export default router;
