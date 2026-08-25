import React, { useState } from 'react';
import { Terminal, Copy, Check, Download, ShieldCheck, Zap, HardDrive, Key, Globe } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.js';

interface CLIModalProps {
  onClose: () => void;
}

export const CLIModal: React.FC<CLIModalProps> = ({ onClose }) => {
  const { user } = useAuth();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [quickCodeInput, setQuickCodeInput] = useState('');

  const serverUrl = window.location.origin;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const installCommand = `curl -fsSL ${serverUrl}/api/cli/install.sh | bash`;
  const oneLinerDownload = (code: string) =>
    `curl -sL "${serverUrl}/api/files/quick/${code || 'LGS-XXXXXX'}?download=true" -o "downloaded_file"`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-2xl bg-wa-dark-panel dark:bg-wa-dark-panel bg-white text-wa-dark-text dark:text-wa-dark-text text-gray-900 rounded-2xl shadow-2xl border border-wa-dark-border dark:border-wa-dark-border overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-black p-5 text-white flex items-center justify-between border-b border-wa-dark-border/40">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
              <Terminal className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg flex items-center gap-2">
                Linux CLI Companion Tool
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-mono font-normal">
                  Zero-Config
                </span>
              </h3>
              <p className="text-xs text-gray-400">
                Access files, images & chat history on headless Linux distros without browsers.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-lg transition-colors text-sm font-semibold"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[78vh] overflow-y-auto">
          {/* Fast 1-Step Linux Install */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" /> 1-Step Linux Install (Ubuntu, Debian, Arch, CentOS, Alpine)
              </label>
            </div>
            <div className="flex items-center justify-between bg-black/90 text-emerald-400 p-3 rounded-xl font-mono text-xs border border-wa-dark-border/50">
              <span className="truncate pr-2 select-all">{installCommand}</span>
              <button
                onClick={() => copyToClipboard(installCommand, 'install')}
                className="p-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all shrink-0 flex items-center gap-1 text-[11px]"
              >
                {copiedKey === 'install' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedKey === 'install' ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>

          {/* QuickCode Direct Wget/Curl (No CLI required!) */}
          <div className="p-4 bg-emerald-950/30 border border-emerald-500/30 rounded-xl space-y-3">
            <h4 className="text-sm font-semibold text-emerald-300 flex items-center gap-2">
              <Download className="w-4 h-4" /> Instant Terminal File Fetch via QuickCode
            </h4>
            <p className="text-xs text-gray-300">
              Every file sent in chat has a 6-digit <b className="text-amber-300">QuickCode</b>. Run this command on any terminal to download it immediately:
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={quickCodeInput}
                onChange={(e) => setQuickCodeInput(e.target.value.toUpperCase())}
                placeholder="Enter QuickCode (e.g. LGS-9831)"
                className="w-48 px-3 py-1.5 bg-black/60 border border-emerald-500/40 rounded-lg text-xs font-mono text-amber-300 placeholder:text-gray-500 uppercase"
              />
              <div className="flex-1 flex items-center justify-between bg-black/60 px-3 py-1.5 rounded-lg border border-wa-dark-border font-mono text-xs text-gray-300 overflow-hidden">
                <span className="truncate">{oneLinerDownload(quickCodeInput)}</span>
                <button
                  onClick={() => copyToClipboard(oneLinerDownload(quickCodeInput), 'quick')}
                  className="p-1 text-emerald-400 hover:text-emerald-300 ml-2"
                  title="Copy curl command"
                >
                  {copiedKey === 'quick' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {/* CLI Commands Cheatsheet */}
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-blue-400" /> CLI Terminal Commands Reference
            </h4>
            <div className="space-y-2 font-mono text-xs">
              <div className="p-2.5 bg-wa-dark-bg/60 dark:bg-wa-dark-bg/60 bg-gray-50 border border-wa-dark-border/40 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-emerald-400 font-bold">logsapp login</span>
                  <p className="text-[11px] text-gray-400 font-sans mt-0.5">Login with your Username or RoyalID (<code className="text-amber-400">{user?.royal_id}</code>)</p>
                </div>
                <button onClick={() => copyToClipboard('logsapp login', 'cmd1')} className="text-gray-400 hover:text-white p-1">
                  {copiedKey === 'cmd1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="p-2.5 bg-wa-dark-bg/60 dark:bg-wa-dark-bg/60 bg-gray-50 border border-wa-dark-border/40 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-emerald-400 font-bold">logsapp chats</span>
                  <p className="text-[11px] text-gray-400 font-sans mt-0.5">List active 1-on-1 and Group chats with unread messages</p>
                </div>
                <button onClick={() => copyToClipboard('logsapp chats', 'cmd2')} className="text-gray-400 hover:text-white p-1">
                  {copiedKey === 'cmd2' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="p-2.5 bg-wa-dark-bg/60 dark:bg-wa-dark-bg/60 bg-gray-50 border border-wa-dark-border/40 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-emerald-400 font-bold">logsapp upload &lt;chat_id_or_@username&gt; &lt;file_path&gt;</span>
                  <p className="text-[11px] text-gray-400 font-sans mt-0.5">Upload and send any file up to 1GB directly from Linux terminal</p>
                </div>
                <button onClick={() => copyToClipboard('logsapp upload @friend file.zip', 'cmd3')} className="text-gray-400 hover:text-white p-1">
                  {copiedKey === 'cmd3' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="p-2.5 bg-wa-dark-bg/60 dark:bg-wa-dark-bg/60 bg-gray-50 border border-wa-dark-border/40 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-emerald-400 font-bold">logsapp get &lt;QUICK_CODE&gt;</span>
                  <p className="text-[11px] text-gray-400 font-sans mt-0.5">Download files with real-time CLI download progress bar</p>
                </div>
                <button onClick={() => copyToClipboard('logsapp get LGS-XXXXXX', 'cmd4')} className="text-gray-400 hover:text-white p-1">
                  {copiedKey === 'cmd4' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-wa-dark-bg/80 dark:bg-wa-dark-bg/80 bg-gray-50 border-t border-wa-dark-border/40 flex items-center justify-between text-xs text-gray-400">
          <span>Server Endpoint: <code className="text-emerald-400">{serverUrl}</code></span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-semibold transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
