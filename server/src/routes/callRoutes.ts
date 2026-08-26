import { Router, Response } from 'express';
import { query } from '../config/db.js';
import { authenticateToken, AuthRequest } from '../middleware/authMiddleware.js';

const router = Router();

// Check for any Incoming Call for Current User across all their chats
router.get('/incoming', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;

    // Find any active/ringing call in user's chats created in the last 60 seconds
    const callRes = await query(`
      SELECT c.*, 
             u1.display_name as caller_name, u1.username as caller_username, u1.avatar_url as caller_avatar, u1.royal_id as caller_royal_id,
             u2.display_name as receiver_name, u2.username as receiver_username, u2.avatar_url as receiver_avatar
      FROM calls c
      JOIN chat_participants cp ON cp.chat_id = c.chat_id AND cp.user_id = $1
      JOIN users u1 ON u1.id = c.caller_id
      LEFT JOIN users u2 ON u2.id = c.receiver_id
      WHERE c.status IN ('ringing', 'accepted')
        AND c.created_at > NOW() - INTERVAL '2 minutes'
      ORDER BY c.created_at DESC
      LIMIT 1
    `, [userId]);

    if (callRes.rows.length === 0) {
      res.json({ activeCall: null });
      return;
    }

    res.json({ activeCall: callRes.rows[0] });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch incoming calls' });
  }
});

// Initiate an Audio Call (with SDP offer)
router.post('/initiate', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const callerId = req.user?.id;
    let { chatId, receiverId, sdpOffer } = req.body;

    if (!chatId || !sdpOffer) {
      res.status(400).json({ error: 'chatId and sdpOffer are required' });
      return;
    }

    // Auto-detect receiver if not passed
    if (!receiverId) {
      const partRes = await query(
        'SELECT user_id FROM chat_participants WHERE chat_id = $1 AND user_id != $2 LIMIT 1',
        [chatId, callerId]
      );
      if (partRes.rows.length > 0) {
        receiverId = partRes.rows[0].user_id;
      }
    }

    // End any existing ringing/active calls in this chat
    await query(`
      UPDATE calls SET status = 'ended', ended_at = NOW()
      WHERE chat_id = $1 AND status IN ('ringing', 'accepted')
    `, [chatId]);

    const callRes = await query(`
      INSERT INTO calls (chat_id, caller_id, receiver_id, status, sdp_offer)
      VALUES ($1, $2, $3, 'ringing', $4)
      RETURNING *
    `, [chatId, callerId, receiverId || null, JSON.stringify(sdpOffer)]);

    const call = callRes.rows[0];

    // Fetch caller & receiver display info
    const fullCallRes = await query(`
      SELECT c.*, 
             u1.display_name as caller_name, u1.avatar_url as caller_avatar, u1.royal_id as caller_royal_id,
             u2.display_name as receiver_name, u2.avatar_url as receiver_avatar
      FROM calls c
      JOIN users u1 ON u1.id = c.caller_id
      LEFT JOIN users u2 ON u2.id = c.receiver_id
      WHERE c.id = $1
    `, [call.id]);

    res.status(201).json({ call: fullCallRes.rows[0] });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to initiate call', details: error.message });
  }
});

// Check Active Call in Chat
router.get('/status/:chatId', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const chatId = req.params.chatId as string;
    const callRes = await query(`
      SELECT c.*, 
             u1.display_name as caller_name, u1.avatar_url as caller_avatar, u1.royal_id as caller_royal_id,
             u2.display_name as receiver_name, u2.avatar_url as receiver_avatar
      FROM calls c
      JOIN users u1 ON u1.id = c.caller_id
      LEFT JOIN users u2 ON u2.id = c.receiver_id
      WHERE c.chat_id = $1 AND c.status IN ('ringing', 'accepted')
        AND c.created_at > NOW() - INTERVAL '5 minutes'
      ORDER BY c.created_at DESC
      LIMIT 1
    `, [chatId]);

    if (callRes.rows.length === 0) {
      res.json({ activeCall: null });
      return;
    }

    res.json({ activeCall: callRes.rows[0] });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch call status' });
  }
});

// Answer Call (with SDP answer)
router.post('/answer/:callId', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const callId = req.params.callId as string;
    const { sdpAnswer } = req.body;

    const updateRes = await query(`
      UPDATE calls
      SET status = 'accepted', sdp_answer = $1
      WHERE id = $2 AND status = 'ringing'
      RETURNING *
    `, [JSON.stringify(sdpAnswer), callId]);

    if (updateRes.rows.length === 0) {
      res.status(404).json({ error: 'Call not found or already answered/ended' });
      return;
    }

    const fullCallRes = await query(`
      SELECT c.*, 
             u1.display_name as caller_name, u1.avatar_url as caller_avatar, u1.royal_id as caller_royal_id,
             u2.display_name as receiver_name, u2.avatar_url as receiver_avatar
      FROM calls c
      JOIN users u1 ON u1.id = c.caller_id
      LEFT JOIN users u2 ON u2.id = c.receiver_id
      WHERE c.id = $1
    `, [callId]);

    res.json({ call: fullCallRes.rows[0] });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to answer call' });
  }
});

// Send ICE Candidate
router.post('/ice-candidate/:callId', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const callId = req.params.callId as string;
    const { candidate, sender } = req.body;

    await query(`
      UPDATE calls
      SET ice_candidates = ice_candidates || $1::jsonb
      WHERE id = $2
    `, [JSON.stringify([{ candidate, sender, timestamp: Date.now() }]), callId]);

    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to add ICE candidate' });
  }
});

// End / Decline Call
router.post('/end/:callId', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const callId = req.params.callId as string;
    const { status } = req.body; // 'rejected' or 'ended'

    await query(`
      UPDATE calls
      SET status = $1, ended_at = NOW()
      WHERE id = $2
    `, [status || 'ended', callId]);

    res.json({ message: 'Call ended' });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to end call' });
  }
});

export default router;
