import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../config/db.js';
import { authenticateToken, AuthRequest } from '../middleware/authMiddleware.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'logsapp_royal_secret_jwt_key_2026_super_secure_token';

// CLI Login endpoint
router.post('/auth', async (req: Request, res: Response): Promise<void> => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      res.status(400).json({ success: false, error: 'Identifier (Username / RoyalID) and password are required' });
      return;
    }

    const userRes = await query(
      `SELECT id, username, royal_id, display_name, password_hash, storage_limit_bytes, storage_used_bytes 
       FROM users 
       WHERE LOWER(username) = LOWER($1) OR UPPER(royal_id) = UPPER($1)`,
      [identifier.trim()]
    );

    if (userRes.rows.length === 0) {
      res.status(401).json({ success: false, error: 'Invalid credentials' });
      return;
    }

    const user = userRes.rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      res.status(401).json({ success: false, error: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, royal_id: user.royal_id, display_name: user.display_name },
      JWT_SECRET,
      { expiresIn: '180d' } // Long lived session for CLI
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        royal_id: user.royal_id,
        display_name: user.display_name,
        storage_used_mb: (Number(user.storage_used_bytes) / (1024 * 1024)).toFixed(2),
        storage_limit_mb: (Number(user.storage_limit_bytes) / (1024 * 1024)).toFixed(2)
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// CLI Chat list
router.get('/chats', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;

    const chatsRes = await query(
      `SELECT 
         c.id, 
         c.is_group, 
         c.name, 
         c.max_storage_bytes,
         c.current_storage_bytes,
         c.updated_at,
         (
           SELECT u.username 
           FROM chat_participants cp2 
           JOIN users u ON u.id = cp2.user_id 
           WHERE cp2.chat_id = c.id AND cp2.user_id != $1
           LIMIT 1
         ) as direct_username,
         (
           SELECT u.royal_id 
           FROM chat_participants cp2 
           JOIN users u ON u.id = cp2.user_id 
           WHERE cp2.chat_id = c.id AND cp2.user_id != $1
           LIMIT 1
         ) as direct_royal_id,
         (
           SELECT COUNT(*) FROM messages m 
           WHERE m.chat_id = c.id AND m.sender_id != $1 
             AND m.created_at > COALESCE(cp.last_read_at, '1970-01-01'::timestamptz)
         )::int as unread_count,
         (
           SELECT m.content FROM messages m WHERE m.chat_id = c.id ORDER BY m.created_at DESC LIMIT 1
         ) as last_msg
       FROM chats c
       JOIN chat_participants cp ON cp.chat_id = c.id AND cp.user_id = $1
       ORDER BY c.updated_at DESC`,
      [userId]
    );

    const formatted = chatsRes.rows.map(row => ({
      id: row.id,
      name: row.is_group ? `[Group] ${row.name}` : `@${row.direct_username} (${row.direct_royal_id})`,
      is_group: row.is_group,
      target_username: row.direct_username,
      target_royal_id: row.direct_royal_id,
      unread: row.unread_count,
      last_message: row.last_msg || '(No messages yet)',
      storage_used_mb: (Number(row.current_storage_bytes) / (1024 * 1024)).toFixed(2),
      storage_limit_mb: (Number(row.max_storage_bytes) / (1024 * 1024)).toFixed(2),
      updated_at: row.updated_at
    }));

    res.json({ success: true, chats: formatted });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// CLI Chat History
router.get('/history/:chatIdOrUsername', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const chatIdOrUsername = (req.params.chatIdOrUsername as string) || '';
    const userId = req.user?.id;
    const limit = parseInt(req.query.limit as string) || 30;

    let chatId: string = chatIdOrUsername;

    // Check if target is a username or RoyalID instead of UUID
    if (!chatId.match(/^[0-9a-fA-F-]{36}$/)) {
      const targetUser = await query(
        'SELECT id FROM users WHERE LOWER(username) = LOWER($1) OR UPPER(royal_id) = UPPER($1)',
        [chatIdOrUsername]
      );
      if (targetUser.rows.length === 0) {
        res.status(404).json({ success: false, error: `User or Chat '${chatIdOrUsername}' not found` });
        return;
      }
      const targetUserId = targetUser.rows[0].id;
      const findChat = await query(
        `SELECT c.id FROM chats c
         JOIN chat_participants cp1 ON cp1.chat_id = c.id AND cp1.user_id = $1
         JOIN chat_participants cp2 ON cp2.chat_id = c.id AND cp2.user_id = $2
         WHERE c.is_group = FALSE LIMIT 1`,
        [userId, targetUserId]
      );
      if (findChat.rows.length === 0) {
        res.status(404).json({ success: false, error: `No chat found with user '${chatIdOrUsername}'. Start one first!` });
        return;
      }
      chatId = findChat.rows[0].id;
    }

    const msgsRes = await query(
      `SELECT m.id, m.content, m.message_type, m.file_name, m.file_size_bytes, m.quick_code, m.created_at, m.is_purged,
              u.username, u.royal_id
       FROM messages m
       LEFT JOIN users u ON u.id = m.sender_id
       WHERE m.chat_id = $1
       ORDER BY m.created_at DESC
       LIMIT $2`,
      [chatId, limit]
    );

    res.json({
      success: true,
      chat_id: chatId,
      messages: msgsRes.rows.reverse().map(m => ({
        id: m.id,
        sender: `@${m.username}`,
        royal_id: m.royal_id,
        type: m.message_type,
        content: m.content,
        file_name: m.file_name,
        file_size_mb: m.file_size_bytes ? (Number(m.file_size_bytes) / (1024 * 1024)).toFixed(2) : null,
        quick_code: m.quick_code,
        is_purged: m.is_purged,
        created_at: m.created_at
      }))
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Dynamic Bash Installer for Linux Distros
router.get('/install.sh', (req: Request, res: Response) => {
  const host = req.get('host') || 'localhost:5000';
  const protocol = req.protocol || 'http';
  const serverUrl = `${protocol}://${host}`;

  const bashScript = `#!/usr/bin/env bash
# ==========================================================
# LogsApp / RoyalChat - Linux CLI Tool Installer
# Works on any Linux distro (Ubuntu, Debian, Arch, Alpine, CentOS, Fedora, etc.)
# ==========================================================

set -e

echo "🚀 Installing LogsApp CLI tool..."

SERVER_URL="${serverUrl}"
INSTALL_DIR="/usr/local/bin"
TARGET_FILE="$INSTALL_DIR/logsapp"

# Check for python3
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is required. Please install python3 first."
    exit 1
fi

# Download standalone CLI script
TMP_FILE=$(mktemp)
curl -fsSL "$SERVER_URL/api/cli/logsapp-cli.py" -o "$TMP_FILE"

# Install with sudo if necessary
if [ -w "$INSTALL_DIR" ]; then
    mv "$TMP_FILE" "$TARGET_FILE"
    chmod +x "$TARGET_FILE"
else
    echo "🔑 Root permissions required to install to $INSTALL_DIR..."
    sudo mv "$TMP_FILE" "$TARGET_FILE"
    sudo chmod +x "$TARGET_FILE"
fi

echo "✅ LogsApp CLI installed successfully as 'logsapp'!"
echo ""
echo "👉 Quick Start Commands:"
echo "   logsapp login                    # Login with Username/RoyalID"
echo "   logsapp chats                    # View active chats"
echo "   logsapp history <username/chat>  # Read messages"
echo "   logsapp send <username/chat> 'hi'# Send message"
echo "   logsapp upload <chat> <filepath> # Send any file up to 1GB"
echo "   logsapp download <quick-code>    # Download file directly"
echo ""
`;

  res.setHeader('Content-Type', 'text/x-shellscript');
  res.send(bashScript);
});

export default router;
