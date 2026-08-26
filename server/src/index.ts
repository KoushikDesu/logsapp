import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import authRoutes from './routes/authRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import fileRoutes from './routes/fileRoutes.js';
import cliRoutes from './routes/cliRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import blockRoutes from './routes/blockRoutes.js';
import aliasRoutes from './routes/aliasRoutes.js';
import callRoutes from './routes/callRoutes.js';

import { setupSocketHandler } from './socket/socketHandler.js';
import { query } from './config/db.js';
import { runMigrations } from './config/migrations.js';
import { checkAndPurgeChatStorage } from './services/storagePurgeService.js';
import { runInactivityPurge } from './services/inactivityPurgeService.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

// Set up Socket.IO with CORS
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  },
  maxHttpBufferSize: 1e8, // 100MB socket chunk buffer
});

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));
app.use(morgan('dev'));

// Ensure upload directory exists (supports Vercel /tmp)
const defaultUpload = process.env.VERCEL ? '/tmp/uploads' : './uploads';
const uploadDir = path.resolve(process.env.UPLOAD_DIR || defaultUpload);
if (!fs.existsSync(uploadDir)) {
  try {
    fs.mkdirSync(uploadDir, { recursive: true });
  } catch (e) {
    console.warn('Could not create upload directory:', e);
  }
}

// Serve CLI standalone script directly
const serveCliScript = (req: express.Request, res: express.Response) => {
  const cliPaths = [
    path.resolve('../cli/logsapp-cli.py'),
    path.resolve('./cli/logsapp-cli.py')
  ];
  const found = cliPaths.find(p => fs.existsSync(p));
  if (found) {
    res.setHeader('Content-Type', 'text/x-python');
    res.sendFile(found);
  } else {
    res.status(404).send('CLI script not found');
  }
};

app.get('/api/cli/logsapp-cli.py', serveCliScript);
app.get('/cli/logsapp-cli.py', serveCliScript);

// Mount API Routes (Dual prefix for Vercel & standard Express)
app.use('/api/auth', authRoutes);
app.use('/auth', authRoutes);

app.use('/api/chats', chatRoutes);
app.use('/chats', chatRoutes);

app.use('/api/messages', messageRoutes);
app.use('/messages', messageRoutes);

app.use('/api/files', fileRoutes);
app.use('/files', fileRoutes);

app.use('/api/cli', cliRoutes);
app.use('/cli', cliRoutes);

app.use('/api/admin', adminRoutes);
app.use('/admin', adminRoutes);

app.use('/api/reports', reportRoutes);
app.use('/reports', reportRoutes);

app.use('/api/blocks', blockRoutes);
app.use('/blocks', blockRoutes);

app.use('/api/aliases', aliasRoutes);
app.use('/aliases', aliasRoutes);

app.use('/api/calls', callRoutes);
app.use('/calls', callRoutes);

// Health check endpoint
const healthHandler = (req: express.Request, res: express.Response) => {
  res.json({
    status: 'ok',
    app: 'LogsApp Web Chat',
    version: '2.0.0',
    time: new Date().toISOString(),
    features: ['1GB transfers', 'Admin Dashboard', 'Reports & Blocks', 'Audio Calling', 'Public/Private Groups', 'Custom Nicknames', 'Inactivity Purge']
  });
};
app.get('/api/health', healthHandler);
app.get('/health', healthHandler);

// Initialize Socket.io Real-time engine
setupSocketHandler(io);

// Background workers
// 1. Run migrations at startup
runMigrations().catch(console.error);

// 2. Periodic Storage Quota Auto-Purge Check (Runs every 10 minutes)
setInterval(async () => {
  try {
    const chats = await query('SELECT id FROM chats');
    for (const row of chats.rows) {
      await checkAndPurgeChatStorage(row.id);
    }
  } catch (err) {
    console.error('[Background Purge Task Error]:', err);
  }
}, 10 * 60 * 1000);

// 3. 30-Day Inactivity Auto-Purge Check (Runs daily)
setInterval(async () => {
  try {
    await runInactivityPurge();
  } catch (err) {
    console.error('[Inactivity Purge Error]:', err);
  }
}, 24 * 60 * 60 * 1000);

// Initial check on startup
runInactivityPurge().catch(console.error);

// Start Server if not imported as a serverless module
if (process.env.NODE_ENV !== 'test' && !process.env.VERCEL) {
  server.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`🚀 LogsApp 2.0 Server running on http://localhost:${PORT}`);
    console.log(`📦 1GB Storage & 30-day Inactivity Purge: Active`);
    console.log(`🛡️ Admin Moderation, Reports, & Blocking: Enabled`);
    console.log(`📞 WebRTC Audio Calling & Group Discovery: Ready`);
    console.log(`=======================================================`);
  });
}

export default app;
export { app, server, io };
