import React from 'react';
import { User } from '../../types/index.js';
import { Crown, MessageSquarePlus, UserCheck, Shield } from 'lucide-react';

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
    <div className="absolute top-full left-0 right-0 z-30 mt-1 max-h-80 overflow-y-auto bg-wa-dark-panel dark:bg-wa-dark-panel bg-white border border-wa-dark-border dark:border-wa-dark-border rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
      <div className="p-2 bg-wa-dark-bg/50 dark:bg-wa-dark-bg/50 bg-gray-50 border-b border-wa-dark-border/40 flex items-center justify-between text-[11px] text-gray-400">
        <span>Search results for "{query}"</span>
        {loading && <span className="text-emerald-500 font-medium animate-pulse">Searching...</span>}
      </div>

      {loading && results.length === 0 ? (
        <div className="p-6 text-center text-xs text-gray-400">
          <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          Finding Royal members...
        </div>
      ) : results.length === 0 ? (
        <div className="p-6 text-center text-xs text-gray-400">
          No users or RoyalIDs found matching "{query}"
        </div>
      ) : (
        <div className="divide-y divide-wa-dark-border/20 dark:divide-wa-dark-border/20">
          {results.map((user) => (
            <div
              key={user.id}
              onClick={() => {
                onSelectUser(user);
                onClose();
              }}
              className="flex items-center gap-3 p-3 hover:bg-wa-dark-hover dark:hover:bg-wa-dark-hover hover:bg-gray-100 cursor-pointer transition-colors"
            >
              {/* Avatar */}
              <div className="relative shrink-0">
                <img
                  src={user.avatar_url || `https://api.dicebear.com/7.x/bottts/svg?seed=${user.username}`}
                  alt={user.display_name}
                  className="w-10 h-10 rounded-full object-cover bg-wa-dark-bg"
                />
                {user.is_online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-wa-dark-panel rounded-full" />
                )}
              </div>

              {/* User Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold truncate text-wa-dark-text dark:text-wa-dark-text text-gray-900">
                    {user.display_name}
                  </h4>
                  <span className="inline-flex items-center gap-0.5 text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                    <Crown className="w-2.5 h-2.5" />
                    {user.royal_id}
                  </span>
                </div>
                <p className="text-xs text-gray-400 truncate">@{user.username}</p>
                {user.bio && <p className="text-[11px] text-gray-500 truncate mt-0.5">{user.bio}</p>}
              </div>

              {/* Chat action button */}
              <button
                type="button"
                className="p-2 text-emerald-500 hover:bg-emerald-500/10 rounded-lg shrink-0 transition-colors"
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
