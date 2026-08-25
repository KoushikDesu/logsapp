import React from 'react';
import { User } from '../../types/index.js';
import { MessageSquarePlus, Sparkles } from 'lucide-react';

interface LiveSearchDropdownProps {
  query: string;
  results: User[];
  loading: boolean;
  onSelectUser: (user: User) => void;
  onClose: () => void;
}

export const LiveSearchDropdown: React.FC<LiveSearchDropdownProps> = ({
  query,
  results,
  loading,
  onSelectUser,
  onClose,
}) => {
  if (!query) return null;

  return (
    <div className="absolute top-full left-0 right-0 z-30 mt-1.5 max-h-80 overflow-y-auto bg-slateDark-surface dark:bg-slateDark-surface bg-white border border-slateDark-border dark:border-slateDark-border rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
      <div className="p-2.5 bg-slateDark-bg/60 dark:bg-slateDark-bg/60 bg-slate-50 border-b border-slateDark-border/40 flex items-center justify-between text-[11px] text-slate-400 font-medium">
        <span>Results for "{query}"</span>
        {loading && <span className="text-blue-400 font-medium animate-pulse">Searching...</span>}
      </div>

      {loading && results.length === 0 ? (
        <div className="p-6 text-center text-xs text-slate-400">
          <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          Finding members...
        </div>
      ) : results.length === 0 ? (
        <div className="p-6 text-center text-xs text-slate-400">
          No users or Royal IDs found matching "{query}"
        </div>
      ) : (
        <div className="divide-y divide-slateDark-border/30 dark:divide-slateDark-border/30">
          {results.map((user) => (
            <div
              key={user.id}
              onClick={() => {
                onSelectUser(user);
                onClose();
              }}
              className="flex items-center gap-3 p-3 hover:bg-slateDark-hover dark:hover:bg-slateDark-hover hover:bg-slate-100 cursor-pointer transition-colors"
            >
              {/* Avatar */}
              <div className="relative shrink-0">
                <img
                  src={user.avatar_url || `https://api.dicebear.com/7.x/bottts/svg?seed=${user.username}`}
                  alt={user.display_name}
                  className="w-10 h-10 rounded-xl object-cover bg-slate-900 border border-slateDark-border"
                />
                {user.is_online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slateDark-surface rounded-full" />
                )}
              </div>

              {/* User Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold truncate text-slateDark-text dark:text-slateDark-text text-slate-900">
                    {user.display_name}
                  </h4>
                  <span className="inline-flex items-center gap-0.5 text-[10px] font-mono font-extrabold text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                    #{user.royal_id}
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono">@{user.username}</p>
                {user.bio && <p className="text-[11px] text-slate-500 truncate mt-0.5">{user.bio}</p>}
              </div>

              {/* Chat action button */}
              <button
                type="button"
                className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-xl shrink-0 transition-colors"
                title="Start Chat"
              >
                <MessageSquarePlus className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
