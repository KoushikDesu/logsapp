import React, { useState, useEffect, useCallback, Component, ErrorInfo, ReactNode } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext.js';
import { ThemeProvider, useTheme } from './context/ThemeContext.js';
import { SocketProvider } from './context/SocketContext.js';
import { AuthModal } from './components/Auth/AuthModal.js';
import { Sidebar } from './components/Sidebar/Sidebar.js';
import { ChatArea } from './components/Chat/ChatArea.js';
import { BrandLogo } from './components/Common/BrandLogo.js';
import { Chat, Message } from './types/index.js';
import api from './services/api.js';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('UI Render Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-950 text-slate-100 p-6 text-center space-y-4 select-none">
          <BrandLogo size="lg" showText={false} />
          <h2 className="text-xl font-bold font-heading">Something went wrong</h2>
          <p className="text-xs text-slate-400 max-w-sm">
            {this.state.error?.message || 'An unexpected rendering error occurred.'}
          </p>
          <button
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow-lg transition-all"
          >
            Reset Session & Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

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
      <div className="h-screen w-screen flex items-center justify-center bg-slateDark-bg text-blue-500 select-none">
        <div className="flex flex-col items-center gap-3">
          <BrandLogo size="lg" showText={false} />
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mt-2" />
          <span className="font-semibold text-xs tracking-wide text-slate-400">Loading RoyalChat...</span>
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
      <div className="h-screen w-screen flex overflow-hidden bg-slateDark-bg dark:bg-slateDark-bg bg-slate-50 text-slateDark-text dark:text-slateDark-text text-slate-900 select-none">
        {/* Sidebar (Desktop visible, Mobile conditionally visible) */}
        <div
          className={`h-full ${
            mobileView === 'sidebar' ? 'w-full md:w-[380px] lg:w-[420px] block' : 'hidden md:block'
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
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <MainLayout />
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
