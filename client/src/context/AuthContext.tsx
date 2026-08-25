import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api.js';
import { User } from '../types/index.js';

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (identifier: string, pass: string) => Promise<void>;
  register: (data: { username: string; password: string; display_name: string; royal_id?: string; email?: string; avatar_url?: string }) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<User>) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('logsapp_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('logsapp_token'));
  const [loading, setLoading] = useState<boolean>(true);

  const refreshProfile = async () => {
    if (!localStorage.getItem('logsapp_token')) {
      setLoading(false);
      return;
    }
    try {
      const res = await api.get('/auth/me');
      if (res.data?.user) {
        setUser(res.data.user);
        localStorage.setItem('logsapp_user', JSON.stringify(res.data.user));
      }
    } catch (e) {
      console.error('Failed to fetch user me:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshProfile();

    const handleLogoutEvent = () => {
      setUser(null);
      setToken(null);
    };

    window.addEventListener('auth_logout', handleLogoutEvent);
    return () => window.removeEventListener('auth_logout', handleLogoutEvent);
  }, []);

  const login = async (identifier: string, pass: string) => {
    const res = await api.post('/auth/login', { identifier, password: pass });
    const { token: newToken, user: newUser } = res.data;
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('logsapp_token', newToken);
    localStorage.setItem('logsapp_user', JSON.stringify(newUser));
  };

  const register = async (data: { username: string; password: string; display_name: string; royal_id?: string; email?: string; avatar_url?: string }) => {
    const res = await api.post('/auth/register', data);
    const { token: newToken, user: newUser } = res.data;
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('logsapp_token', newToken);
    localStorage.setItem('logsapp_user', JSON.stringify(newUser));
  };

  const logout = () => {
    localStorage.removeItem('logsapp_token');
    localStorage.removeItem('logsapp_user');
    setToken(null);
    setUser(null);
  };

  const updateUser = async (data: Partial<User>) => {
    const res = await api.put('/auth/me', data);
    if (res.data?.user) {
      setUser(res.data.user);
      localStorage.setItem('logsapp_user', JSON.stringify(res.data.user));
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, updateUser, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
