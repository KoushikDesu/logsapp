import React, { useState, useRef, useEffect } from 'react';
import {
  Smile,
  Paperclip,
  Mic,
  Send,
  Image as ImageIcon,
  FileText,
  Film,
  HardDrive,
  X,
  UploadCloud
} from 'lucide-react';
import { VoiceRecorder } from './VoiceRecorder.js';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  onSendFile: (file: File, caption?: string) => Promise<void>;
  onSendVoice: (audioBlob: Blob, durationSeconds: number) => Promise<void>;
  onTyping: () => void;
  onStopTyping: () => void;
}

const EMOJI_LIST = [
  '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇',
  '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚',
  '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩',
  '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣',
  '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬',
  '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗',
  '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄', '😯',
  '👑', '🔥', '⚡', '🎉', '🚀', '💯', '👍', '👎', '👏', '🙌',
  '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔'
];

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  onSendFile,
  onSendVoice,
  onTyping,
  onStopTyping,
}) => {
  const [text, setText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const typingTimerRef = useRef<any>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    onTyping();

    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    typingTimerRef.current = setTimeout(() => {
      onStopTyping();
    }, 1500);
  };

  const handleSendText = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!text.trim()) return;

    onSendMessage(text.trim());
    setText('');
    onStopTyping();
    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1024 * 1024 * 1024) {
      alert(`File size exceeds 1GB limit (${(file.size / (1024 * 1024)).toFixed(2)} MB)`);
      return;
    }

    setUploading(true);
    setShowAttachMenu(false);
    try {
      await onSendFile(file);
    } catch (err: any) {
      alert(err.response?.data?.error || 'File upload failed');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
      if (imageInputRef.current) imageInputRef.current.value = '';
    }
  };

  const handleVoiceUpload = async (audioBlob: Blob, durationSeconds: number) => {
    setIsRecordingVoice(false);
    setUploading(true);
    try {
      await onSendVoice(audioBlob, durationSeconds);
    } catch (err: any) {
      alert('Failed to send voice note');
    } finally {
      setUploading(false);
    }
  };

  const addEmoji = (emoji: string) => {
    setText((prev) => prev + emoji);
  };

  if (isRecordingVoice) {
    return (
      <div className="p-3 bg-wa-dark-panel dark:bg-wa-dark-panel bg-[#f0f2f5] border-t border-wa-dark-border dark:border-wa-dark-border">
        <VoiceRecorder
          onSendVoice={handleVoiceUpload}
          onCancel={() => setIsRecordingVoice(false)}
        />
      </div>
    );
  }

  return (
    <div className="relative p-3 bg-wa-dark-panel dark:bg-wa-dark-panel bg-[#f0f2f5] border-t border-wa-dark-border dark:border-wa-dark-border select-none">
      {/* Uploading progress indicator */}
      {uploading && (
        <div className="absolute -top-9 left-0 right-0 bg-emerald-600 text-white text-xs py-1.5 px-4 flex items-center justify-between font-semibold shadow-md animate-pulse">
          <div className="flex items-center gap-2">
            <UploadCloud className="w-4 h-4 animate-bounce" />
            <span>Streaming upload to Supabase (up to 1GB)...</span>
          </div>
          <span>Processing</span>
        </div>
      )}

      {/* Hidden File Inputs */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        className="hidden"
      />
      <input
        type="file"
        ref={imageInputRef}
        accept="image/*,video/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Emoji Picker Popover */}
      {showEmojiPicker && (
        <div className="absolute bottom-full left-3 mb-2 w-72 max-h-60 overflow-y-auto bg-wa-dark-panel dark:bg-wa-dark-panel bg-white border border-wa-dark-border dark:border-wa-dark-border rounded-2xl p-3 shadow-2xl z-30 grid grid-cols-8 gap-1 text-xl">
          {EMOJI_LIST.map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() => addEmoji(emoji)}
              className="p-1 hover:bg-wa-dark-hover rounded-lg transition-transform hover:scale-125"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}

      {/* Attachment Popover Menu */}
      {showAttachMenu && (
        <div className="absolute bottom-full left-12 mb-2 w-56 bg-wa-dark-panel dark:bg-wa-dark-panel bg-white border border-wa-dark-border dark:border-wa-dark-border rounded-2xl p-2 shadow-2xl z-30 space-y-1 text-xs font-semibold animate-in fade-in slide-in-from-bottom-2">
          <button
            type="button"
            onClick={() => imageInputRef.current?.click()}
            className="w-full flex items-center gap-3 p-2.5 hover:bg-wa-dark-hover dark:hover:bg-wa-dark-hover hover:bg-gray-100 rounded-xl transition-colors text-left"
          >
            <div className="p-2 bg-purple-500/20 text-purple-400 rounded-lg">
              <ImageIcon className="w-4 h-4" />
            </div>
            <div>
              <p>Photos & Videos</p>
              <p className="text-[10px] text-gray-400 font-normal">HD images, clips</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex items-center gap-3 p-2.5 hover:bg-wa-dark-hover dark:hover:bg-wa-dark-hover hover:bg-gray-100 rounded-xl transition-colors text-left"
          >
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <p>Document & Files</p>
              <p className="text-[10px] text-gray-400 font-normal">Up to 1GB per file</p>
            </div>
          </button>
        </div>
      )}

      {/* Input Bar */}
      <form onSubmit={handleSendText} className="flex items-center gap-2">
        {/* Emoji Button */}
        <button
          type="button"
          onClick={() => {
            setShowEmojiPicker(!showEmojiPicker);
            setShowAttachMenu(false);
          }}
          className="p-2 text-wa-dark-subtext dark:text-wa-dark-subtext text-gray-500 hover:text-wa-dark-text rounded-full hover:bg-wa-dark-hover transition-colors"
          title="Emojis"
        >
          <Smile className="w-6 h-6" />
        </button>

        {/* Attach Button */}
        <button
          type="button"
          onClick={() => {
            setShowAttachMenu(!showAttachMenu);
            setShowEmojiPicker(false);
          }}
          className="p-2 text-wa-dark-subtext dark:text-wa-dark-subtext text-gray-500 hover:text-wa-dark-text rounded-full hover:bg-wa-dark-hover transition-colors"
          title="Attach media or files (Up to 1GB)"
        >
          <Paperclip className="w-6 h-6" />
        </button>

        {/* Text Input */}
        <div className="flex-1 relative">
          <input
            type="text"
            value={text}
            onChange={handleTextChange}
            placeholder="Type a message or share files..."
            className="w-full py-2.5 px-4 bg-wa-dark-bg dark:bg-wa-dark-bg bg-white border border-wa-dark-border dark:border-wa-dark-border rounded-xl text-sm text-wa-dark-text dark:text-wa-dark-text text-gray-900 placeholder:text-wa-dark-subtext focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>

        {/* Voice Note or Send Button */}
        {text.trim() ? (
          <button
            type="submit"
            className="p-2.5 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white rounded-full transition-all shadow-md shrink-0"
            title="Send Message"
          >
            <Send className="w-5 h-5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setIsRecordingVoice(true)}
            className="p-2.5 text-wa-dark-subtext dark:text-wa-dark-subtext text-gray-500 hover:text-emerald-400 hover:bg-wa-dark-hover rounded-full transition-colors shrink-0"
            title="Record Voice Note"
          >
            <Mic className="w-6 h-6" />
          </button>
        )}
      </form>
    </div>
  );
};
