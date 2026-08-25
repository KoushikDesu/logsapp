import { Router, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { query } from '../config/db.js';
import { authenticateToken, AuthRequest } from '../middleware/authMiddleware.js';
import { checkAndPurgeChatStorage, recalculateChatStorage } from '../services/storagePurgeService.js';

const router = Router();
const uploadDir = path.resolve(process.env.UPLOAD_DIR || './uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Generate QuickCode for CLI & Quick Access
function generateQuickCode(): string {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `LGS-${code}`;
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${uuidv4()}${ext}`;
    cb(null, uniqueName);
  }
});

// Up to 1GB limit (1024 * 1024 * 1024 bytes)
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 1024, // 1GB
  }
});

// Helper to determine message type
function getMessageType(mimeType: string, filename: string): string {
  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType.startsWith('video/')) return 'video';
  if (mimeType.startsWith('audio/')) return 'audio';
  const ext = path.extname(filename).toLowerCase();
  if (['.zip', '.rar', '.tar', '.gz', '.7z'].includes(ext)) return 'archive';
  if (['.pdf', '.docx', '.xlsx', '.pptx', '.txt', '.csv'].includes(ext)) return 'document';
  return 'file';
}

// Upload file to chat (Supports up to 1GB files, pictures, videos, audio)
router.post('/upload/:chatId', authenticateToken, upload.single('file'), async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const chatId = req.params.chatId as string;
    const userId = req.user?.id;
    const file = req.file;

    if (!file) {
      res.status(400).json({ error: 'No file uploaded or file exceeds 1GB limit' });
      return;
    }

    // Verify membership
    const memberCheck = await query(
      'SELECT id FROM chat_participants WHERE chat_id = $1 AND user_id = $2',
      [chatId, userId]
    );

    if (memberCheck.rows.length === 0) {
      // Remove uploaded file if not permitted
      if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
      res.status(403).json({ error: 'Not a member of this chat' });
      return;
    }

    const messageType = getMessageType(file.mimetype, file.originalname);
    const quickCode = generateQuickCode();
    const fileId = uuidv4();

    // Insert Message Record
    const insertRes = await query(
      `INSERT INTO messages (
        chat_id, sender_id, content, message_type, 
        file_id, file_name, file_path, file_size_bytes, file_mime_type, quick_code
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *`,
      [
        chatId,
        userId,
        req.body.caption || file.originalname,
        messageType,
        fileId,
        file.originalname,
        file.path,
        file.size,
        file.mimetype,
        quickCode
      ]
    );

    const message = insertRes.rows[0];

    // Update user & chat storage
    await query(
      'UPDATE users SET storage_used_bytes = storage_used_bytes + $1 WHERE id = $2',
      [file.size, userId]
    );
    await query(
      'UPDATE chats SET current_storage_bytes = current_storage_bytes + $1, updated_at = NOW() WHERE id = $2',
      [file.size, chatId]
    );

    // Trigger auto-purge check in background to enforce storage limit
    checkAndPurgeChatStorage(chatId).catch(console.error);

    // Fetch sender info
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
      },
      quickCode,
      fileUrl: `/api/files/download/${message.id}`
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'File upload failed', details: error.message });
  }
});

// Download / Stream File by Message ID
router.get('/download/:messageId', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const messageId = req.params.messageId as string;

    const msgRes = await query(
      'SELECT file_name, file_path, file_mime_type, file_size_bytes, is_purged FROM messages WHERE id = $1 OR file_id = $1',
      [messageId]
    );

    if (msgRes.rows.length === 0) {
      res.status(404).json({ error: 'File not found' });
      return;
    }

    const { file_name, file_path, file_mime_type, file_size_bytes, is_purged } = msgRes.rows[0];

    if (is_purged || !file_path || !fs.existsSync(file_path)) {
      res.status(410).json({ error: 'This file has expired or was automatically purged to save storage limit' });
      return;
    }

    const stat = fs.statSync(file_path);
    const fileSize = stat.size;
    const range = req.headers.range;

    // Support HTTP Range Requests (Essential for streaming videos/audio smoothly)
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = (end - start) + 1;
      const fileStream = fs.createReadStream(file_path, { start, end });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': file_mime_type || 'application/octet-stream',
      };
      res.writeHead(206, head);
      fileStream.pipe(res);
    } else {
      res.setHeader('Content-Length', fileSize);
      res.setHeader('Content-Type', file_mime_type || 'application/octet-stream');
      res.setHeader('Content-Disposition', `inline; filename="${encodeURIComponent(file_name)}"`);
      const fileStream = fs.createReadStream(file_path);
      fileStream.pipe(res);
    }
  } catch (error: any) {
    console.error('Download error:', error);
    res.status(500).json({ error: 'Failed to download file' });
  }
});

// Quick Access by 6-digit QuickCode (For CLI and direct links)
router.get('/quick/:quickCode', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const quickCode = (req.params.quickCode as string).toUpperCase().trim();

    const msgRes = await query(
      `SELECT m.id, m.file_name, m.file_path, m.file_mime_type, m.file_size_bytes, m.is_purged, m.created_at,
              u.username as sender_username, u.royal_id as sender_royal_id
       FROM messages m
       LEFT JOIN users u ON u.id = m.sender_id
       WHERE UPPER(m.quick_code) = $1`,
      [quickCode]
    );

    if (msgRes.rows.length === 0) {
      res.status(404).json({ error: 'Invalid or expired QuickCode' });
      return;
    }

    const file = msgRes.rows[0];

    // If query ?download=true is passed, pipe the file directly
    if (req.query.download === 'true') {
      if (file.is_purged || !file.file_path || !fs.existsSync(file.file_path)) {
        res.status(410).json({ error: 'File purged to maintain storage quota' });
        return;
      }
      res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(file.file_name)}"`);
      res.setHeader('Content-Type', file.file_mime_type || 'application/octet-stream');
      res.setHeader('Content-Length', file.file_size_bytes);
      fs.createReadStream(file.file_path).pipe(res);
      return;
    }

    res.json({
      file: {
        id: file.id,
        name: file.file_name,
        size: file.file_size_bytes,
        mimeType: file.file_mime_type,
        sender: file.sender_username,
        royalId: file.sender_royal_id,
        isPurged: file.is_purged,
        createdAt: file.created_at,
        downloadUrl: `/api/files/download/${file.id}`
      }
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Quick access failed' });
  }
});

// List all files shared in a specific chat
router.get('/chat/:chatId', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const chatId = req.params.chatId as string;
    const userId = req.user?.id;

    // Verify membership
    const memberCheck = await query(
      'SELECT id FROM chat_participants WHERE chat_id = $1 AND user_id = $2',
      [chatId, userId]
    );

    if (memberCheck.rows.length === 0) {
      res.status(403).json({ error: 'Not a member of this chat' });
      return;
    }

    const filesRes = await query(
      `SELECT m.id, m.file_id, m.file_name, m.file_mime_type, m.file_size_bytes, m.message_type, 
              m.quick_code, m.created_at, m.is_purged,
              u.username as sender_username, u.royal_id as sender_royal_id
       FROM messages m
       LEFT JOIN users u ON u.id = m.sender_id
       WHERE m.chat_id = $1 AND m.file_name IS NOT NULL
       ORDER BY m.created_at DESC`,
      [chatId]
    );

    res.json({ files: filesRes.rows });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch files' });
  }
});

export default router;
