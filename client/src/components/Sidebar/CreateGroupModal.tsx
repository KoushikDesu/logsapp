import React, { useState, useEffect } from 'react';
import api from '../../services/api.js';
import { User } from '../../types/index.js';
import { Users, X, Check, Search, HardDrive, Crown } from 'lucide-react';

interface CreateGroupModalProps {
  onClose: () => void;
  onGroupCreated: (group: any) => void;
}

export const CreateGroupModal: React.FC<CreateGroupModalProps> = ({ onClose, onGroupCreated }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [storageLimitMb, setStorageLimitMb] = useState('1024'); // 1 GB default
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);

  // Search users to add as members
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      setSearching(true);
      try {
        const res = await api.get(`/auth/search?q=${encodeURIComponent(searchQuery)}`);
        setSearchResults(res.data.users || []);
      } catch (e) {
        console.error(e);
      } finally {
        setSearching(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const toggleUser = (u: User) => {
    if (selectedUsers.some((item) => item.id === u.id)) {
      setSelectedUsers(selectedUsers.filter((item) => item.id !== u.id));
    } else {
      setSelectedUsers([...selectedUsers, u]);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    try {
      const storageBytes = parseInt(storageLimitMb, 10) * 1024 * 1024;
      const res = await api.post('/chats/group', {
        name,
        description,
        member_ids: selectedUsers.map((u) => u.id),
        max_storage_bytes: storageBytes,
      });
      onGroupCreated(res.data.group);
      onClose();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to create group');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-wa-dark-panel dark:bg-wa-dark-panel bg-white text-wa-dark-text dark:text-wa-dark-text text-gray-900 rounded-2xl shadow-2xl border border-wa-dark-border dark:border-wa-dark-border overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-wa-dark-bg/80 dark:bg-wa-dark-bg/80 bg-gray-50 border-b border-wa-dark-border">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-500" />
            <h3 className="font-bold text-base">New Group Chat</h3>
          </div>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleCreate} className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Group Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Royal Developers"
              required
              className="w-full px-3 py-2 bg-wa-dark-bg dark:bg-wa-dark-bg bg-gray-50 border border-wa-dark-border dark:border-wa-dark-border rounded-xl text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Description (Optional)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Group purpose, rules, topics..."
              rows={2}
              className="w-full px-3 py-2 bg-wa-dark-bg dark:bg-wa-dark-bg bg-gray-50 border border-wa-dark-border dark:border-wa-dark-border rounded-xl text-sm focus:outline-none focus:border-emerald-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1 flex items-center gap-1">
              <HardDrive className="w-3.5 h-3.5 text-amber-400" />
              <span>Storage Quota Limit (Auto-Purge Threshold)</span>
            </label>
            <select
              value={storageLimitMb}
              onChange={(e) => setStorageLimitMb(e.target.value)}
              className="w-full px-3 py-2 bg-wa-dark-bg dark:bg-wa-dark-bg bg-gray-50 border border-wa-dark-border dark:border-wa-dark-border rounded-xl text-sm focus:outline-none focus:border-emerald-500"
            >
              <option value="500">500 MB</option>
              <option value="1024">1 GB (Default Recommended)</option>
              <option value="2048">2 GB</option>
              <option value="5120">5 GB</option>
            </select>
            <p className="text-[11px] text-gray-400 mt-1">
              Oldest media files will be automatically purged when this threshold is exceeded.
            </p>
          </div>

          {/* Selected Members Badges */}
          {selectedUsers.length > 0 && (
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">
                Selected Members ({selectedUsers.length})
              </label>
              <div className="flex flex-wrap gap-2">
                {selectedUsers.map((u) => (
                  <span
                    key={u.id}
                    className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-full text-xs font-medium"
                  >
                    @{u.username}
                    <button type="button" onClick={() => toggleUser(u)}>
                      <X className="w-3 h-3 hover:text-red-400" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Search Members */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Add Members</label>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by username or RoyalID..."
                className="w-full pl-9 pr-3 py-2 bg-wa-dark-bg dark:bg-wa-dark-bg bg-gray-50 border border-wa-dark-border dark:border-wa-dark-border rounded-xl text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Results */}
            {searchResults.length > 0 && (
              <div className="mt-2 max-h-40 overflow-y-auto border border-wa-dark-border rounded-xl divide-y divide-wa-dark-border/30">
                {searchResults.map((u) => {
                  const isSelected = selectedUsers.some((item) => item.id === u.id);
                  return (
                    <div
                      key={u.id}
                      onClick={() => toggleUser(u)}
                      className={`flex items-center justify-between p-2 hover:bg-wa-dark-hover cursor-pointer transition-colors ${
                        isSelected ? 'bg-emerald-500/10' : ''
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={u.avatar_url || `https://api.dicebear.com/7.x/bottts/svg?seed=${u.username}`}
                          alt={u.username}
                          className="w-7 h-7 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-xs font-semibold">{u.display_name} <span className="text-gray-400 font-normal">(@{u.username})</span></p>
                          <span className="text-[10px] text-amber-400 font-mono">{u.royal_id}</span>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${isSelected ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-gray-500'}`}>
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-transparent hover:bg-wa-dark-hover text-gray-400 rounded-xl text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !name.trim()}
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-semibold rounded-xl text-sm shadow-md transition-all disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Group'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
