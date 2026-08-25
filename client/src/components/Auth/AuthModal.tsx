import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.js';
import { BrandLogo } from '../Common/BrandLogo.js';
import { User, Lock, ArrowRight, ShieldCheck, AlertCircle, RefreshCw, Terminal, Sparkles } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { login, register } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  
  // Login fields
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register fields (Exact fields requested)
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegister) {
        if (!displayName.trim()) {
          setError('Please enter your Display Name');
          setLoading(false);
          return;
        }
        if (!username.trim()) {
          setError('Please choose a Username');
          setLoading(false);
          return;
        }
        if (!password) {
          setError('Please enter a Password');
          setLoading(false);
          return;
        }
        if (password !== confirmPassword) {
          setError('Passwords do not match. Please re-enter your password.');
          setLoading(false);
          return;
        }
        if (password.length < 6) {
          setError('Password must be at least 6 characters long');
          setLoading(false);
          return;
        }

        // Clean username: remove leading @ if typed
        const cleanUsername = username.trim().toLowerCase().replace(/^@+/, '');

        await register({
          display_name: displayName.trim(),
          username: cleanUsername,
          password: password,
        });
      } else {
        if (!loginIdentifier || !loginPassword) {
          setError('Please enter your username / Royal ID and password');
          setLoading(false);
          return;
        }
        await login(loginIdentifier.trim(), loginPassword);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 overflow-y-auto">
      {/* Background Ambient Glow (SmartPrep Style) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md bg-slateDark-surface dark:bg-slateDark-surface bg-white text-slateDark-text dark:text-slateDark-text text-slate-900 rounded-3xl shadow-2xl border border-slateDark-border dark:border-slateDark-border overflow-hidden">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-slate-900 p-6 text-white text-center relative overflow-hidden">
          <div className="flex justify-center mb-3">
            <BrandLogo size="lg" showText={false} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight font-heading">
            RoyalChat <span className="text-amber-400 text-xs font-mono font-normal ml-1">v2.0</span>
          </h1>
          <p className="text-blue-100 text-xs mt-1 max-w-xs mx-auto">
            Real-Time Messenger • 1GB File Bridge • Linux Terminal Ready
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slateDark-border/60 dark:border-slateDark-border/60">
          <button
            type="button"
            onClick={() => { setIsRegister(false); setError(''); }}
            className={`flex-1 py-3 text-sm font-semibold text-center transition-all ${
              !isRegister
                ? 'text-blue-400 border-b-2 border-blue-500 bg-blue-500/10 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setIsRegister(true); setError(''); }}
            className={`flex-1 py-3 text-sm font-semibold text-center transition-all ${
              isRegister
                ? 'text-blue-400 border-b-2 border-blue-500 bg-blue-500/10 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {!isRegister ? (
            /* Login Form */
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Username or 7-Digit Royal ID
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder="e.g. @madarauchiha or 7482910"
                    required
                    className="w-full pl-10 pr-3 py-2.5 bg-slateDark-bg dark:bg-slateDark-bg bg-slate-50 border border-slateDark-border dark:border-slateDark-border rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-100 placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-10 pr-3 py-2.5 bg-slateDark-bg dark:bg-slateDark-bg bg-slate-50 border border-slateDark-border dark:border-slateDark-border rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-100 placeholder:text-slate-500"
                  />
                </div>
              </div>
            </>
          ) : (
            /* Register Form: Only the 4 requested fields */
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Display Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Madara Uchiha"
                    required
                    className="w-full pl-10 pr-3 py-2.5 bg-slateDark-bg dark:bg-slateDark-bg bg-slate-50 border border-slateDark-border dark:border-slateDark-border rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-100 placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Username
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-slate-400 font-bold text-sm">@</span>
                  <input
                    type="text"
                    value={username.replace(/^@+/, '')}
                    onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                    placeholder="madarauchiha"
                    required
                    className="w-full pl-8 pr-3 py-2.5 bg-slateDark-bg dark:bg-slateDark-bg bg-slate-50 border border-slateDark-border dark:border-slateDark-border rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-100 placeholder:text-slate-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-10 pr-3 py-2.5 bg-slateDark-bg dark:bg-slateDark-bg bg-slate-50 border border-slateDark-border dark:border-slateDark-border rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-100 placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Re-enter Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-10 pr-3 py-2.5 bg-slateDark-bg dark:bg-slateDark-bg bg-slate-50 border border-slateDark-border dark:border-slateDark-border rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-100 placeholder:text-slate-500"
                  />
                </div>
              </div>

              {/* Informative RoyalID badge note */}
              <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-[11px] text-amber-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>A unique <b>7-digit Royal ID</b> (e.g. <code>#7482910</code>) will be generated automatically for your account.</span>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-[0.99] text-white font-semibold rounded-xl text-sm shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {loading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span>{isRegister ? 'Complete Sign Up' : 'Sign In to RoyalChat'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer CLI Info */}
        <div className="p-3.5 bg-slateDark-bg/80 dark:bg-slateDark-bg/80 bg-slate-100 border-t border-slateDark-border/40 text-center">
          <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5 font-mono">
            <Terminal className="w-3.5 h-3.5 text-blue-400" />
            <span>Linux CLI: <code className="text-blue-400 font-bold">logsapp login</code></span>
          </p>
        </div>
      </div>
    </div>
  );
};
