# 👑 LogsApp / RoyalChat

> **A modern WhatsApp-style real-time web chat application featuring 1GB file sharing, live autocomplete search, Supabase PostgreSQL database, auto-purge storage limit management, dual Dark/Light mode, and a standalone Linux CLI companion tool for headless file & message access.**

---

## ✨ Features at a Glance

- 💬 **WhatsApp Web & Mobile Interface**: Authentic layout, responsive drawer, doodle wallpapers, smooth bubbles, sent/delivered ticks, and synthesized sound effects.
- 👑 **RoyalID & Authentication**: Register with a custom or auto-generated unique RoyalID (e.g. `ROYAL-9821`) or unique username.
- 🔍 **Live Search Autocomplete**: As you type, instantly queries and displays matching usernames, display names, and RoyalIDs.
- 👥 **1-on-1 Direct Messaging & Multi-User Groups**: Create groups with custom avatars, descriptions, member roles, and custom storage limits.
- 📁 **1GB Large Media & File Streaming**: Send photos, 4K videos, audio voice notes (with built-in waveform recorder), archives, and documents up to 1GB.
- 🔑 **6-Digit QuickCode Access**: Every shared file receives a unique 6-digit QuickCode (e.g. `LGS-4821`) for instant cross-device and CLI retrieval.
- 🧹 **Automated Storage Quota & Auto-Purge**: Configurable per-chat storage limit (e.g. 1GB). When reached, the oldest messages and attachments are automatically cleaned up in the background to ensure strict storage limits.
- 🌓 **Dual Dark & Light Mode**: Instant toggle between WhatsApp Charcoal Dark (`#111b21`) and Crisp Light (`#f0f2f5`).
- 🐧 **Zero-Dependency Linux CLI Companion (`logsapp`)**: Standalone terminal client to log in, view chats, read logs, upload files up to 1GB, and download attachments on headless Linux servers without browsers.
- ⚡ **Supabase PostgreSQL & WebSockets**: Backed by PostgreSQL with connection pooler and real-time Socket.IO synchronization.

---

## 🚀 Standalone Linux CLI Companion Tool

For headless Linux distributions (Ubuntu, Debian, Arch, CentOS, Alpine, Raspberry Pi, etc.) where no web browser is installed:

### 1-Step Installation
```bash
curl -fsSL http://<your-server-host>:5000/api/cli/install.sh | bash
```

### CLI Command Reference
```bash
# 1. Login with your Username or RoyalID
logsapp login

# 2. View your profile and storage limit status
logsapp whoami

# 3. List active conversations
logsapp chats

# 4. View messages in a chat
logsapp history @username
logsapp history <chat_id> --limit 50

# 5. Send a text message
logsapp send @username "Hello from Linux Terminal!"

# 6. Upload and send any file up to 1GB
logsapp upload @username /path/to/archive.zip

# 7. List shared files and QuickCodes
logsapp files @username

# 8. Download any file directly with a progress bar
logsapp get LGS-8492
logsapp get <file_id> ./destination_folder/
```

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Lucide Icons, Socket.IO Client.
- **Backend**: Node.js, Express, TypeScript, Socket.IO, Multer, PostgreSQL Client (`pg`).
- **Database**: Supabase PostgreSQL (Supports IPv4 transaction pooler & direct session pooler).
- **CLI**: Standalone Python 3 script (`urllib`, `json`, `argparse`, zero external pip dependencies).

---

## 📦 Getting Started Locally

### 1. Clone the repository
```bash
git clone https://github.com/KoushikDesu/logsapp.git
cd logsapp
```

### 2. Configure Environment Variables
Inside `server/.env`:
```env
PORT=5000
DATABASE_URL="postgresql://postgres.oqtexpxdxueitsghwloj:[PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.oqtexpxdxueitsghwloj:[PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:5432/postgres"
JWT_SECRET="logsapp_royal_secret_jwt_key_2026_super_secure_token"
UPLOAD_DIR="./uploads"
MAX_FILE_SIZE=1073741824
DEFAULT_CHAT_STORAGE_LIMIT=1073741824
CLIENT_URL="http://localhost:3000"
```

### 3. Run Database Migrations
```bash
python server/src/db/migrate.py
```

### 4. Install Dependencies & Start

**Backend Server:**
```bash
cd server
npm install
npm run dev
```

**Frontend Client:**
```bash
cd client
npm install
npm run dev
```

Visit `http://localhost:3000` in your web browser!

---

## 📜 License
MIT License © 2026 Koushik Desu
