import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Users,
  Search,
  Plus,
  Terminal,
  HardDrive,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  LogOut,
  Crown,
  CheckCheck,
  Check,
  MoreVertical,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.js';
import { useTheme } from '../../context/ThemeContext.js';
import { useSocket } from '../../context/SocketContext.js';
import { Chat, User } from '../../types/index.js';
import api from '../../services/api.js';
import { sounds } from '../../services/sound.js';
import { LiveSearchDropdown } from './LiveSearchDropdown.js';
import { CreateGroupModal } from './CreateGroupModal.js';
import { StorageModal } from '../Storage/StorageModal.js';
import { CLIModal } from '../CLI/CLIModal.js';

interface SidebarProps {
  chats: Chat[];
  activeChatId: string | null;
  onSelectChat: (chatId: string) => void;
  onChatCreated: (chatId: string) => void;
  onRefreshChats: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  chats,
  activeChatId,
  onSelectChat,
  onChatCreated,
  onRefreshChats,
}) => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { onlineUserIds } = useSocket();

  const [activeTab, setActiveTab] = useState<'all' | 'direct' | 'groups'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [searching, setSearching] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [showStorageModal, setShowStorageModal] = useState(false);
  const [showCLIModal, setShowCLIModal] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(sounds.isEnabled());

  // Live Typeahead search as the user types
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
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setSearching(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSelectUserFromSearch = async (targetUser: User) => {
    try {
      const res = await api.post('/chats/direct', { targetUserId: targetUser.id });
      onChatCreated(res.data.chatId);
      setSearchQuery('');
      setSearchResults([]);
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to start chat');
    }
  };

  const handleToggleSound = () => {
    const newState = sounds.toggleSound();
    setSoundEnabled(newState);
  };

  // Filter chats by tab
  const filteredChats = chats.filter((c) => {
    if (activeTab === 'direct') return !c.is_group;
    if (activeTab === 'groups') return c.is_group;
    return true;
  });

  return (
    <div className="w-full md:w-[380px] lg:w-[420px] h-full flex flex-col bg-wa-dark-bg dark:bg-wa-dark-bg bg-white border-r border-wa-dark-border dark:border-wa-dark-border shrink-0 select-none">
      {/* Top Profile & Actions Header */}
      <div className="h-16 px-4 flex items-center justify-between bg-wa-dark-panel dark:bg-wa-dark-panel bg-[#f0f2f5] border-b border-wa-dark-border dark:border-wa-dark-border">
        {/* User Profile Info */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative shrink-0">
            <img
              src={user?.avatar_url || `https://api.dicebear.com/7.x/bottts/svg?seed=${user?.username}`}
              alt={user?.display_name}
              className="w-10 h-10 rounded-full object-cover border border-wa-dark-border ring-1 ring-emerald-500/40"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-wa-dark-panel rounded-full" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="font-semibold text-sm truncate text-wa-dark-text dark:text-wa-dark-text text-gray-900">
                {user?.display_name}
              </h3>
            </div>
            <div className="flex items-center gap-1">
              <span className="inline-flex items-center gap-0.5 text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-1.5 py-0.2 rounded border border-amber-500/20">
                <Crown className="w-2.5 h-2.5" />
                {user?.royal_id}
              </span>
            </div>
          </div>
        </div>

        {/* Action Icon Buttons */}
        <div className="flex items-center gap-1 text-wa-dark-subtext dark:text-wa-dark-subtext text-gray-600">
          {/* CLI Companion Button */}
          <button
            onClick={() => setShowCLIModal(true)}
            className="p-2 hover:bg-wa-dark-hover dark:hover:bg-wa-dark-hover hover:bg-gray-200 rounded-full text-emerald-400 transition-colors"
            title="Linux CLI Terminal Tool"
          >
            <Terminal className="w-5 h-5" />
          </button>

          {/* Storage Meter Button */}
          <button
            onClick={() => setShowStorageModal(true)}
            className="p-2 hover:bg-wa-dark-hover dark:hover:bg-wa-dark-hover hover:bg-gray-200 rounded-full text-amber-400 transition-colors"
            title="Storage & Auto-Purge Manager"
          >
            <HardDrive className="w-5 h-5" />
          </button>

          {/* New Group Button */}
          <button
            onClick={() => setShowGroupModal(true)}
            className="p-2 hover:bg-wa-dark-hover dark:hover:bg-wa-dark-hover hover:bg-gray-200 rounded-full transition-colors"
            title="New Group Chat"
          >
            <Plus className="w-5 h-5" />
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-wa-dark-hover dark:hover:bg-wa-dark-hover hover:bg-gray-200 rounded-full transition-colors"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDark ? <Sun className="w-5 h-5 text-amber-300" /> : <Moon className="w-5 h-5 text-indigo-600" />}
          </button>

          {/* Sound Toggle Button */}
          <button
            onClick={handleToggleSound}
            className="p-2 hover:bg-wa-dark-hover dark:hover:bg-wa-dark-hover hover:bg-gray-200 rounded-full transition-colors"
            title={soundEnabled ? 'Mute Notification Sounds' : 'Unmute Sounds'}
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-gray-500" />}
          </button>

          {/* Logout Button */}
          <button
            onClick={logout}
            className="p-2 hover:bg-red-500/10 text-gray-400 hover:text-red-400 rounded-full transition-colors"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Live Search & Autocomplete Input */}
      <div className="p-2.5 bg-wa-dark-bg dark:bg-wa-dark-bg bg-white relative">
        <div className="relative flex items-center bg-wa-dark-panel dark:bg-wa-dark-panel bg-gray-100 rounded-xl px-3 py-1.5 focus-within:ring-1 focus-within:ring-emerald-500 border border-transparent focus-within:border-emerald-500 transition-all">
          <Search className="w-4 h-4 text-wa-dark-subtext dark:text-wa-dark-subtext text-gray-400 shrink-0 mr-2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search username or RoyalID..."
            className="w-full bg-transparent text-sm text-wa-dark-text dark:text-wa-dark-text text-gray-900 placeholder:text-wa-dark-subtext dark:placeholder:text-wa-dark-subtext placeholder:text-gray-400 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSearchResults([]);
              }}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Live Typeahead Results Dropdown */}
        <LiveSearchDropdown
          query={searchQuery}
          results={searchResults}
          loading={searching}
          onSelectUser={handleSelectUserFromSearch}
          onClose={() => {
            setSearchQuery('');
            setSearchResults([]);
          }}
        />
      </div>

      {/* Filter Tabs (All, Direct, Groups) */}
      <div className="px-3 py-1 flex items-center gap-1.5 border-b border-wa-dark-border/40 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-3 py-1 rounded-full transition-all ${
            activeTab === 'all'
              ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30'
              : 'text-wa-dark-subtext hover:bg-wa-dark-hover'
          }`}
        >
          All Chats
        </button>
        <button
          onClick={() => setActiveTab('direct')}
          className={`px-3 py-1 rounded-full transition-all ${
            activeTab === 'direct'
              ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30'
              : 'text-wa-dark-subtext hover:bg-wa-dark-hover'
          }`}
        >
          Direct
        </button>
        <button
          onClick={() => setActiveTab('groups')}
          className={`px-3 py-1 rounded-full transition-all ${
            activeTab === 'groups'
              ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30'
              : 'text-wa-dark-subtext hover:bg-wa-dark-hover'
          }`}
        >
          Groups
        </button>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto divide-y divide-wa-dark-border/20 dark:divide-wa-dark-border/20">
        {filteredChats.length === 0 ? (
          <div className="p-8 text-center text-wa-dark-subtext dark:text-wa-dark-subtext text-gray-500 text-xs space-y-2">
            <MessageSquare className="w-10 h-10 mx-auto opacity-30 text-emerald-500" />
            <p className="font-semibold text-sm">No conversations yet</p>
            <p>Type any username or RoyalID above to start a live chat!</p>
          </div>
        ) : (
          filteredChats.map((chat) => {
            const isActive = chat.id === activeChatId;
            const otherUser = !chat.is_group && chat.other_participants ? chat.other_participants[0] : null;
            const isOtherOnline = otherUser ? onlineUserIds.has(otherUser.id) : false;

            const chatTitle = chat.is_group
              ? chat.name
              : otherUser?.display_name || 'Direct Chat';
            const chatAvatar = chat.is_group
              ? chat.avatar_url || `https://api.dicebear.com/7.x/identicon/svg?seed=${chat.name}`
              : otherUser?.avatar_url || `https://api.dicebear.com/7.x/bottts/svg?seed=${otherUser?.username}`;

            const lastMessageText = chat.last_message
              ? chat.last_message.message_type !== 'text'
                ? `📎 [${chat.last_message.message_type.toUpperCase()}] ${chat.last_message.file_name || ''}`
                : chat.last_message.content
              : 'No messages yet';

            const lastTime = chat.last_message?.created_at
              ? new Date(chat.last_message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              : '';

            return (
              <div
                key={chat.id}
                onClick={() => onSelectChat(chat.id)}
                className={`flex items-center gap-3 p-3.5 cursor-pointer transition-colors ${
                  isActive
                    ? 'bg-wa-dark-hover dark:bg-wa-dark-hover bg-gray-200/80 border-l-4 border-emerald-500'
                    : 'hover:bg-wa-dark-panel dark:hover:bg-wa-dark-panel hover:bg-gray-100'
                }`}
              >
                {/* Avatar */}
                <div className="relative shrink-0">
                  <img
                    src={chatAvatar}
                    alt={chatTitle}
                    className="w-12 h-12 rounded-full object-cover bg-wa-dark-panel"
                  />
                  {!chat.is_group && isOtherOnline && (
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-wa-dark-bg rounded-full" />
                  )}
                  {chat.is_group && (
                    <span className="absolute -bottom-1 -right-1 p-0.5 bg-emerald-700 text-white rounded-full">
                      <Users className="w-3 h-3" />
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-sm truncate text-wa-dark-text dark:text-wa-dark-text text-gray-900">
                      {chatTitle}
                    </h4>
                    <span className="text-[11px] text-wa-dark-subtext dark:text-wa-dark-subtext text-gray-500 shrink-0 ml-2">
                      {lastTime}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-wa-dark-subtext dark:text-wa-dark-subtext text-gray-500 truncate pr-2">
                      {lastMessageText}
                    </p>

                    {/* Unread Badge */}
                    {Boolean(chat.unread_count && chat.unread_count > 0) && (
                      <span className="shrink-0 bg-emerald-500 text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow">
                        {chat.unread_count}
                      </span>
                    )}
                  </div>

                  {/* RoyalID Tag for direct chats */}
                  {otherUser && (
                    <div className="mt-1 flex items-center gap-1">
                      <span className="text-[9px] font-mono text-amber-400 bg-amber-500/10 px-1 rounded border border-amber-500/20">
                        {otherUser.royal_id}
                      </span>
                      {isOtherOnline && (
                        <span className="text-[9px] text-emerald-400 font-medium">Online</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modals */}
      {showGroupModal && (
        <CreateGroupModal
          onClose={() => setShowGroupModal(false)}
          onGroupCreated={(group) => {
            onChatCreated(group.id);
            onRefreshChats();
          }}
        />
      )}

      {showStorageModal && (
        <StorageModal
          onClose={() => setShowStorageModal(false)}
          onStorageUpdated={onRefreshChats}
        />
      )}

      {showCLIModal && <CLIModal onClose={() => setShowCLIModal(false)} />}
    </div>
  );
};
