import React, { useState } from 'react';
import { Terminal, Copy, Check, Download, Zap, HardDrive, Key, Globe, FolderDown, FolderUp, FileText, School } from 'lucide-react';
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
  const pythonOneLiner = (code: string) =>
    `python3 -c "import urllib.request; urllib.request.urlretrieve('${serverUrl}/api/files/quick/${code || 'LGS-XXXXXX'}?download=true', 'file.zip')"`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 overflow-y-auto">
      <div className="w-full max-w-2xl bg-slateDark-surface dark:bg-slateDark-surface bg-white text-slateDark-text dark:text-slateDark-text text-slate-900 rounded-3xl shadow-2xl border border-slateDark-border dark:border-slateDark-border overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-950 p-6 text-white flex items-center justify-between border-b border-slateDark-border/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-500/20 text-blue-400 rounded-2xl border border-blue-500/30">
              <Terminal className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg flex items-center gap-2 font-heading">
                Linux CLI & College Lab Companion
                <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full font-mono font-normal">
                  No Sudo Needed
                </span>
              </h3>
              <p className="text-xs text-slate-300">
                Access files, code, & chats on College Linux PCs and servers without browsers.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-xl transition-colors text-sm font-semibold"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* 1-Step Install (Works in College Labs with No-Sudo User Accounts) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5 font-heading">
                <Zap className="w-3.5 h-3.5" /> 1-Step Install (No Root/Sudo Required)
              </label>
              <span className="text-[10px] text-amber-400 font-mono">College User Accounts Supported</span>
            </div>
            <div className="flex items-center justify-between bg-slate-950 text-blue-300 p-3 rounded-2xl font-mono text-xs border border-slateDark-border">
              <span className="truncate pr-2 select-all">{installCommand}</span>
              <button
                onClick={() => copyToClipboard(installCommand, 'install')}
                className="p-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all shrink-0 flex items-center gap-1 text-[11px]"
              >
                {copiedKey === 'install' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedKey === 'install' ? 'Copied' : 'Copy'}
              </button>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Installs to <code className="text-blue-400">~/.local/bin/logsapp</code> if you don't have root permissions.
            </p>
          </div>

          {/* College Lab Data Import & Sync Tools */}
          <div className="p-4 bg-gradient-to-br from-blue-950/40 to-indigo-950/30 border border-blue-500/30 rounded-2xl space-y-3">
            <h4 className="text-sm font-semibold text-blue-300 flex items-center gap-2 font-heading">
              <School className="w-4 h-4 text-amber-400" /> College Lab & Data Import Tools
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              {/* Import / Pull */}
              <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl space-y-1">
                <span className="text-blue-400 font-bold font-mono">logsapp pull @friend</span>
                <p className="text-[11px] text-slate-400">
                  Downloads <b>all files & code</b> from the chat straight into your lab directory!
                </p>
              </div>

              {/* Push Folder */}
              <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl space-y-1">
                <span className="text-blue-400 font-bold font-mono">logsapp push-dir ./lab_code @friend</span>
                <p className="text-[11px] text-slate-400">
                  Zips your assignment folder and uploads up to <b>1GB</b> to chat!
                </p>
              </div>

              {/* Export Logs */}
              <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl space-y-1">
                <span className="text-blue-400 font-bold font-mono">logsapp export @friend notes.txt</span>
                <p className="text-[11px] text-slate-400">
                  Dumps all chat messages, code snippets, and instructions to a text file.
                </p>
              </div>

              {/* QuickCode Download */}
              <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl space-y-1">
                <span className="text-blue-400 font-bold font-mono">logsapp get LGS-XXXXXX</span>
                <p className="text-[11px] text-slate-400">
                  Downloads single file with real-time terminal progress bar.
                </p>
              </div>
            </div>
          </div>

          {/* Instant Terminal Fetch without installation */}
          <div className="p-4 bg-slateDark-bg/80 dark:bg-slateDark-bg/80 bg-slate-50 border border-slateDark-border/60 rounded-2xl space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5 text-amber-400" /> Instant Zero-Install Fetch (via curl / python)
            </h4>
            <p className="text-xs text-slate-400">
              Enter any 6-digit <b className="text-amber-400">QuickCode</b> from chat to generate a 1-line copy command:
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={quickCodeInput}
                onChange={(e) => setQuickCodeInput(e.target.value.toUpperCase())}
                placeholder="LGS-XXXXXX"
                className="w-36 px-3 py-2 bg-slate-950 border border-blue-500/40 rounded-xl text-xs font-mono text-amber-300 placeholder:text-slate-600 uppercase"
              />
              <div className="flex-1 flex items-center justify-between bg-slate-950 px-3 py-2 rounded-xl border border-slateDark-border font-mono text-xs text-slate-300 overflow-hidden">
                <span className="truncate">{oneLinerDownload(quickCodeInput)}</span>
                <button
                  onClick={() => copyToClipboard(oneLinerDownload(quickCodeInput), 'quick')}
                  className="p-1 text-blue-400 hover:text-blue-300 ml-2"
                  title="Copy curl command"
                >
                  {copiedKey === 'quick' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slateDark-bg dark:bg-slateDark-bg bg-slate-100 border-t border-slateDark-border/40 flex items-center justify-between text-xs text-slate-400">
          <span>Server Endpoint: <code className="text-blue-400 font-mono">{serverUrl}</code></span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-semibold shadow-md transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
