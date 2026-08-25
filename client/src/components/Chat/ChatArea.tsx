import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  Users,
  HardDrive,
  Terminal,
  MoreVertical,
  Shield,
  Sparkles,
  MessageSquare,
  Crown
} from 'lucide-react';
import { Chat, Message } from '../../types/index.js';
import { useAuth } from '../../context/AuthContext.js';
import { useSocket } from '../../context/SocketContext.js';
import { useTheme } from '../../context/ThemeContext.js';
import api from '../../services/api.js';
import { BrandLogo } from '../Common/BrandLogo.js';
import { MessageBubble } from './MessageBubble.js';
import { ChatInput } from './ChatInput.js';
import { MediaLightbox } from './MediaLightbox.js';
import { StorageModal } from '../Storage/StorageModal.js';
import { CLIModal } from '../CLI/CLIModal.js';

interface ChatAreaProps {
  chat: Chat | null;
  onBack: () => void;
  onRefreshChat: () => void;
}

export const ChatArea: React.FC<ChatAreaProps> = ({ chat, onBack, onRefreshChat }) => {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const { onlineUserIds, typingUsers, startTyping, stopTyping, joinChatRoom, socket } = useSocket();

  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<Message | null>(null);
  const [showStorageModal, setShowStorageModal] = useState(false);
  const [showCLIModal, setShowCLIModal] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch messages when chat changes
  useEffect(() => {
    if (!chat) return;

    joinChatRoom(chat.id);
    setLoading(true);

    api
      .get(`/messages/${chat.id}`)
      .then((res) => {
        setMessages(res.data.messages || []);
      })
      .catch((err) => {
        console.error('Failed to load messages:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [chat?.id]);

  // Real-time new message listener in this active chat
  useEffect(() => {
    if (!socket || !chat) return;

    const handleNewMessage = (data: { chatId: string; message: Message }) => {
      if (data.chatId === chat.id) {
        setMessages((prev) => {
          if (prev.some((m) => m.id === data.message.id)) return prev;
          return [...prev, data.message];
        });
        // Mark read
        socket.emit('mark_read', { chatId: chat.id });
      }
    };

    const handleReaction = (data: { chatId: string; messageId: string; emoji: string; action: string; username: string }) => {
      if (data.chatId === chat.id) {
        setMessages((prev) =>
          prev.map((m) => {
            if (m.id === data.messageId) {
              const reactions = m.reactions || [];
              if (data.action === 'added') {
                return {
                  ...m,
                  reactions: [...reactions.filter((r) => r.username !== data.username), { emoji: data.emoji, user_id: '', username: data.username }],
                };
              } else {
                return {
                  ...m,
                  reactions: reactions.filter((r) => !(r.username === data.username && r.emoji === data.emoji)),
                };
              }
            }
            return m;
          })
        );
      }
    };

    socket.on('new_message', handleNewMessage);
    socket.on('reaction_updated', handleReaction);

    return () => {
      socket.off('new_message', handleNewMessage);
      socket.off('reaction_updated', handleReaction);
    };
  }, [socket, chat?.id]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  if (!chat) {
    return (
      <div className={`hidden md:flex flex-1 flex-col items-center justify-center p-8 select-none ${isDark ? 'chat-bg-dark text-slate-400' : 'chat-bg-light text-slate-500'}`}>
        <div className="max-w-md text-center space-y-5">
          <div className="flex justify-center">
            <BrandLogo size="xl" showText={false} />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold font-heading text-slateDark-text dark:text-slateDark-text text-slate-900">
              RoyalChat Messenger
            </h2>
            <p className="text-sm leading-relaxed text-slate-400">
              Send encrypted messages, voice notes, and share large files up to <b className="text-blue-400">1GB</b> with seamless Linux terminal access.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full text-xs font-mono">
            <Terminal className="w-3.5 h-3.5" />
            <span>CLI Access: logsapp chats</span>
          </div>
        </div>
      </div>
    );
  }

  const otherUser = !chat.is_group && chat.other_participants ? chat.other_participants[0] : null;
  const isOtherOnline = otherUser ? onlineUserIds.has(otherUser.id) : false;
  const activeTypers = typingUsers[chat.id] || [];

  const chatTitle = chat.is_group ? chat.name : otherUser?.display_name || 'Direct Chat';
  const chatAvatar = chat.is_group
    ? chat.avatar_url || `https://api.dicebear.com/7.x/identicon/svg?seed=${chat.name}`
    : otherUser?.avatar_url || `https://api.dicebear.com/7.x/bottts/svg?seed=${otherUser?.username}`;

  const handleSendMessage = async (content: string) => {
    try {
      const res = await api.post(`/messages/${chat.id}`, { content });
      const newMsg = res.data.message;
      setMessages((prev) => [...prev, newMsg]);

      // Emit through socket for instant delivery
      if (socket) {
        socket.emit('send_message', { chatId: chat.id, message: newMsg });
      }
      onRefreshChat();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to send message');
    }
  };

  const handleSendFile = async (file: File, caption?: string) => {
    const formData = new FormData();
    formData.append('file', file);
    if (caption) formData.append('caption', caption);

    const res = await api.post(`/files/upload/${chat.id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    const newMsg = res.data.message;
    setMessages((prev) => [...prev, newMsg]);
    if (socket) {
      socket.emit('send_message', { chatId: chat.id, message: newMsg });
    }
    onRefreshChat();
  };

  const handleSendVoice = async (audioBlob: Blob, durationSeconds: number) => {
    const file = new File([audioBlob], `voice_note_${Date.now()}.webm`, { type: 'audio/webm' });
    await handleSendFile(file, `Voice Note (${durationSeconds}s)`);
  };

  const handleDeleteMessage = async (msgId: string) => {
    try {
      await api.delete(`/messages/${msgId}`);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === msgId
            ? { ...m, content: '[This message was deleted]', is_purged: true }
            : m
        )
      );
    } catch (e: any) {
      alert(e.response?.data?.error || 'Failed to delete message');
    }
  };

  const handleReaction = async (msgId: string, emoji: string) => {
    try {
      const res = await api.post(`/messages/reactions/${msgId}`, { emoji });
      if (socket) {
        socket.emit('message_reaction', {
          chatId: chat.id,
          messageId: msgId,
          emoji,
          action: res.data.action,
        });
      }
    } catch (e: any) {
      console.error('Reaction error:', e);
    }
  };

  return (
    <div className="flex-1 h-full flex flex-col bg-slateDark-bg dark:bg-slateDark-bg bg-slate-50 relative overflow-hidden">
      {/* Top Chat Header */}
      <div className="h-16 px-4 flex items-center justify-between bg-slateDark-surface dark:bg-slateDark-surface bg-white border-b border-slateDark-border dark:border-slateDark-border z-10 select-none">
        <div className="flex items-center gap-3 min-w-0">
          {/* Back button for mobile */}
          <button
            onClick={onBack}
            className="md:hidden p-1.5 text-slate-400 hover:text-slate-200 rounded-xl"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Avatar */}
          <div className="relative shrink-0">
            <img
              src={chatAvatar}
              alt={chatTitle}
              className="w-10 h-10 rounded-xl object-cover bg-slate-900 border border-slateDark-border"
            />
            {!chat.is_group && isOtherOnline && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slateDark-surface rounded-full" />
            )}
          </div>

          {/* Title & Status */}
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-sm truncate text-slateDark-text dark:text-slateDark-text text-slate-900">
                {chatTitle}
              </h3>
              {!chat.is_group && otherUser?.royal_id && (
                <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-1.5 py-0.2 rounded border border-amber-500/20">
                  #{otherUser.royal_id}
                </span>
              )}
            </div>

            {/* Status / Typing Subtitle */}
            <p className="text-xs text-slate-400 truncate">
              {activeTypers.length > 0 ? (
                <span className="text-blue-400 font-medium animate-pulse">
                  {activeTypers.map((u) => u.display_name).join(', ')} typing...
                </span>
              ) : chat.is_group ? (
                `${chat.participant_count || chat.participants?.length || 2} members`
              ) : isOtherOnline ? (
                <span className="text-emerald-400 font-medium">Online</span>
              ) : (
                'Offline'
              )}
            </p>
          </div>
        </div>

        {/* Top Right Action Icons */}
        <div className="flex items-center gap-1.5 text-slate-400">
          {/* Storage threshold button */}
          <button
            onClick={() => setShowStorageModal(true)}
            className="p-2 hover:bg-slateDark-hover dark:hover:bg-slateDark-hover hover:bg-slate-100 rounded-xl text-amber-400 transition-colors"
            title="Chat Storage Quota & Auto-Purge"
          >
            <HardDrive className="w-4 h-4" />
          </button>

          {/* CLI code modal trigger */}
          <button
            onClick={() => setShowCLIModal(true)}
            className="p-2 hover:bg-slateDark-hover dark:hover:bg-slateDark-hover hover:bg-slate-100 rounded-xl text-blue-400 transition-colors"
            title="CLI Quick Fetch"
          >
            <Terminal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Stream with SmartPrep Ambient Pattern */}
      <div className={`flex-1 overflow-y-auto p-4 md:p-6 space-y-1 ${isDark ? 'chat-bg-dark' : 'chat-bg-light'}`}>
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-xs text-slate-400 space-y-3">
            <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-400">
              <MessageSquare className="w-8 h-8" />
            </div>
            <p className="font-semibold text-slate-300">No messages yet</p>
            <p>Send a message or upload any file up to 1GB!</p>
          </div>
        ) : (
          messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              isMe={msg.sender_id === user?.id}
              isGroup={chat.is_group}
              onOpenLightbox={(m) => setSelectedMedia(m)}
              onDeleteMessage={handleDeleteMessage}
              onReaction={handleReaction}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input Bar */}
      <ChatInput
        onSendMessage={handleSendMessage}
        onSendFile={handleSendFile}
        onSendVoice={handleSendVoice}
        onTyping={() => startTyping(chat.id)}
        onStopTyping={() => stopTyping(chat.id)}
      />

      {/* Lightbox for Photos & Videos */}
      {selectedMedia && (
        <MediaLightbox
          message={selectedMedia}
          onClose={() => setSelectedMedia(null)}
        />
      )}

      {/* Storage Quota Modal */}
      {showStorageModal && (
        <StorageModal
          currentChat={chat}
          onClose={() => setShowStorageModal(false)}
          onStorageUpdated={onRefreshChat}
        />
      )}

      {/* Linux CLI Helper Modal */}
      {showCLIModal && <CLIModal onClose={() => setShowCLIModal(false)} />}
    </div>
  );
};
