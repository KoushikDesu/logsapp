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

// ==========================================================
// ON-DEMAND SINGLE MESSAGE CLI TRANSFER ENDPOINTS
// ==========================================================

function generateTransferCode(): string {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `XFR-${code}`;
}

// 1. Create on-demand CLI transfer for a specific message (right-click / CLI button)
router.post('/create-transfer/:messageId', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const messageId = req.params.messageId as string;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    // Verify message exists & user is participant
    const msgRes = await query(
      `SELECT m.id, m.chat_id, m.message_type, m.file_name, m.file_size_bytes, m.content, m.quick_code
       FROM messages m
       JOIN chat_participants cp ON cp.chat_id = m.chat_id AND cp.user_id = $1
       WHERE m.id = $2`,
      [userId, messageId]
    );

    if (msgRes.rows.length === 0) {
      res.status(404).json({ error: 'Message not found or you do not have permission to access it' });
      return;
    }

    const message = msgRes.rows[0];
    const transferCode = generateTransferCode();

    // Insert or update transfer code
    await query(
      `INSERT INTO cli_transfers (transfer_code, message_id, chat_id, created_by, expires_at)
       VALUES ($1, $2, $3, $4, NOW() + INTERVAL '24 hours')`,
      [transferCode, message.id, message.chat_id, userId]
    );

    const host = req.get('host') || 'logsapp-2vqv.onrender.com';
    const protocol = req.protocol === 'https' || host.includes('onrender.com') || host.includes('vercel.app') ? 'https' : req.protocol;
    const serverUrl = `${protocol}://${host}`;

    const command = `curl -sSL ${serverUrl}/api/cli/xfr/${transferCode} | python3`;
    const cliCommand = `logsapp get-msg ${transferCode}`;

    res.json({
      success: true,
      transferCode,
      command,
      cliCommand,
      fileName: message.file_name || null,
      messageType: message.message_type,
      fileSizeMb: message.file_size_bytes ? (Number(message.file_size_bytes) / (1024 * 1024)).toFixed(2) : null,
      contentPreview: message.content ? message.content.substring(0, 100) : ''
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 2. Serve Zero-Dependency Linux Python Downloader for curl ... | python3
router.get('/xfr/:transferCode', async (req: Request, res: Response): Promise<void> => {
  try {
    const transferCode = (req.params.transferCode as string || '').toUpperCase().trim();
    const host = req.get('host') || 'logsapp-2vqv.onrender.com';
    const protocol = req.protocol === 'https' || host.includes('onrender.com') || host.includes('vercel.app') ? 'https' : req.protocol;
    const serverUrl = `${protocol}://${host}`;

    // Verify transfer code exists
    const xfrRes = await query(
      `SELECT t.transfer_code, t.expires_at, m.file_name, m.message_type, m.file_size_bytes
       FROM cli_transfers t
       JOIN messages m ON m.id = t.message_id
       WHERE t.transfer_code = $1 AND t.expires_at > NOW()`,
      [transferCode]
    );

    if (xfrRes.rows.length === 0) {
      res.setHeader('Content-Type', 'text/x-python');
      res.send(`#!/usr/bin/env python3
import sys
print("\\033[91m❌ Error: Transfer code '${transferCode}' has expired or is invalid.\\033[0m")
sys.exit(1)
`);
      return;
    }

    const info = xfrRes.rows[0];
    const fileNameDisplay = info.file_name || (info.message_type === 'text' ? 'Text Message' : 'Message Attachment');
    const sizeDisplay = info.file_size_bytes ? `(${(Number(info.file_size_bytes)/(1024*1024)).toFixed(2)} MB)` : '';

    const pythonScript = `#!/usr/bin/env python3
"""
LogsApp Direct Terminal Message Downloader
Zero-dependency, standalone Linux & Unix runner.
"""
import sys
import os
import json
import getpass
import time
from urllib import request, parse, error
from pathlib import Path

# UTF-8 terminal encoding safety
if hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
        sys.stderr.reconfigure(encoding='utf-8', errors='replace')
    except Exception:
        pass

SERVER_URL = "${serverUrl}"
TRANSFER_CODE = "${transferCode}"
ITEM_NAME = """${fileNameDisplay.replace(/"/g, '\\"')}"""
ITEM_SIZE = "${sizeDisplay}"

class C:
    CYAN = '\\033[96m'
    GREEN = '\\033[92m'
    YELLOW = '\\033[93m'
    RED = '\\033[91m'
    BOLD = '\\033[1m'
    DIM = '\\033[2m'
    RESET = '\\033[0m'

def main():
    print(f"{C.CYAN}{C.BOLD}\\n==============================================================")
    print("  LOGSAPP - Linux Direct CLI Message Transfer")
    print(f"=============================================================={C.RESET}")
    print(f"  Target: {C.BOLD}{ITEM_NAME}{C.RESET} {ITEM_SIZE}")
    print(f"  Code:   {C.YELLOW}{TRANSFER_CODE}{C.RESET}\\n")
    print(f"{C.BOLD}🔐 Authentication Required:{C.RESET}")

    # Prompt credentials
    try:
        if not sys.stdin.isatty():
            # Reading from pipe/redirect
            try:
                with open('/dev/tty', 'r') as tty:
                    sys.stdout.write("  Username or RoyalID: ")
                    sys.stdout.flush()
                    identifier = tty.readline().strip()
                    password = getpass.getpass("  Password: ", stream=sys.stderr)
            except Exception:
                identifier = input("  Username or RoyalID: ").strip()
                password = getpass.getpass("  Password: ")
        else:
            identifier = input("  Username or RoyalID: ").strip()
            password = getpass.getpass("  Password: ")
    except Exception as e:
        print(f"{C.RED}Input cancelled.{C.RESET}")
        return

    if not identifier or not password:
        print(f"{C.RED}❌ Username and password are required.{C.RESET}")
        return

    print(f"\\n>> Authenticating with LogsApp server...")

    auth_payload = json.dumps({
        "transferCode": TRANSFER_CODE,
        "identifier": identifier,
        "password": password
    }).encode('utf-8')

    req = request.Request(
        f"{SERVER_URL}/api/cli/verify-transfer",
        data=auth_payload,
        headers={"Content-Type": "application/json", "User-Agent": "LogsApp-CLI-Direct/1.0"},
        method="POST"
    )

    try:
        resp = request.urlopen(req, timeout=30)
        auth_data = json.loads(resp.read().decode('utf-8'))
    except error.HTTPError as e:
        err_text = e.read().decode('utf-8')
        try:
            err_json = json.loads(err_text)
            print(f"{C.RED}❌ Authentication failed ({e.code}): {err_json.get('error', err_text)}{C.RESET}")
        except Exception:
            print(f"{C.RED}❌ Authentication failed ({e.code}): {err_text}{C.RESET}")
        return
    except Exception as e:
        print(f"{C.RED}❌ Network connection failed: {e}{C.RESET}")
        return

    if not auth_data.get("success"):
        print(f"{C.RED}❌ {auth_data.get('error', 'Transfer verification failed')}{C.RESET}")
        return

    user_name = auth_data.get("user", {}).get("display_name", identifier)
    print(f"{C.GREEN}✅ Authenticated as {C.BOLD}{user_name}{C.RESET}!")

    # Resolve Downloads Directory
    home_downloads = Path.home() / "Downloads"
    if home_downloads.exists() and home_downloads.is_dir():
        dest_dir = home_downloads
    else:
        # Check current dir Downloads or fallback to home / current directory
        try:
            home_downloads.mkdir(parents=True, exist_ok=True)
            dest_dir = home_downloads
        except Exception:
            dest_dir = Path.cwd()

    is_attachment = auth_data.get("isAttachment", False)
    content = auth_data.get("content", "")
    filename = auth_data.get("fileName") or f"message_{TRANSFER_CODE}.txt"

    if is_attachment:
        download_url = f"{SERVER_URL}/api/cli/download-transfer/{TRANSFER_CODE}?token={auth_data['token']}"
        dest_file = dest_dir / filename

        # Ensure no accidental overwrite if file exists with same name
        counter = 1
        stem = dest_file.stem
        suffix = dest_file.suffix
        while dest_file.exists():
            dest_file = dest_dir / f"{stem}_{counter}{suffix}"
            counter += 1

        print(f">> Downloading {C.BOLD}{filename}{C.RESET} to {dest_dir}...")

        try:
            dl_req = request.Request(download_url, headers={"User-Agent": "LogsApp-CLI-Direct/1.0"})
            dl_resp = request.urlopen(dl_req, timeout=300)
            total_bytes = int(dl_resp.headers.get("Content-Length", 0))
            total_mb = total_bytes / (1024 * 1024) if total_bytes > 0 else 0

            chunk_size = 64 * 1024
            downloaded = 0
            start_time = time.time()

            with open(dest_file, 'wb') as f:
                while True:
                    chunk = dl_resp.read(chunk_size)
                    if not chunk:
                        break
                    f.write(chunk)
                    downloaded += len(chunk)
                    if total_bytes > 0:
                        pct = (downloaded / total_bytes) * 100
                        bar_len = 28
                        filled = int(bar_len * downloaded // total_bytes)
                        bar = '=' * filled + '-' * (bar_len - filled)
                        elapsed = max(time.time() - start_time, 0.001)
                        speed = (downloaded / (1024*1024)) / elapsed
                        sys.stdout.write(f"\\r  [{bar}] {pct:.1f}% ({downloaded/(1024*1024):.1f}/{total_mb:.1f} MB) @ {speed:.2f} MB/s ")
                        sys.stdout.flush()

            print(f"\\n\\n{C.GREEN}{C.BOLD}🎉 Success! Downloaded to:{C.RESET}")
            print(f"   {C.CYAN}{os.path.abspath(dest_file)}{C.RESET}\\n")
        except Exception as e:
            print(f"\\n{C.RED}❌ Download failed: {e}{C.RESET}")
    else:
        # Plain text / code message
        dest_file = dest_dir / f"logsapp_msg_{TRANSFER_CODE}.txt"
        with open(dest_file, 'w', encoding='utf-8') as f:
            f.write(content)

        print(f"\\n{C.CYAN}{C.BOLD}--- Message Content ---{C.RESET}")
        print(content)
        print(f"{C.CYAN}{C.BOLD}-----------------------{C.RESET}\\n")
        print(f"{C.GREEN}{C.BOLD}🎉 Saved message text to:{C.RESET}")
        print(f"   {C.CYAN}{os.path.abspath(dest_file)}{C.RESET}\\n")

if __name__ == '__main__':
    main()
`;

    res.setHeader('Content-Type', 'text/x-python; charset=utf-8');
    res.send(pythonScript);
  } catch (err: any) {
    res.status(500).send(`print("Error generating transfer runner: ${err.message}")`);
  }
});

// 3. Verify credentials and authorize transfer
router.post('/verify-transfer', async (req: Request, res: Response): Promise<void> => {
  try {
    const { transferCode, identifier, password } = req.body;

    if (!transferCode || !identifier || !password) {
      res.status(400).json({ success: false, error: 'Transfer code, identifier, and password are required' });
      return;
    }

    // Authenticate user
    const userRes = await query(
      `SELECT id, username, royal_id, display_name, password_hash 
       FROM users 
       WHERE LOWER(username) = LOWER($1) OR UPPER(royal_id) = UPPER($1)`,
      [identifier.trim()]
    );

    if (userRes.rows.length === 0) {
      res.status(401).json({ success: false, error: 'Invalid username/RoyalID or password' });
      return;
    }

    const user = userRes.rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      res.status(401).json({ success: false, error: 'Invalid username/RoyalID or password' });
      return;
    }

    // Validate transfer code
    const xfrRes = await query(
      `SELECT t.*, m.file_name, m.file_path, m.file_size_bytes, m.file_mime_type, m.message_type, m.content, m.is_purged
       FROM cli_transfers t
       JOIN messages m ON m.id = t.message_id
       WHERE t.transfer_code = $1 AND t.expires_at > NOW()`,
      [transferCode.toUpperCase().trim()]
    );

    if (xfrRes.rows.length === 0) {
      res.status(404).json({ success: false, error: 'Transfer code not found or expired (24h limit)' });
      return;
    }

    const transfer = xfrRes.rows[0];

    // Check user membership in chat
    const memberCheck = await query(
      'SELECT id FROM chat_participants WHERE chat_id = $1 AND user_id = $2',
      [transfer.chat_id, user.id]
    );

    if (memberCheck.rows.length === 0) {
      res.status(403).json({ success: false, error: 'You are not a member of the chat containing this message' });
      return;
    }

    // Generate short-lived download token (15 mins)
    const downloadToken = jwt.sign(
      {
        transferCode: transfer.transfer_code,
        userId: user.id,
        messageId: transfer.message_id
      },
      JWT_SECRET,
      { expiresIn: '15m' }
    );

    const hasAttachment = Boolean(transfer.file_path && !transfer.is_purged);

    res.json({
      success: true,
      token: downloadToken,
      user: {
        id: user.id,
        username: user.username,
        display_name: user.display_name,
        royal_id: user.royal_id
      },
      isAttachment: hasAttachment,
      fileName: transfer.file_name || (hasAttachment ? 'download.bin' : 'message.txt'),
      fileSizeBytes: transfer.file_size_bytes,
      messageType: transfer.message_type,
      content: transfer.content
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 4. Download file or text using transfer token
router.get('/download-transfer/:transferCode', async (req: Request, res: Response): Promise<void> => {
  try {
    const transferCode = (req.params.transferCode as string || '').toUpperCase().trim();
    const token = req.query.token as string;

    if (!token) {
      res.status(401).json({ error: 'Download token required' });
      return;
    }

    // Verify token
    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (e) {
      res.status(401).json({ error: 'Invalid or expired download token' });
      return;
    }

    if (decoded.transferCode !== transferCode) {
      res.status(403).json({ error: 'Token does not match transfer code' });
      return;
    }

    const xfrRes = await query(
      `SELECT t.*, m.file_name, m.file_path, m.file_size_bytes, m.file_mime_type, m.message_type, m.content, m.is_purged
       FROM cli_transfers t
       JOIN messages m ON m.id = t.message_id
       WHERE t.transfer_code = $1`,
      [transferCode]
    );

    if (xfrRes.rows.length === 0) {
      res.status(404).json({ error: 'Transfer not found' });
      return;
    }

    const msg = xfrRes.rows[0];

    if (msg.file_path) {
      const fs = await import('fs');
      if (msg.is_purged || !fs.existsSync(msg.file_path)) {
        res.status(410).json({ error: 'File was purged to save storage limit' });
        return;
      }

      const stat = fs.statSync(msg.file_path);
      res.setHeader('Content-Length', stat.size);
      res.setHeader('Content-Type', msg.file_mime_type || 'application/octet-stream');
      res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(msg.file_name || 'download.bin')}"`);

      const fileStream = fs.createReadStream(msg.file_path);
      fileStream.pipe(res);
    } else {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.setHeader('Content-Disposition', `attachment; filename="logsapp_msg_${transferCode}.txt"`);
      res.send(msg.content || '');
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Dynamic Bash Installer for Linux Distros
router.get('/install.sh', (req: Request, res: Response) => {
  const host = req.get('host') || 'logsapp-2vqv.onrender.com';
  const protocol = req.protocol === 'https' || host.includes('onrender.com') || host.includes('vercel.app') ? 'https' : req.protocol;
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
echo "   logsapp get-msg <XFR-CODE>       # Download right-clicked message"
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

// Serve the standalone CLI script directly
router.get('/logsapp-cli.py', async (req: Request, res: Response): Promise<void> => {
  try {
    const fs = await import('fs');
    const path = await import('path');
    const cliFilePath = path.resolve('./cli/logsapp-cli.py');
    if (fs.existsSync(cliFilePath)) {
      res.setHeader('Content-Type', 'text/x-python; charset=utf-8');
      res.sendFile(cliFilePath);
    } else {
      res.status(404).send('# CLI script not found');
    }
  } catch (e: any) {
    res.status(500).send(`# Error: ${e.message}`);
  }
});

export default router;
