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
import { setupSocketHandler } from './socket/socketHandler.js';
import { query } from './config/db.js';
import { checkAndPurgeChatStorage } from './services/storagePurgeService.js';

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
    path.resolve('./cli/logsapp-cli.py'),
    path.resolve(__dirname, '../../cli/logsapp-cli.py')
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

// Health check endpoint
const healthHandler = (req: express.Request, res: express.Response) => {
  res.json({ status: 'ok', app: 'LogsApp / RoyalChat', version: '1.0.0', time: new Date().toISOString(), vercel: Boolean(process.env.VERCEL) });
};
app.get('/api/health', healthHandler);
app.get('/health', healthHandler);

// Serve frontend static files if built in production
const clientDistPath = path.resolve('../client/dist');
const clientDistLocal = path.resolve('./client/dist');
const distDir = fs.existsSync(clientDistPath) ? clientDistPath : fs.existsSync(clientDistLocal) ? clientDistLocal : null;

if (distDir) {
  app.use(express.static(distDir));
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(distDir, 'index.html'));
    }
  });
}

// Initialize Socket.io Real-time engine
setupSocketHandler(io);

// Background worker: Periodic Storage Quota Auto-Purge Check (Runs every 10 minutes)
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

// Start Server if not imported as a serverless module
if (process.env.NODE_ENV !== 'test' && !process.env.VERCEL) {
  server.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`🚀 LogsApp / RoyalChat Server running on http://localhost:${PORT}`);
    console.log(`📦 Max upload limit: 1GB | Auto-Purge Storage Monitor: Active`);
    console.log(`💬 Real-Time WebSockets: Ready`);
    console.log(`💻 Linux CLI endpoint: http://localhost:${PORT}/api/cli/install.sh`);
    console.log(`=======================================================`);
  });
}

export default app;
export { app, server, io };
