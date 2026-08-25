import React, { useState } from 'react';
import { HardDrive, Trash2, ShieldAlert, Sparkles, Check, RefreshCw } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.js';
import { Chat } from '../../types/index.js';
import api from '../../services/api.js';

interface StorageModalProps {
  currentChat?: Chat | null;
  onClose: () => void;
  onStorageUpdated?: () => void;
}

export const StorageModal: React.FC<StorageModalProps> = ({ currentChat, onClose, onStorageUpdated }) => {
  const { user, refreshProfile } = useAuth();
  const [selectedLimit, setSelectedLimit] = useState(
    currentChat ? String(Number(currentChat.max_storage_bytes) / (1024 * 1024)) : '1024'
  );
  const [saving, setSaving] = useState(false);

  const usedBytes = currentChat ? Number(currentChat.current_storage_bytes || 0) : Number(user?.storage_used_bytes || 0);
  const maxBytes = currentChat ? Number(currentChat.max_storage_bytes || 1073741824) : Number(user?.storage_limit_bytes || 1073741824);

  const usedMb = (usedBytes / (1024 * 1024)).toFixed(2);
  const maxMb = (maxBytes / (1024 * 1024)).toFixed(0);
  const percent = Math.min(100, Math.round((usedBytes / maxBytes) * 100)) || 0;

  const handleSaveChatLimit = async () => {
    if (!currentChat) return;
    setSaving(true);
    try {
      const bytes = parseInt(selectedLimit, 10) * 1024 * 1024;
      await api.patch(`/chats/${currentChat.id}/settings`, {
        max_storage_bytes: bytes,
      });
      if (onStorageUpdated) onStorageUpdated();
      alert('Storage limit updated successfully!');
      onClose();
    } catch (e: any) {
      alert(e.response?.data?.error || 'Failed to update storage limit');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-wa-dark-panel dark:bg-wa-dark-panel bg-white text-wa-dark-text dark:text-wa-dark-text text-gray-900 rounded-2xl shadow-2xl border border-wa-dark-border dark:border-wa-dark-border overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-wa-dark-bg/80 dark:bg-wa-dark-bg/80 bg-gray-50 border-b border-wa-dark-border">
          <div className="flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-base">
              {currentChat ? 'Chat Storage Management' : 'Account Storage & Auto-Purge'}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-white rounded-lg">
            ✕
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Storage Meter */}
          <div className="p-4 bg-wa-dark-bg/60 dark:bg-wa-dark-bg/60 bg-gray-50 border border-wa-dark-border/60 rounded-xl space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400">Used Storage Space</span>
              <span className="font-semibold text-emerald-400">
                {usedMb} MB / {maxMb} MB ({percent}%)
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-3 bg-gray-700/40 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  percent > 90
                    ? 'bg-red-500'
                    : percent > 70
                    ? 'bg-amber-500'
                    : 'bg-emerald-500'
                }`}
                style={{ width: `${percent}%` }}
              />
            </div>

            <p className="text-[11px] text-gray-400">
              Files up to 1GB can be shared. Storage is automatically tracked via Supabase PostgreSQL.
            </p>
          </div>

          {/* Auto-Purge Rules Box */}
          <div className="p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs space-y-1.5 text-amber-200">
            <div className="font-semibold flex items-center gap-1.5 text-amber-400">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>Smart Auto-Purge Protocol</span>
            </div>
            <p className="text-[11px] leading-relaxed text-gray-300">
              When this conversation reaches the quota limit, earlier media and messages will be <b>automatically deleted in chronological order</b> to make room for new files without exceeding your storage ceiling.
            </p>
          </div>

          {/* Configure Limit for Chat */}
          {currentChat && (
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1.5">
                Set Chat Quota Threshold
              </label>
              <select
                value={selectedLimit}
                onChange={(e) => setSelectedLimit(e.target.value)}
                className="w-full px-3 py-2.5 bg-wa-dark-bg dark:bg-wa-dark-bg bg-gray-50 border border-wa-dark-border dark:border-wa-dark-border rounded-xl text-sm focus:outline-none focus:border-emerald-500"
              >
                <option value="250">250 MB (Strict Auto-Purge)</option>
                <option value="500">500 MB</option>
                <option value="1024">1024 MB (1 GB Default)</option>
                <option value="2048">2048 MB (2 GB)</option>
                <option value="5120">5120 MB (5 GB)</option>
              </select>
            </div>
          )}

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-transparent hover:bg-wa-dark-hover text-gray-400 rounded-xl text-sm"
            >
              Close
            </button>
            {currentChat && (
              <button
                type="button"
                onClick={handleSaveChatLimit}
                disabled={saving}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-semibold rounded-xl text-sm shadow-md transition-all disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Apply Threshold'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
