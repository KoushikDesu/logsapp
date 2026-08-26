import { Router, Response } from 'express';
import { query } from '../config/db.js';
import { authenticateToken, AuthRequest } from '../middleware/authMiddleware.js';

const router = Router();

// Submit a report against another user (e.g. for blackmail, abuse, spam) with recent chat snapshot
router.post('/', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const reporterId = req.user?.id;
    const { reportedUserId, chatId, reason, description } = req.body;

    if (!reportedUserId || !reason) {
      res.status(400).json({ error: 'Reported user ID and reason are required' });
      return;
    }

    if (reportedUserId === reporterId) {
      res.status(400).json({ error: 'You cannot report yourself' });
      return;
    }

    // Capture recent chat history snapshot if chatId is provided
    let chatSnapshot: any[] = [];
    if (chatId) {
      const msgsRes = await query(`
        SELECT m.id, m.content, m.message_type, m.file_name, m.created_at,
               u.username as sender_username, u.display_name as sender_display_name, u.royal_id as sender_royal_id
        FROM messages m
        JOIN users u ON u.id = m.sender_id
        WHERE m.chat_id = $1
        ORDER BY m.created_at DESC
        LIMIT 50
      `, [chatId]);
      chatSnapshot = msgsRes.rows.reverse();
    }

    const insertRes = await query(`
      INSERT INTO reports (reporter_id, reported_user_id, chat_id, reason, description, chat_snapshot)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `, [reporterId, reportedUserId, chatId || null, reason, description || '', JSON.stringify(chatSnapshot)]);

    res.status(201).json({
      message: 'Report submitted successfully to administrators. We take safety very seriously.',
      report: insertRes.rows[0]
    });
  } catch (error: any) {
    console.error('Report submission error:', error);
    res.status(500).json({ error: 'Failed to submit report', details: error.message });
  }
});

export default router;
