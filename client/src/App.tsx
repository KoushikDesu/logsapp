import React, { useState, useEffect, useCallback } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext.js';
import { ThemeProvider, useTheme } from './context/ThemeContext.js';
import { SocketProvider } from './context/SocketContext.js';
import { AuthModal } from './components/Auth/AuthModal.js';
import { Sidebar } from './components/Sidebar/Sidebar.js';
import { ChatArea } from './components/Chat/ChatArea.js';
import { Chat, Message } from './types/index.js';
import api from './services/api.js';

const MainLayout: React.FC = () => {
  const { user, token, loading } = useAuth();
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [mobileView, setMobileView] = useState<'sidebar' | 'chat'>('sidebar');

  const fetchChats = useCallback(async () => {
    if (!token) return;
    try {
      const res = await api.get('/chats');
      setChats(res.data.chats || []);
    } catch (err) {
      console.error('Failed to fetch chats:', err);
    }
  }, [token]);

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  const handleSelectChat = (chatId: string) => {
    setActiveChatId(chatId);
    setMobileView('chat');
  };

  const handleBackToSidebar = () => {
    setMobileView('sidebar');
  };

  const handleNewMessage = (msg: Message, chatId: string) => {
    setChats((prev) =>
      prev.map((c) => {
        if (c.id === chatId) {
          const isCurrentActive = activeChatId === chatId;
          return {
            ...c,
            last_message: {
              id: msg.id,
              content: msg.content,
              message_type: msg.message_type,
              file_name: msg.file_name,
              file_size_bytes: msg.file_size_bytes as number,
              sender_id: msg.sender_id,
              created_at: msg.created_at,
            },
            unread_count: isCurrentActive ? 0 : (c.unread_count || 0) + 1,
            updated_at: new Date().toISOString(),
          };
        }
        return c;
      })
    );
  };

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[#111b21] text-emerald-500">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <span className="font-semibold text-sm tracking-wide">Loading LogsApp...</span>
        </div>
      </div>
    );
  }

  if (!user || !token) {
    return <AuthModal />;
  }

  const activeChat = chats.find((c) => c.id === activeChatId) || null;

  return (
    <SocketProvider onNewMessage={handleNewMessage}>
      <div className="h-screen w-screen flex overflow-hidden bg-wa-dark-bg text-wa-dark-text select-none">
        {/* Sidebar (Desktop visible, Mobile conditionally visible) */}
        <div
          className={`h-full ${
            mobileView === 'sidebar' ? 'w-full block' : 'hidden md:block'
          }`}
        >
          <Sidebar
            chats={chats}
            activeChatId={activeChatId}
            onSelectChat={handleSelectChat}
            onChatCreated={(newChatId) => {
              fetchChats();
              handleSelectChat(newChatId);
            }}
            onRefreshChats={fetchChats}
          />
        </div>

        {/* Chat Area (Desktop visible, Mobile conditionally visible) */}
        <div
          className={`h-full flex-1 ${
            mobileView === 'chat' ? 'w-full flex' : 'hidden md:flex'
          }`}
        >
          <ChatArea
            chat={activeChat}
            onBack={handleBackToSidebar}
            onRefreshChat={fetchChats}
          />
        </div>
      </div>
    </SocketProvider>
  );
};

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MainLayout />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
