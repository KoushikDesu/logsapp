import React, { useState } from 'react';
import {
  FileText,
  Download,
  Terminal,
  Check,
  CheckCheck,
  Smile,
  Copy,
  Trash2,
  Play,
  Pause,
  Crown,
  FileArchive,
  Film,
  File
} from 'lucide-react';
import { Message, MessageReaction } from '../../types/index.js';
import { useAuth } from '../../context/AuthContext.js';
import api from '../../services/api.js';

interface MessageBubbleProps {
  message: Message;
  isMe: boolean;
  isGroup: boolean;
  onOpenLightbox: (msg: Message) => void;
  onDeleteMessage: (msgId: string) => void;
  onReaction: (msgId: string, emoji: string) => void;
}

const COMMON_EMOJIS = ['👍', '❤️', '🔥', '😂', '👑', '🎉', '🚀'];

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isMe,
  isGroup,
  onOpenLightbox,
  onDeleteMessage,
  onReaction,
}) => {
  const { user } = useAuth();
  const [showEmojiMenu, setShowEmojiMenu] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const downloadUrl = `/api/files/download/${message.id}`;
  const fileSizeMb = message.file_size_bytes
    ? (Number(message.file_size_bytes) / (1024 * 1024)).toFixed(2)
    : null;

  const timeFormatted = message.created_at
    ? new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : '';

  const handleCopyQuickCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const getFileIcon = () => {
    switch (message.message_type) {
      case 'archive':
        return <FileArchive className="w-8 h-8 text-amber-400" />;
      case 'video':
        return <Film className="w-8 h-8 text-blue-400" />;
      case 'document':
        return <FileText className="w-8 h-8 text-emerald-400" />;
      default:
        return <File className="w-8 h-8 text-indigo-400" />;
    }
  };

  return (
    <div className={`flex flex-col my-1 group ${isMe ? 'items-end' : 'items-start'}`}>
      <div className="relative max-w-[85%] md:max-w-[70%]">
        {/* Sender Name in Group */}
        {!isMe && isGroup && (
          <div className="flex items-center gap-1 mb-0.5 px-1">
            <span className="text-[11px] font-semibold text-emerald-400 truncate">
              {message.sender_display_name || message.sender_username}
            </span>
            {message.sender_royal_id && (
              <span className="text-[9px] font-mono text-amber-400 bg-amber-500/10 px-1 py-0.2 rounded">
                {message.sender_royal_id}
              </span>
            )}
          </div>
        )}

        {/* Bubble Box */}
        <div
          className={`relative rounded-2xl px-3.5 py-2 shadow-sm text-sm break-words transition-all ${
            isMe
              ? 'bg-[#005c4b] dark:bg-[#005c4b] bg-[#d9fdd3] text-white dark:text-white text-gray-900 rounded-tr-none'
              : 'bg-wa-dark-panel dark:bg-wa-dark-panel bg-white text-wa-dark-text dark:text-wa-dark-text text-gray-900 rounded-tl-none border border-wa-dark-border/20 dark:border-wa-dark-border/20'
          }`}
        >
          {/* Purged / Deleted banner */}
          {message.is_purged ? (
            <div className="italic text-xs opacity-60 flex items-center gap-1.5 py-1">
              <span>{message.content}</span>
            </div>
          ) : (
            <>
              {/* Image Preview */}
              {message.message_type === 'image' && (
                <div className="mb-2 -mx-1 -mt-1 rounded-xl overflow-hidden cursor-pointer">
                  <img
                    src={downloadUrl}
                    alt={message.file_name || 'Attached Photo'}
                    onClick={() => onOpenLightbox(message)}
                    className="w-full max-h-72 object-cover hover:opacity-95 transition-opacity"
                    loading="lazy"
                  />
                  {message.quick_code && (
                    <div className="bg-black/70 px-2 py-1 flex items-center justify-between text-[10px] text-gray-300">
                      <span className="font-mono text-amber-400">CLI: {message.quick_code}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyQuickCode(message.quick_code!);
                        }}
                        className="text-gray-300 hover:text-white flex items-center gap-1"
                      >
                        {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Video Preview */}
              {message.message_type === 'video' && (
                <div className="mb-2 -mx-1 -mt-1 rounded-xl overflow-hidden">
                  <video
                    src={downloadUrl}
                    controls
                    className="w-full max-h-72 object-contain bg-black/80 rounded-xl"
                  />
                  {message.quick_code && (
                    <div className="bg-black/70 px-2 py-1 flex items-center justify-between text-[10px] text-gray-300">
                      <span className="font-mono text-amber-400">CLI: {message.quick_code}</span>
                      <button
                        onClick={() => handleCopyQuickCode(message.quick_code!)}
                        className="text-gray-300 hover:text-white"
                      >
                        {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Audio / Voice Note */}
              {message.message_type === 'audio' && (
                <div className="mb-2 py-1">
                  <audio src={downloadUrl} controls className="w-64 max-w-full h-10" />
                </div>
              )}

              {/* File Attachment Card (Documents, Archives, Raw Files up to 1GB) */}
              {['file', 'document', 'archive'].includes(message.message_type) && (
                <div className="flex items-center gap-3 p-2.5 bg-black/20 dark:bg-black/20 bg-gray-100 rounded-xl mb-2 border border-white/10">
                  <div className="p-2 bg-white/10 rounded-lg shrink-0">
                    {getFileIcon()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-xs truncate">{message.file_name}</p>
                    <div className="flex items-center gap-2 text-[11px] opacity-75">
                      <span>{fileSizeMb ? `${fileSizeMb} MB` : '1GB max'}</span>
                      {message.quick_code && (
                        <span className="font-mono text-amber-300 bg-amber-500/20 px-1 py-0.2 rounded">
                          {message.quick_code}
                        </span>
                      )}
                    </div>
                  </div>
                  <a
                    href={downloadUrl}
                    download={message.file_name}
                    className="p-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-lg shrink-0 transition-colors"
                    title="Download File"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>
              )}

              {/* Message Content Text */}
              {message.content && message.content !== message.file_name && (
                <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
              )}
            </>
          )}

          {/* Timestamp & Ticks Footer */}
          <div className="flex items-center justify-end gap-1 mt-1 text-[10px] opacity-70 float-right ml-3 select-none">
            <span>{timeFormatted}</span>
            {isMe && <CheckCheck className="w-3.5 h-3.5 text-blue-400" />}
          </div>
        </div>

        {/* Message Reactions Badge */}
        {message.reactions && message.reactions.length > 0 && (
          <div className="flex items-center gap-1 -mt-2 ml-2 bg-wa-dark-panel dark:bg-wa-dark-panel bg-white border border-wa-dark-border dark:border-wa-dark-border px-1.5 py-0.5 rounded-full shadow-md text-xs">
            {message.reactions.map((r, i) => (
              <span key={i} title={`@${r.username}`} className="hover:scale-125 transition-transform cursor-pointer">
                {r.emoji}
              </span>
            ))}
          </div>
        )}

        {/* Hover Quick Emoji / Delete Actions */}
        <div
          className={`absolute top-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 bg-wa-dark-panel dark:bg-wa-dark-panel bg-white border border-wa-dark-border rounded-full px-1.5 py-0.5 shadow-lg z-10 ${
            isMe ? '-left-20' : '-right-20'
          }`}
        >
          <button
            onClick={() => setShowEmojiMenu(!showEmojiMenu)}
            className="p-1 hover:text-amber-400 text-gray-400 rounded-full transition-colors"
            title="React"
          >
            <Smile className="w-3.5 h-3.5" />
          </button>
          {isMe && (
            <button
              onClick={() => onDeleteMessage(message.id)}
              className="p-1 hover:text-red-400 text-gray-400 rounded-full transition-colors"
              title="Delete message"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Common Emoji Quick Bar */}
        {showEmojiMenu && (
          <div
            className={`absolute top-8 z-30 flex items-center gap-1 bg-wa-dark-panel dark:bg-wa-dark-panel bg-white border border-wa-dark-border p-1.5 rounded-full shadow-2xl animate-in fade-in ${
              isMe ? 'right-0' : 'left-0'
            }`}
          >
            {COMMON_EMOJIS.map((emoji) => (
              <button
                key={emoji}
                onClick={() => {
                  onReaction(message.id, emoji);
                  setShowEmojiMenu(false);
                }}
                className="hover:scale-130 active:scale-95 transition-all text-sm p-1 rounded-full hover:bg-wa-dark-hover"
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
