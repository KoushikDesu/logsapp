import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ size = 'md', showText = true }) => {
  const sizeMap = {
    sm: { box: 'w-7 h-7', icon: 'w-4 h-4', text: 'text-sm' },
    md: { box: 'w-10 h-10', icon: 'w-6 h-6', text: 'text-lg' },
    lg: { box: 'w-14 h-14', icon: 'w-8 h-8', text: 'text-2xl' },
    xl: { box: 'w-16 h-16', icon: 'w-10 h-10', text: 'text-3xl' },
  };

  const { box, text } = sizeMap[size];

  return (
    <div className="flex items-center gap-2.5">
      {/* 2-People Chatting / Connecting Logo */}
      <div className={`${box} relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 shadow-lg shadow-blue-500/25 p-1 shrink-0`}>
        <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
          {/* Person 1 (Primary - Left) */}
          <circle cx="11" cy="11" r="4" fill="white" />
          <path d="M4 23C4 19.6863 7.13401 17 11 17C14.866 17 18 19.6863 18 23" fill="white" fillOpacity="0.95" />
          
          {/* Person 2 (Accent - Right) */}
          <circle cx="21" cy="13" r="3.5" fill="#f59e0b" />
          <path d="M15 25C15 22.2386 17.6863 20 21 20C24.3137 20 27 22.2386 27 25" fill="#f59e0b" fillOpacity="0.95" />

          {/* Connection Dot / Chat Pulse */}
          <circle cx="16" cy="7" r="1.5" fill="#60a5fa" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className={`font-heading font-bold tracking-tight bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-400 bg-clip-text text-transparent ${text}`}>
            RoyalChat
          </span>
          <span className="text-[10px] font-medium text-slate-400 tracking-wider uppercase -mt-0.5">
            LogsApp 2.0
          </span>
        </div>
      )}
    </div>
  );
};
