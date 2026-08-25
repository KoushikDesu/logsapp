import React from 'react';
import { X, Download, Terminal, Crown } from 'lucide-react';
import { Message } from '../../types/index.js';

interface MediaLightboxProps {
  message: Message;
  onClose: () => void;
}

export const MediaLightbox: React.FC<MediaLightboxProps> = ({ message, onClose }) => {
  const downloadUrl = `/api/files/download/${message.id}`;
  const isVideo = message.message_type === 'video';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in fade-in">
      {/* Header bar */}
      <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent z-10 text-white">
        <div className="flex items-center gap-3">
          <div>
            <h4 className="font-semibold text-sm">{message.file_name || 'Media'}</h4>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span>By @{message.sender_username}</span>
              {message.quick_code && (
                <span className="font-mono text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                  Code: {message.quick_code}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={downloadUrl}
            download={message.file_name}
            className="p-2.5 bg-white/10 hover:bg-white/20 rounded-full text-emerald-400 transition-colors flex items-center gap-1.5 text-xs font-semibold"
          >
            <Download className="w-4 h-4" /> Download
          </a>
          <button
            onClick={onClose}
            className="p-2.5 bg-white/10 hover:bg-white/20 rounded-full text-gray-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl max-h-[85vh] flex items-center justify-center">
        {isVideo ? (
          <video
            src={downloadUrl}
            controls
            autoPlay
            className="max-w-full max-h-[80vh] rounded-xl shadow-2xl"
          />
        ) : (
          <img
            src={downloadUrl}
            alt={message.file_name || 'Preview'}
            className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
          />
        )}
      </div>
    </div>
  );
};
