import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './AuthContext.js';
import { Message, TypingUser } from '../types/index.js';
import { sounds } from '../services/sound.js';
import { getServerOrigin } from '../services/api.js';

interface SocketContextType {
  socket: Socket | null;
  onlineUserIds: Set<string>;
  typingUsers: { [chatId: string]: TypingUser[] };
  startTyping: (chatId: string) => void;
  stopTyping: (chatId: string) => void;
  joinChatRoom: (chatId: string) => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider: React.FC<{
  children: React.ReactNode;
  onNewMessage?: (msg: Message, chatId: string) => void;
  onReactionUpdate?: (data: any) => void;
}> = ({ children, onNewMessage, onReactionUpdate }) => {
  const { user, token } = useAuth();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUserIds, setOnlineUserIds] = useState<Set<string>>(new Set());
  const [typingUsers, setTypingUsers] = useState<{ [chatId: string]: TypingUser[] }>({});

  useEffect(() => {
    if (!token || !user) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
      return;
    }

    const socketHost = getServerOrigin();
    let newSocket: Socket | null = null;

    try {
      newSocket = io(socketHost, {
        auth: { token },
        query: { token },
        transports: ['websocket', 'polling'],
        reconnectionAttempts: 5,
        timeout: 10000,
      });

      newSocket.on('connect_error', (err) => {
        console.warn('[Socket Notice] WebSocket connection fallback to HTTP polling:', err.message);
      });

      newSocket.on('connect', () => {
        console.log('[Socket] Connected as', user.username);
      });

    newSocket.on('user_status', (data: { userId: string; isOnline: boolean }) => {
      setOnlineUserIds((prev) => {
        const next = new Set(prev);
        if (data.isOnline) {
          next.add(data.userId);
        } else {
          next.delete(data.userId);
        }
        return next;
      });
    });

    newSocket.on('user_typing', (data: { chatId: string; userId: string; username: string; display_name: string; isTyping: boolean }) => {
      if (data.userId === user.id) return;

      setTypingUsers((prev) => {
        const current = prev[data.chatId] || [];
        if (data.isTyping) {
          if (!current.some((u) => u.userId === data.userId)) {
            return { ...prev, [data.chatId]: [...current, { chatId: data.chatId, userId: data.userId, username: data.username, display_name: data.display_name }] };
          }
          return prev;
        } else {
          return { ...prev, [data.chatId]: current.filter((u) => u.userId !== data.userId) };
        }
      });
    });

    newSocket.on('new_message', (data: { chatId: string; message: Message }) => {
      if (data.message.sender_id !== user.id) {
        sounds.playReceived();
      } else {
        sounds.playSent();
      }
      if (onNewMessage) {
        onNewMessage(data.message, data.chatId);
      }
    });

      newSocket.on('reaction_updated', (data: any) => {
        if (onReactionUpdate) {
          onReactionUpdate(data);
        }
      });

      setSocket(newSocket);
    } catch (err) {
      console.warn('Socket initialization error:', err);
    }

    return () => {
      if (newSocket) newSocket.disconnect();
    };
  }, [token, user?.id]);

  const startTyping = (chatId: string) => {
    if (socket && chatId) {
      socket.emit('typing_start', { chatId });
    }
  };

  const stopTyping = (chatId: string) => {
    if (socket && chatId) {
      socket.emit('typing_stop', { chatId });
    }
  };

  const joinChatRoom = (chatId: string) => {
    if (socket && chatId) {
      socket.emit('join_chat', chatId);
    }
  };

  return (
    <SocketContext.Provider value={{ socket, onlineUserIds, typingUsers, startTyping, stopTyping, joinChatRoom }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const ctx = useContext(SocketContext);
  if (!ctx) throw new Error('useSocket must be used within SocketProvider');
  return ctx;
};
