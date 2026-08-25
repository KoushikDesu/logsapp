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
  Sparkles,
  X,
  User as UserIcon
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.js';
import { useTheme } from '../../context/ThemeContext.js';
import { useSocket } from '../../context/SocketContext.js';
import { Chat, User } from '../../types/index.js';
import api from '../../services/api.js';
import { sounds } from '../../services/sound.js';
import { BrandLogo } from '../Common/BrandLogo.js';
import { LiveSearchDropdown } from './LiveSearchDropdown.js';
import { CreateGroupModal } from './CreateGroupModal.js';
import { StorageModal } from '../Storage/StorageModal.js';
import { CLIModal } from '../CLI/CLIModal.js';
import { ProfileModal } from '../Auth/ProfileModal.js';

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
  
  // Modals
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [showStorageModal, setShowStorageModal] = useState(false);
  const [showCLIModal, setShowCLIModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
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
    <div className="w-full md:w-[380px] lg:w-[420px] h-full flex flex-col bg-slateDark-bg dark:bg-slateDark-bg bg-white border-r border-slateDark-border dark:border-slateDark-border shrink-0 select-none">
      {/* Top Header with Brand Logo & User Profile Trigger */}
      <div className="h-16 px-4 flex items-center justify-between bg-slateDark-surface dark:bg-slateDark-surface bg-slate-50 border-b border-slateDark-border dark:border-slateDark-border">
        {/* User Profile Button (Click to open Profile Modal) */}
        <button
          type="button"
          onClick={() => setShowProfileModal(true)}
          className="flex items-center gap-3 min-w-0 p-1 rounded-xl hover:bg-slateDark-hover dark:hover:bg-slateDark-hover hover:bg-slate-200/60 transition-all text-left group"
          title="Click to view & edit Profile / Royal ID"
        >
          <div className="relative shrink-0">
            <img
              src={user?.avatar_url || `https://api.dicebear.com/7.x/bottts/svg?seed=${user?.username}`}
              alt={user?.display_name}
              className="w-10 h-10 rounded-xl object-cover bg-slate-900 ring-2 ring-blue-500/40 group-hover:ring-blue-400 transition-all"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slateDark-surface rounded-full" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1">
              <h3 className="font-semibold text-sm truncate text-slateDark-text dark:text-slateDark-text text-slate-900 group-hover:text-blue-400 transition-colors">
                {user?.display_name}
              </h3>
            </div>
            <div className="flex items-center gap-1">
              <span className="inline-flex items-center gap-0.5 text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-1.5 py-0.2 rounded border border-amber-500/20">
                #{user?.royal_id}
              </span>
            </div>
          </div>
        </button>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-1 text-slate-400">
          {/* CLI Companion Button */}
          <button
            onClick={() => setShowCLIModal(true)}
            className="p-2 hover:bg-slateDark-hover dark:hover:bg-slateDark-hover hover:bg-slate-200 rounded-xl text-blue-400 transition-colors"
            title="Linux CLI Terminal Tool"
          >
            <Terminal className="w-4 h-4" />
          </button>

          {/* Storage Meter Button */}
          <button
            onClick={() => setShowStorageModal(true)}
            className="p-2 hover:bg-slateDark-hover dark:hover:bg-slateDark-hover hover:bg-slate-200 rounded-xl text-amber-400 transition-colors"
            title="Storage & Auto-Purge"
          >
            <HardDrive className="w-4 h-4" />
          </button>

          {/* New Group Button */}
          <button
            onClick={() => setShowGroupModal(true)}
            className="p-2 hover:bg-slateDark-hover dark:hover:bg-slateDark-hover hover:bg-slate-200 rounded-xl transition-colors"
            title="New Group Chat"
          >
            <Plus className="w-4 h-4" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-slateDark-hover dark:hover:bg-slateDark-hover hover:bg-slate-200 rounded-xl transition-colors"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>

          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            className="p-2 hover:bg-slateDark-hover dark:hover:bg-slateDark-hover hover:bg-slate-200 rounded-xl transition-colors"
            title={soundEnabled ? 'Mute Sounds' : 'Unmute Sounds'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>
        </div>
      </div>

      {/* Live Search & Autocomplete Input */}
      <div className="p-3 bg-slateDark-bg dark:bg-slateDark-bg bg-white relative">
        <div className="relative flex items-center bg-slateDark-surface dark:bg-slateDark-surface bg-slate-100 rounded-xl px-3 py-2 focus-within:ring-1 focus-within:ring-blue-500 border border-slateDark-border/60 focus-within:border-blue-500 transition-all">
          <Search className="w-4 h-4 text-slate-400 shrink-0 mr-2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by username or 7-digit Royal ID..."
            className="w-full bg-transparent text-sm text-slateDark-text dark:text-slateDark-text text-slate-900 placeholder:text-slate-500 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSearchResults([]);
              }}
              className="text-slate-400 hover:text-slate-200"
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
      <div className="px-3 py-1.5 flex items-center gap-1.5 border-b border-slateDark-border/40 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-3 py-1 rounded-xl transition-all ${
            activeTab === 'all'
              ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
              : 'text-slate-400 hover:bg-slateDark-hover'
          }`}
        >
          All Chats
        </button>
        <button
          onClick={() => setActiveTab('direct')}
          className={`px-3 py-1 rounded-xl transition-all ${
            activeTab === 'direct'
              ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
              : 'text-slate-400 hover:bg-slateDark-hover'
          }`}
        >
          Direct
        </button>
        <button
          onClick={() => setActiveTab('groups')}
          className={`px-3 py-1 rounded-xl transition-all ${
            activeTab === 'groups'
              ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
              : 'text-slate-400 hover:bg-slateDark-hover'
          }`}
        >
          Groups
        </button>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto divide-y divide-slateDark-border/30 dark:divide-slateDark-border/30">
        {filteredChats.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs space-y-2">
            <MessageSquare className="w-10 h-10 mx-auto opacity-30 text-blue-500" />
            <p className="font-semibold text-sm text-slate-300">No conversations yet</p>
            <p>Search any username or Royal ID above to start chatting!</p>
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
                    ? 'bg-slateDark-hover dark:bg-slateDark-hover bg-slate-200/80 border-l-4 border-blue-500'
                    : 'hover:bg-slateDark-surface dark:hover:bg-slateDark-surface hover:bg-slate-100'
                }`}
              >
                {/* Avatar */}
                <div className="relative shrink-0">
                  <img
                    src={chatAvatar}
                    alt={chatTitle}
                    className="w-12 h-12 rounded-xl object-cover bg-slate-900 border border-slateDark-border"
                  />
                  {!chat.is_group && isOtherOnline && (
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-slateDark-bg rounded-full" />
                  )}
                  {chat.is_group && (
                    <span className="absolute -bottom-1 -right-1 p-0.5 bg-blue-600 text-white rounded-full">
                      <Users className="w-3 h-3" />
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-sm truncate text-slateDark-text dark:text-slateDark-text text-slate-900">
                      {chatTitle}
                    </h4>
                    <span className="text-[11px] text-slate-500 shrink-0 ml-2">
                      {lastTime}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-slate-400 truncate pr-2">
                      {lastMessageText}
                    </p>

                    {/* Unread Badge */}
                    {Boolean(chat.unread_count && chat.unread_count > 0) && (
                      <span className="shrink-0 bg-blue-600 text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow">
                        {chat.unread_count}
                      </span>
                    )}
                  </div>

                  {/* 7-digit Royal ID for direct chats */}
                  {otherUser && (
                    <div className="mt-1 flex items-center gap-1.5">
                      <span className="text-[9px] font-mono text-amber-400 bg-amber-500/10 px-1.5 py-0.2 rounded border border-amber-500/20 font-bold">
                        #{otherUser.royal_id}
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
      {showProfileModal && <ProfileModal onClose={() => setShowProfileModal(false)} />}

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
