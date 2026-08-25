import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.js';
import { Crown, Sparkles, Shield, User, Lock, Mail, Terminal, ArrowRight, RefreshCw } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { login, register } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [identifier, setIdentifier] = useState('');
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [royalId, setRoyalId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const generateRandomRoyalId = () => {
    const num = Math.floor(1000 + Math.random() * 9000);
    const alpha = Math.random().toString(36).substring(2, 5).toUpperCase();
    setRoyalId(`ROYAL-${num}${alpha}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegister) {
        if (!username || !password || !displayName) {
          setError('Please fill in username, display name, and password');
          setLoading(false);
          return;
        }
        await register({
          username,
          password,
          display_name: displayName,
          royal_id: royalId || undefined,
          email: email || undefined,
        });
      } else {
        if (!identifier || !password) {
          setError('Please enter your username/RoyalID and password');
          setLoading(false);
          return;
        }
        await login(identifier, password);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md bg-wa-dark-panel dark:bg-wa-dark-panel bg-white text-wa-dark-text dark:text-wa-dark-text text-gray-900 rounded-2xl shadow-2xl border border-wa-dark-border/40 dark:border-wa-dark-border/40 overflow-hidden">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-6 text-white text-center relative">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md mb-3 shadow-inner">
            <Crown className="w-8 h-8 text-amber-300" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">LogsApp / RoyalChat</h1>
          <p className="text-emerald-100 text-xs mt-1">
            WhatsApp-like Messenger • 1GB File Sharing • Linux CLI Ready
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-wa-dark-border/20 dark:border-wa-dark-border/20">
          <button
            type="button"
            onClick={() => { setIsRegister(false); setError(''); }}
            className={`flex-1 py-3 text-sm font-semibold text-center transition-all ${
              !isRegister
                ? 'text-emerald-500 border-b-2 border-emerald-500 bg-emerald-500/5'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setIsRegister(true); setError(''); }}
            className={`flex-1 py-3 text-sm font-semibold text-center transition-all ${
              isRegister
                ? 'text-emerald-500 border-b-2 border-emerald-500 bg-emerald-500/5'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            Create Account & RoyalID
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-xs flex items-center gap-2">
              <Shield className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {!isRegister ? (
            /* Login Form */
            <>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Username, RoyalID, or Email
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="e.g. king or ROYAL-9821"
                    required
                    className="w-full pl-10 pr-3 py-2.5 bg-wa-dark-bg dark:bg-wa-dark-bg bg-gray-50 border border-wa-dark-border dark:border-wa-dark-border rounded-xl text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-10 pr-3 py-2.5 bg-wa-dark-bg dark:bg-wa-dark-bg bg-gray-50 border border-wa-dark-border dark:border-wa-dark-border rounded-xl text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>
            </>
          ) : (
            /* Register Form */
            <>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Display Name
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="e.g. Alexander King"
                  required
                  className="w-full px-3 py-2 bg-wa-dark-bg dark:bg-wa-dark-bg bg-gray-50 border border-wa-dark-border dark:border-wa-dark-border rounded-xl text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                    placeholder="alexander"
                    required
                    className="w-full px-3 py-2 bg-wa-dark-bg dark:bg-wa-dark-bg bg-gray-50 border border-wa-dark-border dark:border-wa-dark-border rounded-xl text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-gray-400">
                      RoyalID
                    </label>
                    <button
                      type="button"
                      onClick={generateRandomRoyalId}
                      className="text-[10px] text-amber-400 hover:underline flex items-center gap-1"
                    >
                      <RefreshCw className="w-2.5 h-2.5" /> Random
                    </button>
                  </div>
                  <input
                    type="text"
                    value={royalId}
                    onChange={(e) => setRoyalId(e.target.value.toUpperCase())}
                    placeholder="ROYAL-9842"
                    className="w-full px-3 py-2 bg-wa-dark-bg dark:bg-wa-dark-bg bg-gray-50 border border-amber-500/40 rounded-xl text-xs font-mono font-bold text-amber-400 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Email (Optional)
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@royal.io"
                    className="w-full pl-10 pr-3 py-2 bg-wa-dark-bg dark:bg-wa-dark-bg bg-gray-50 border border-wa-dark-border dark:border-wa-dark-border rounded-xl text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-10 pr-3 py-2 bg-wa-dark-bg dark:bg-wa-dark-bg bg-gray-50 border border-wa-dark-border dark:border-wa-dark-border rounded-xl text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-2 bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] text-white font-semibold rounded-xl text-sm shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {loading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span>{isRegister ? 'Create Royal Account' : 'Enter LogsApp'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer CLI Info */}
        <div className="p-3 bg-wa-dark-bg/60 dark:bg-wa-dark-bg/60 border-t border-wa-dark-border/20 text-center">
          <p className="text-[11px] text-gray-400 flex items-center justify-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span>Accessible via Linux Terminal using <code className="text-emerald-400 font-mono font-bold">logsapp</code> CLI</span>
          </p>
        </div>
      </div>
    </div>
  );
};
