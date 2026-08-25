import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.js';
import { User, Copy, Check, X, HardDrive, Sparkles, RefreshCw, Shield, Edit3, LogOut, CheckCheck } from 'lucide-react';

interface ProfileModalProps {
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ onClose }) => {
  const { user, updateUser, logout } = useAuth();
  const [displayName, setDisplayName] = useState(user?.display_name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar_url || '');
  const [copiedId, setCopiedId] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleCopyRoyalId = () => {
    if (user?.royal_id) {
      navigator.clipboard.writeText(user.royal_id);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  const handleShuffleAvatar = () => {
    const seed = Math.random().toString(36).substring(2, 8);
    const newAvatar = `https://api.dicebear.com/7.x/bottts/svg?seed=${seed}`;
    setAvatarUrl(newAvatar);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);
    try {
      await updateUser({
        display_name: displayName.trim(),
        bio: bio.trim(),
        avatar_url: avatarUrl,
      });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const usedMb = (Number(user?.storage_used_bytes || 0) / (1024 * 1024)).toFixed(2);
  const limitMb = (Number(user?.storage_limit_bytes || 1073741824) / (1024 * 1024)).toFixed(0);
  const percent = Math.min(100, Math.round((Number(user?.storage_used_bytes || 0) / Number(user?.storage_limit_bytes || 1073741824)) * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in">
      <div className="w-full max-w-md bg-slateDark-surface dark:bg-slateDark-surface bg-white text-slateDark-text dark:text-slateDark-text text-slate-900 rounded-3xl shadow-2xl border border-slateDark-border dark:border-slateDark-border overflow-hidden">
        {/* Profile Card Header with Gradient */}
        <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 text-white text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Avatar with shuffle button */}
          <div className="relative inline-block mx-auto mb-2">
            <img
              src={avatarUrl || user?.avatar_url || `https://api.dicebear.com/7.x/bottts/svg?seed=${user?.username}`}
              alt={user?.display_name}
              className="w-20 h-20 rounded-2xl object-cover bg-slate-900 ring-4 ring-white/20 shadow-xl"
            />
            <button
              type="button"
              onClick={handleShuffleAvatar}
              className="absolute -bottom-1 -right-1 p-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow transition-transform active:scale-90"
              title="Generate New Avatar"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          <h3 className="text-xl font-bold font-heading">{user?.display_name}</h3>
          <p className="text-xs text-blue-100 font-mono">@{user?.username}</p>
        </div>

        {/* 7-Digit Royal ID Banner */}
        <div className="p-4 bg-slateDark-bg dark:bg-slateDark-bg bg-slate-50 border-b border-slateDark-border/60 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">7-Digit Royal ID</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-lg font-mono font-extrabold text-amber-400 tracking-wider">
                #{user?.royal_id}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCopyRoyalId}
            className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95"
          >
            {copiedId ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy ID</span>
              </>
            )}
          </button>
        </div>

        {/* Profile Edit Form */}
        <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[55vh] overflow-y-auto">
          {savedSuccess && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs flex items-center gap-2 animate-in fade-in">
              <CheckCheck className="w-4 h-4" />
              <span>Profile updated successfully!</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Display Name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-3 py-2 bg-slateDark-bg dark:bg-slateDark-bg bg-slate-50 border border-slateDark-border dark:border-slateDark-border rounded-xl text-sm focus:outline-none focus:border-blue-500 text-slate-100"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">About / Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={2}
              className="w-full px-3 py-2 bg-slateDark-bg dark:bg-slateDark-bg bg-slate-50 border border-slateDark-border dark:border-slateDark-border rounded-xl text-sm focus:outline-none focus:border-blue-500 resize-none text-slate-100"
            />
          </div>

          {/* Storage Meter */}
          <div className="p-3.5 bg-slateDark-bg/60 dark:bg-slateDark-bg/60 bg-slate-100 border border-slateDark-border/40 rounded-xl space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 flex items-center gap-1">
                <HardDrive className="w-3.5 h-3.5 text-blue-400" /> Storage Usage
              </span>
              <span className="font-mono text-blue-400 font-semibold">{usedMb} MB / {limitMb} MB ({percent}%)</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${percent}%` }} />
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={logout}
              className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-transparent hover:bg-slateDark-hover text-slate-400 rounded-xl text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl text-xs shadow-md transition-all disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Profile'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
