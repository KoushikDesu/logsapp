import { Server, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import { query } from '../config/db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'logsapp_royal_secret_jwt_key_2026_super_secure_token';

// Map of userId -> array of socket IDs (to support multiple tabs/devices)
const onlineUsers = new Map<string, Set<string>>();

export function setupSocketHandler(io: Server) {
  // Authentication middleware for Socket.IO
  io.use((socket: Socket, next) => {
    const token = socket.handshake.auth?.token || socket.handshake.query?.token;

    if (!token || typeof token !== 'string') {
      return next(new Error('Authentication token required'));
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      (socket as any).user = decoded;
      next();
    } catch (err) {
      return next(new Error('Invalid authentication token'));
    }
  });

  io.on('connection', async (socket: Socket) => {
    const user = (socket as any).user;
    if (!user) return;

    const userId = user.id;

    // Track online user
    if (!onlineUsers.has(userId)) {
      onlineUsers.set(userId, new Set());
    }
    onlineUsers.get(userId)!.add(socket.id);

    // Update online status in database
    await query('UPDATE users SET is_online = TRUE, last_seen = NOW() WHERE id = $1', [userId]).catch(console.error);

    // Broadcast user online status
    socket.broadcast.emit('user_status', {
      userId,
      isOnline: true,
      lastSeen: new Date().toISOString()
    });

    console.log(`[Socket] User connected: ${user.username} (${user.royal_id}) [Socket ID: ${socket.id}]`);

    // Join user's personal room for direct notifications
    socket.join(`user:${userId}`);

    // Automatically join all chat rooms the user belongs to
    try {
      const userChats = await query(
        'SELECT chat_id FROM chat_participants WHERE user_id = $1',
        [userId]
      );
      userChats.rows.forEach(r => socket.join(`chat:${r.chat_id}`));
    } catch (e) {
      console.error('[Socket] Failed to join chat rooms:', e);
    }

    // Join a specific chat room (e.g. newly opened or newly created chat)
    socket.on('join_chat', (chatId: string) => {
      if (chatId) {
        socket.join(`chat:${chatId}`);
      }
    });

    // Leave a specific chat room
    socket.on('leave_chat', (chatId: string) => {
      if (chatId) {
        socket.leave(`chat:${chatId}`);
      }
    });

    // Handle typing start
    socket.on('typing_start', ({ chatId }) => {
      socket.to(`chat:${chatId}`).emit('user_typing', {
        chatId,
        userId: user.id,
        username: user.username,
        display_name: user.display_name,
        isTyping: true
      });
    });

    // Handle typing stop
    socket.on('typing_stop', ({ chatId }) => {
      socket.to(`chat:${chatId}`).emit('user_typing', {
        chatId,
        userId: user.id,
        username: user.username,
        display_name: user.display_name,
        isTyping: false
      });
    });

    // Handle sending real-time message event
    socket.on('send_message', (data: { chatId: string; message: any }) => {
      const { chatId, message } = data;
      // Broadcast message to all members in this chat room
      io.to(`chat:${chatId}`).emit('new_message', {
        chatId,
        message
      });
    });

    // Handle message reaction update
    socket.on('message_reaction', (data: { chatId: string; messageId: string; emoji: string; action: string }) => {
      io.to(`chat:${data.chatId}`).emit('reaction_updated', {
        ...data,
        userId: user.id,
        username: user.username
      });
    });

    // Handle read receipts
    socket.on('mark_read', async ({ chatId }) => {
      await query(
        'UPDATE chat_participants SET last_read_at = NOW() WHERE chat_id = $1 AND user_id = $2',
        [chatId, userId]
      ).catch(console.error);

      socket.to(`chat:${chatId}`).emit('messages_read', {
        chatId,
        userId,
        readAt: new Date().toISOString()
      });
    });

    // Disconnect event
    socket.on('disconnect', async () => {
      const userSockets = onlineUsers.get(userId);
      if (userSockets) {
        userSockets.delete(socket.id);
        if (userSockets.size === 0) {
          onlineUsers.delete(userId);
          const now = new Date().toISOString();
          await query('UPDATE users SET is_online = FALSE, last_seen = NOW() WHERE id = $1', [userId]).catch(console.error);
          socket.broadcast.emit('user_status', {
            userId,
            isOnline: false,
            lastSeen: now
          });
        }
      }
      console.log(`[Socket] User disconnected: ${user.username}`);
    });
  });
}
