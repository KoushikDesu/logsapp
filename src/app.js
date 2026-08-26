// ============================================================
// LogsApp 2.0 — Enterprise Web Messenger & 1GB Bridge
// Features: Two-Way WebRTC Voice Calls, Ringtone Chime,
// Draggable Call Widget, Message Yourself (You), Admin Shield,
// Reports & Blocks, Public/Private Groups, Custom Nicknames
// ============================================================

// Brand Logo SVG
export const LOGO_SVG = `
<div class="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 shadow-lg shadow-blue-500/25 p-1.5 shrink-0 border border-white/10">
  <svg viewBox="0 0 32 32" fill="none" class="w-full h-full">
    <circle cx="11" cy="11" r="4" fill="white" />
    <path d="M4 23C4 19.6863 7.13401 17 11 17C14.866 17 18 19.6863 18 23" fill="white" fill-opacity="0.95" />
    <circle cx="21" cy="13" r="3.5" fill="#f59e0b" />
    <path d="M15 25C15 22.2386 17.6863 20 21 20C24.3137 20 27 22.2386 27 25" fill="#f59e0b" fill-opacity="0.95" />
  </svg>
</div>`;

// Curated Anime Avatars
export const ANIME_AVATARS = [
  { name: 'Sung Jin-Woo (Shadow Monarch)', anime: 'Solo Leveling', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=SungJinwoo&hair=short04&hairColor=0e1111&eyes=variant08&glasses=variant02' },
  { name: 'Cha Hae-In (Sword Dancer)', anime: 'Solo Leveling', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=ChaHaeIn&hair=long01&hairColor=ffd700&eyes=variant04' },
  { name: 'Igris Commander', anime: 'Solo Leveling', url: 'https://api.dicebear.com/7.x/bottts/svg?seed=IgrisBlood&colors=red,crimson' },
  { name: 'Beru (Ant King)', anime: 'Solo Leveling', url: 'https://api.dicebear.com/7.x/bottts/svg?seed=BeruShadow&colors=indigo,purple' },
  { name: 'Madara Uchiha (Eternal Mangekyo)', anime: 'Naruto', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=MadaraUchiha&hair=long04&hairColor=0e1111&eyes=variant09' },
  { name: 'Itachi Uchiha (Crow Genjutsu)', anime: 'Naruto', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=ItachiUchiha&hair=long02&hairColor=1a1a1a&eyes=variant02' },
  { name: 'Sasuke Uchiha (Rinnegan)', anime: 'Naruto', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=SasukeUchiha&hair=short03&hairColor=111111&eyes=variant06' },
  { name: 'Naruto Uzumaki (Sage Mode)', anime: 'Naruto', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=NarutoUzumaki&hair=short01&hairColor=ffd700&eyes=variant03' },
  { name: 'Kakashi Hatake (Copy Ninja)', anime: 'Naruto', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=KakashiHatake&hair=short02&hairColor=cccccc' },
  { name: 'Minato Namikaze (Yellow Flash)', anime: 'Naruto', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=MinatoNamikaze&hair=short05&hairColor=ffd700&eyes=variant01' },
  { name: 'Gojo Satoru (Six Eyes)', anime: 'Jujutsu Kaisen', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=GojoSatoru&hair=short02&hairColor=ffffff&glasses=variant05' },
  { name: 'Ryomen Sukuna (King of Curses)', anime: 'Jujutsu Kaisen', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=RyomenSukuna&hair=short01&hairColor=ff69b4&eyes=variant12' },
  { name: 'Megumi Fushiguro (Shadows)', anime: 'Jujutsu Kaisen', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=MegumiFushiguro&hair=short06&hairColor=000033' },
  { name: 'Yuta Okkotsu (Special Grade)', anime: 'Jujutsu Kaisen', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=YutaOkkotsu&hair=short04&hairColor=111111' },
  { name: 'Ichigo Kurosaki (Bankai)', anime: 'Bleach', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=IchigoKurosaki&hair=short01&hairColor=ff8c00&eyes=variant05' },
  { name: 'Sosuke Aizen (Kyoka Suigetsu)', anime: 'Bleach', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=SosukeAizen&hair=short02&hairColor=4a2e18' },
  { name: 'Kenpachi Zaraki (Squad 11)', anime: 'Bleach', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=KenpachiZaraki&hair=short08&hairColor=0e1111&eyes=variant14' },
  { name: 'Roronoa Zoro (King of Hell)', anime: 'One Piece', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=RoronoaZoro&hair=short03&hairColor=00aa44&eyes=variant07' },
  { name: 'Monkey D. Luffy (Gear 5)', anime: 'One Piece', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=LuffyGear5&hair=short05&hairColor=ffffff&eyes=variant04' },
  { name: 'Levi Ackerman (Humanity\'s Strongest)', anime: 'Attack on Titan', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=LeviAckerman&hair=short01&hairColor=111111&eyes=variant02' },
  { name: 'Eren Yeager (Attack Titan)', anime: 'Attack on Titan', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=ErenYeager&hair=long03&hairColor=2d1a0e&eyes=variant10' },
  { name: 'Tanjiro Kamado (Sun Breathing)', anime: 'Demon Slayer', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=TanjiroKamado&hair=short04&hairColor=8b0000&eyes=variant06' },
  { name: 'Giyu Tomioka (Water Hashira)', anime: 'Demon Slayer', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=GiyuTomioka&hair=long02&hairColor=000033&eyes=variant02' }
];

export function getDeterministicAnimeAvatar(seed = '') {
  if (!seed) return ANIME_AVATARS[0];
  let hash = 0;
  const str = String(seed);
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % ANIME_AVATARS.length;
  return ANIME_AVATARS[index];
}

export function getUserAvatar(user) {
  if (!user) return ANIME_AVATARS[0].url;
  if (user.avatar_url && user.avatar_url.startsWith('http')) {
    return user.avatar_url;
  }
  return getDeterministicAnimeAvatar(user.royal_id || user.username || 'user').url;
}

// API Helper
const API = {
  getBaseUrl() {
    const custom = localStorage.getItem('logsapp_server_url');
    if (custom) return custom.replace(/\/+$/, '') + '/api';

    if (typeof window !== 'undefined' && (window.location.hostname.includes('github.io') || window.location.hostname.includes('vercel.app'))) {
      return 'https://logsapp-2vqv.onrender.com/api';
    }

    if (typeof window !== 'undefined' && (window.location.port === '3000' || window.location.port === '5173')) {
      return 'http://localhost:5000/api';
    }

    return 'https://logsapp-2vqv.onrender.com/api';
  },
  getServerHost() {
    const base = this.getBaseUrl();
    return base.replace(/\/api$/, '');
  },
  async request(endpoint, options = {}) {
    const token = localStorage.getItem('logsapp_token');
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...(options.headers || {})
    };
    if (options.body instanceof FormData) {
      delete headers['Content-Type'];
    }
    const url = `${this.getBaseUrl()}${endpoint}`;
    try {
      const res = await fetch(url, { ...options, headers });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || `Server error (${res.status})`);
      }
      return data;
    } catch (err) {
      if (err.name === 'TypeError' || err.message.includes('Failed to fetch')) {
        throw new Error('Connecting to backend server... Please ensure your internet connection is active.');
      }
      throw err;
    }
  }
};

// Global App State
const state = {
  user: JSON.parse(localStorage.getItem('logsapp_user') || 'null'),
  token: localStorage.getItem('logsapp_token') || null,
  isDark: localStorage.getItem('logsapp_theme') !== 'light',
  chats: [],
  activeChatId: localStorage.getItem('logsapp_active_chat_id') || null,
  activeMessages: [],
  mobileView: 'sidebar',
  searchTab: 'users', // 'users' | 'groups'
  searchQuery: '',
  searchResults: [],
  groupSearchResults: [],
  aliases: {}, // Map of contactId -> custom alias name
  blockedUserIds: new Set(),
  
  // Modals & Drawers
  showProfile: false,
  showGroupModal: false,
  showStorageModal: false,
  showCLIModal: false,
  showServerConfig: false,
  showAvatarGrid: false,
  showAdminModal: false,
  adminTab: 'overview',
  adminStats: null,
  adminReports: [],
  adminUsers: [],
  
  // Feature Modals
  showReportModal: null,
  showAliasModal: null,
  showForwardModal: null,
  showChatMenu: false,
  lightboxMedia: null,

  // WebRTC Audio Call Engine State
  activeCall: null,
  peerConnection: null,
  localStream: null,
  isMuted: false,
  callDuration: 0,
  callTimerInterval: null,
  callPollInterval: null
};

// Force Direct File Download Function
export function downloadFileDirect(downloadUrl, filename) {
  const finalUrl = `${downloadUrl}${downloadUrl.includes('?') ? '&' : '?'}download=true`;
  const a = document.createElement('a');
  a.href = finalUrl;
  a.download = filename || 'download';
  a.target = '_blank';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  showToast(`Downloading ${filename}...`, 'info');
}

// Get contact display name taking user's custom alias into account
export function getContactDisplayName(contact, isSelf = false) {
  if (isSelf) {
    return `${state.user?.display_name || 'You'} (You)`;
  }
  if (!contact) return 'Unknown User';
  if (state.aliases[contact.id]) {
    return `${state.aliases[contact.id]} (${contact.display_name})`;
  }
  return contact.display_name || contact.username || 'Direct Contact';
}

// Toast Notifications
function showToast(msg, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  const colors = {
    info: 'bg-slate-900/95 border-blue-500/50 text-blue-300 backdrop-blur-md',
    success: 'bg-slate-900/95 border-emerald-500/50 text-emerald-300 backdrop-blur-md',
    error: 'bg-slate-900/95 border-red-500/50 text-red-300 backdrop-blur-md'
  };
  toast.className = `p-3.5 px-4 rounded-2xl border text-xs font-semibold shadow-2xl flex items-center gap-2 pointer-events-auto transition-all transform translate-y-2 opacity-0 ${colors[type] || colors.info}`;
  toast.innerHTML = `<span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.classList.remove('translate-y-2', 'opacity-0'), 10);
  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ============================================================
// WEBAUDIO RINGTONE CHIME SYNTHESIZER
// ============================================================
let ringtoneInterval = null;
let ringtoneAudioCtx = null;

function playRingtoneSound() {
  stopRingtoneSound();
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    ringtoneAudioCtx = new AudioCtx();

    function triggerChime() {
      if (!ringtoneAudioCtx || ringtoneAudioCtx.state === 'closed') return;
      if (ringtoneAudioCtx.state === 'suspended') ringtoneAudioCtx.resume();

      const now = ringtoneAudioCtx.currentTime;
      const osc1 = ringtoneAudioCtx.createOscillator();
      const osc2 = ringtoneAudioCtx.createOscillator();
      const gain = ringtoneAudioCtx.createGain();

      osc1.type = 'sine';
      osc2.type = 'sine';
      osc1.frequency.setValueAtTime(480, now);
      osc2.frequency.setValueAtTime(440, now);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ringtoneAudioCtx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 1.4);
      osc2.stop(now + 1.4);
    }

    triggerChime();
    ringtoneInterval = setInterval(triggerChime, 2600);
  } catch (e) {}
}

function stopRingtoneSound() {
  clearInterval(ringtoneInterval);
  ringtoneInterval = null;
  if (ringtoneAudioCtx) {
    try { ringtoneAudioCtx.close(); } catch (e) {}
    ringtoneAudioCtx = null;
  }
}

// Master Render (Renders #app without flickering call timers)
function render() {
  const root = document.getElementById('app');
  if (!root) return;

  if (state.isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  if (!state.user || !state.token) {
    root.innerHTML = renderAuthScreen();
    bindAuthEvents();
    renderCallOverlay();
    return;
  }

  root.innerHTML = `
    <div class="h-[100dvh] w-screen flex overflow-hidden ${state.isDark ? 'bg-ambient-dark text-slate-100' : 'bg-ambient-light text-slate-900'}">
      <!-- Sidebar -->
      <div class="h-[100dvh] ${state.mobileView === 'sidebar' ? 'w-full md:w-[380px] lg:w-[410px] flex' : 'hidden md:flex'} border-r ${state.isDark ? 'border-white/10 bg-slate-950/40 backdrop-blur-xl' : 'border-slate-200/90 bg-white/85 backdrop-blur-xl'} shrink-0 flex-col z-20">
        ${renderSidebarHeader()}
        ${renderSearchBar()}
        ${renderChatList()}
      </div>

      <!-- Main Chat Area -->
      <div class="h-[100dvh] flex-1 ${state.mobileView === 'chat' ? 'w-full flex flex-col' : 'hidden md:flex flex-col'}">
        ${renderChatArea()}
      </div>
    </div>

    <!-- Modals -->
    ${state.showProfile ? renderProfileModal() : ''}
    ${state.showGroupModal ? renderGroupModal() : ''}
    ${state.showStorageModal ? renderStorageModal() : ''}
    ${state.showCLIModal ? renderCLIModal() : ''}
    ${state.showAdminModal ? renderAdminModal() : ''}
    ${state.showReportModal ? renderReportModal() : ''}
    ${state.showAliasModal ? renderAliasModal() : ''}
    ${state.showForwardModal ? renderForwardModal() : ''}
    ${state.lightboxMedia ? renderLightbox() : ''}
  `;

  bindMainEvents();
  renderCallOverlay();
}

// ============================================================
// AUTH SCREEN
// ============================================================
let isSignUpTab = false;

function renderAuthScreen() {
  const currentServer = API.getBaseUrl().replace(/\/api$/, '');
  return `
  <div class="h-[100dvh] w-screen flex items-center justify-center ${state.isDark ? 'bg-ambient-dark text-slate-100' : 'bg-ambient-light text-slate-900'} p-4 relative overflow-hidden">
    <div class="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>

    <div class="relative w-full max-w-md ${state.isDark ? 'glass-card-dark' : 'glass-card-light'} rounded-3xl overflow-hidden modal-enter max-h-[95dvh] overflow-y-auto border">
      <!-- Header Banner -->
      <div class="bg-gradient-to-r from-blue-700/90 via-blue-600/90 to-indigo-700/90 p-6 text-white text-center border-b border-white/10 backdrop-blur-md">
        <div class="flex justify-center mb-3">
          ${LOGO_SVG}
        </div>
        <h1 class="text-2xl font-bold font-heading tracking-tight drop-shadow-md">LogsApp 2.0</h1>
        <p class="text-blue-100 text-xs mt-0.5 font-medium">Web Chat • 1GB File Bridge • Audio Calls • Admin Shield</p>
      </div>

      <!-- Tab Switcher -->
      <div class="flex border-b ${state.isDark ? 'border-white/10 bg-slate-950/40' : 'border-slate-200 bg-slate-50/60'} text-sm font-semibold">
        <button id="tab-signin" class="flex-1 py-3 text-center transition-all ${!isSignUpTab ? 'text-blue-500 border-b-2 border-blue-500 bg-blue-500/10 font-bold' : (state.isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-800')}">
          Sign In
        </button>
        <button id="tab-signup" class="flex-1 py-3 text-center transition-all ${isSignUpTab ? 'text-blue-500 border-b-2 border-blue-500 bg-blue-500/10 font-bold' : (state.isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-800')}">
          Sign Up
        </button>
      </div>

      <!-- Form -->
      <form id="auth-form" class="p-6 space-y-4">
        <div id="auth-error" class="hidden p-3.5 bg-red-500/15 border border-red-500/30 rounded-2xl text-red-400 text-xs flex items-start gap-2 backdrop-blur-md"></div>

        ${!isSignUpTab ? `
          <div>
            <label class="block text-xs font-semibold ${state.isDark ? 'text-slate-300' : 'text-slate-600'} mb-1">Username or 7-Digit Royal ID</label>
            <input type="text" id="login-identifier" placeholder="e.g. @madarauchiha or 8471027" required class="w-full px-4 py-2.5 ${state.isDark ? 'bg-slate-950/60 border-white/10 text-slate-100 placeholder:text-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'} border rounded-2xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-mono transition-all" />
          </div>
          <div>
            <label class="block text-xs font-semibold ${state.isDark ? 'text-slate-300' : 'text-slate-600'} mb-1">Password</label>
            <input type="password" id="login-password" placeholder="••••••••" required class="w-full px-4 py-2.5 ${state.isDark ? 'bg-slate-950/60 border-white/10 text-slate-100 placeholder:text-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'} border rounded-2xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" />
          </div>
        ` : `
          <div>
            <label class="block text-xs font-semibold ${state.isDark ? 'text-slate-300' : 'text-slate-600'} mb-1">Display Name</label>
            <input type="text" id="reg-name" placeholder="Madara Uchiha" required class="w-full px-4 py-2.5 ${state.isDark ? 'bg-slate-950/60 border-white/10 text-slate-100 placeholder:text-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'} border rounded-2xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" />
          </div>
          <div>
            <label class="block text-xs font-semibold ${state.isDark ? 'text-slate-300' : 'text-slate-600'} mb-1">Username</label>
            <div class="relative flex items-center">
              <span class="absolute left-3.5 ${state.isDark ? 'text-slate-400' : 'text-slate-500'} font-bold text-sm">@</span>
              <input type="text" id="reg-username" placeholder="madarauchiha" required class="w-full pl-8 pr-4 py-2.5 ${state.isDark ? 'bg-slate-950/60 border-white/10 text-slate-100 placeholder:text-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'} border rounded-2xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-mono transition-all" />
            </div>
          </div>
          <div>
            <label class="block text-xs font-semibold ${state.isDark ? 'text-slate-300' : 'text-slate-600'} mb-1">Password</label>
            <input type="password" id="reg-password" placeholder="••••••••" required class="w-full px-4 py-2.5 ${state.isDark ? 'bg-slate-950/60 border-white/10 text-slate-100 placeholder:text-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'} border rounded-2xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" />
          </div>
          <div>
            <label class="block text-xs font-semibold ${state.isDark ? 'text-slate-300' : 'text-slate-600'} mb-1">Re-enter Password</label>
            <input type="password" id="reg-confirm" placeholder="••••••••" required class="w-full px-4 py-2.5 ${state.isDark ? 'bg-slate-950/60 border-white/10 text-slate-100 placeholder:text-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'} border rounded-2xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" />
          </div>
          <div class="p-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-[11px] text-amber-500 font-medium">
            ✨ Auto-assigns a persistent <b>7-digit Royal ID</b> & anime avatar.
          </div>
        `}

        <button type="submit" id="auth-submit-btn" class="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-2xl text-sm shadow-lg shadow-blue-500/25 border border-white/10 transition-all">
          ${!isSignUpTab ? 'Sign In to LogsApp' : 'Complete Sign Up'}
        </button>
      </form>

      <!-- Server Config Drawer -->
      <div class="px-6 py-2.5 ${state.isDark ? 'bg-slate-950/60 border-white/10' : 'bg-slate-50 border-slate-200'} border-t text-center">
        <button id="btn-toggle-server-config" class="text-[11px] ${state.isDark ? 'text-slate-400 hover:text-blue-400' : 'text-slate-500 hover:text-blue-600'} inline-flex items-center gap-1 transition-colors">
          <span class="mdi mdi-server-network"></span>
          <span>Backend Server Settings</span>
        </button>

        ${state.showServerConfig ? `
          <div class="mt-2 text-left p-3.5 ${state.isDark ? 'bg-slate-900/80 border-white/10' : 'bg-white border-slate-200 shadow-sm'} rounded-2xl border space-y-2 backdrop-blur-md">
            <label class="block text-[11px] ${state.isDark ? 'text-slate-300' : 'text-slate-600'} font-semibold">Custom Backend URL (Render / VPS)</label>
            <div class="flex gap-1.5">
              <input type="text" id="server-url-input" value="${localStorage.getItem('logsapp_server_url') || ''}" placeholder="https://logsapp-2vqv.onrender.com" class="flex-1 px-3 py-1.5 ${state.isDark ? 'bg-slate-950 border-slate-700 text-blue-300' : 'bg-slate-50 border-slate-200 text-blue-600'} border rounded-xl text-xs font-mono placeholder:text-slate-400 focus:outline-none focus:border-blue-500" />
              <button id="btn-save-server-url" class="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow">Save</button>
            </div>
            <p class="text-[10px] ${state.isDark ? 'text-slate-400' : 'text-slate-500'}">Connected: <code class="text-blue-500">${currentServer}</code></p>
          </div>
        ` : ''}
      </div>

      <div class="p-3 ${state.isDark ? 'bg-slate-950/80 border-white/5 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-500'} border-t text-center font-mono text-[11px]">
        Linux CLI: <code class="text-blue-500 font-bold">logsapp login</code>
      </div>
    </div>
  </div>`;
}

function bindAuthEvents() {
  document.getElementById('tab-signin')?.addEventListener('click', () => { isSignUpTab = false; render(); });
  document.getElementById('tab-signup')?.addEventListener('click', () => { isSignUpTab = true; render(); });

  document.getElementById('btn-toggle-server-config')?.addEventListener('click', () => {
    state.showServerConfig = !state.showServerConfig;
    render();
  });

  document.getElementById('btn-save-server-url')?.addEventListener('click', () => {
    const input = document.getElementById('server-url-input');
    if (input) {
      const val = input.value.trim();
      if (val) {
        localStorage.setItem('logsapp_server_url', val.replace(/\/+$/, ''));
      } else {
        localStorage.removeItem('logsapp_server_url');
      }
      showToast('Backend Server URL updated!', 'success');
      render();
    }
  });

  const form = document.getElementById('auth-form');
  const errorDiv = document.getElementById('auth-error');
  const submitBtn = document.getElementById('auth-submit-btn');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorDiv.classList.add('hidden');
    submitBtn.disabled = true;
    submitBtn.innerText = 'Processing...';

    try {
      if (isSignUpTab) {
        const displayName = document.getElementById('reg-name').value.trim();
        const username = document.getElementById('reg-username').value.trim().replace(/^[@#]+/, '').toLowerCase();
        const password = document.getElementById('reg-password').value;
        const confirm = document.getElementById('reg-confirm').value;

        if (password !== confirm) throw new Error('Passwords do not match.');
        if (password.length < 6) throw new Error('Password must be at least 6 characters.');

        const initialAvatar = getDeterministicAnimeAvatar(username).url;

        const data = await API.request('/auth/register', {
          method: 'POST',
          body: JSON.stringify({ display_name: displayName, username, password, avatar_url: initialAvatar })
        });

        state.user = data.user;
        state.token = data.token;
        localStorage.setItem('logsapp_user', JSON.stringify(data.user));
        localStorage.setItem('logsapp_token', data.token);
        showToast(`Welcome ${data.user.display_name}! Royal ID: #${data.user.royal_id}`, 'success');
      } else {
        const identifier = document.getElementById('login-identifier').value.trim();
        const password = document.getElementById('login-password').value;

        const data = await API.request('/auth/login', {
          method: 'POST',
          body: JSON.stringify({ identifier, password })
        });

        state.user = data.user;
        state.token = data.token;
        localStorage.setItem('logsapp_user', JSON.stringify(data.user));
        localStorage.setItem('logsapp_token', data.token);
        showToast(`Welcome back, ${data.user.display_name}!`, 'success');
      }

      await loadInitialData();
      render();
    } catch (err) {
      errorDiv.innerText = err.message || 'Authentication failed.';
      errorDiv.classList.remove('hidden');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerText = !isSignUpTab ? 'Sign In to LogsApp' : 'Complete Sign Up';
    }
  });
}

// ============================================================
// SIDEBAR & CHAT LIST (With Pinned "Message Yourself (You)")
// ============================================================
function renderSidebarHeader() {
  const avatar = getUserAvatar(state.user);
  const isAdmin = state.user?.role === 'admin' || state.user?.username === 'logsappkt' || state.user?.username === 'admin';

  return `
  <div class="h-16 px-4 flex items-center justify-between border-b ${state.isDark ? 'glass-nav-dark' : 'glass-nav-light'} shrink-0">
    <!-- Clickable User Profile -->
    <button id="btn-open-profile" class="flex items-center gap-3 p-1.5 rounded-2xl hover:bg-white/10 text-left transition-all group">
      <div class="relative shrink-0">
        <img src="${avatar}" class="w-10 h-10 rounded-2xl object-cover bg-slate-900 ring-2 ring-blue-500/50 shadow-md group-hover:ring-blue-400 transition-all" />
        <span class="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 ${state.isDark ? 'border-slate-950' : 'border-white'} rounded-full shadow"></span>
      </div>
      <div class="min-w-0">
        <h4 class="font-semibold text-sm truncate group-hover:text-blue-500 transition-colors ${state.isDark ? 'text-slate-100' : 'text-slate-900'}">${state.user?.display_name}</h4>
        <span class="inline-flex items-center text-[10px] font-mono font-bold text-amber-500 bg-amber-500/10 px-1.5 py-0.2 rounded-md border border-amber-500/25">
          #${state.user?.royal_id}
        </span>
      </div>
    </button>

    <!-- Header Actions -->
    <div class="flex items-center gap-1 ${state.isDark ? 'text-slate-400' : 'text-slate-500'}">
      ${isAdmin ? `
        <button id="btn-open-admin" class="p-2 hover:bg-white/10 rounded-2xl text-purple-400 hover:text-purple-300 transition-all" title="Admin Shield & Moderation"><span class="mdi mdi-shield-crown text-lg"></span></button>
      ` : ''}
      <button id="btn-toggle-notif" class="p-2 hover:bg-white/10 rounded-2xl ${typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted' ? 'text-emerald-400' : 'text-slate-400 hover:text-blue-500'} transition-all" title="${typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted' ? 'Notifications Active' : 'Enable Web Notifications'}">
        <span class="mdi ${typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted' ? 'mdi-bell-ring' : 'mdi-bell-outline'} text-lg"></span>
      </button>
      <button id="btn-open-cli" class="p-2 hover:bg-white/10 rounded-2xl text-blue-500 hover:text-blue-400 transition-all" title="Linux CLI Companion"><span class="mdi mdi-console text-lg"></span></button>
      <button id="btn-open-storage" class="p-2 hover:bg-white/10 rounded-2xl text-amber-500 hover:text-amber-400 transition-all" title="Storage Quota & 30-day Purge"><span class="mdi mdi-harddisk text-lg"></span></button>
      <button id="btn-open-group" class="p-2 hover:bg-white/10 rounded-2xl hover:text-blue-500 transition-all" title="New Group (Public/Private)"><span class="mdi mdi-account-multiple-plus text-lg"></span></button>
      <button id="btn-toggle-theme" class="p-2 hover:bg-white/10 rounded-2xl hover:text-amber-400 transition-all" title="Toggle Light/Dark Theme"><span class="mdi ${state.isDark ? 'mdi-weather-sunny text-amber-300' : 'mdi-weather-night text-indigo-600'} text-lg"></span></button>
    </div>
  </div>`;
}

function renderSearchBar() {
  return `
  <div class="p-3 relative bg-transparent shrink-0 space-y-2">
    <!-- Tabs: Contacts vs Public Groups -->
    <div class="flex p-1 ${state.isDark ? 'bg-slate-900/80 border-white/5' : 'bg-slate-200/80 border-slate-300/60'} rounded-2xl border text-xs font-semibold">
      <button id="tab-search-users" class="flex-1 py-1.5 rounded-xl transition-all ${state.searchTab === 'users' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}">
        <span class="mdi mdi-account-search mr-1"></span> Contacts
      </button>
      <button id="tab-search-groups" class="flex-1 py-1.5 rounded-xl transition-all ${state.searchTab === 'groups' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}">
        <span class="mdi mdi-earth mr-1"></span> Public Groups
      </button>
    </div>

    <!-- Search Input Bar -->
    <div class="relative flex items-center ${state.isDark ? 'bg-slate-900/60 border-white/10 text-slate-100' : 'bg-slate-100/90 border-slate-200 text-slate-900'} border rounded-2xl px-3.5 py-2.5 backdrop-blur-md transition-all shadow-inner focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">
      <span class="mdi mdi-magnify ${state.isDark ? 'text-slate-400' : 'text-slate-500'} mr-2 text-base"></span>
      <input type="text" id="search-input" value="${state.searchQuery}" placeholder="${state.searchTab === 'users' ? 'Search username or 7-digit Royal ID...' : 'Search public groups by name or Group ID...'}" class="w-full bg-transparent text-sm focus:outline-none placeholder:text-slate-400" />
      ${state.searchQuery ? `<button id="btn-clear-search" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"><span class="mdi mdi-close"></span></button>` : ''}
    </div>

    <!-- Search Results Dropdown -->
    ${state.searchQuery && state.searchTab === 'users' && state.searchResults.length > 0 ? `
      <div class="absolute top-full left-3 right-3 z-30 mt-1 max-h-72 overflow-y-auto ${state.isDark ? 'glass-card-dark border-white/10 divide-white/5' : 'glass-card-light border-slate-200 divide-slate-100'} rounded-2xl shadow-2xl divide-y border">
        ${state.searchResults.map(u => `
          <div class="search-user-item flex items-center gap-3 p-3 hover:bg-blue-500/10 cursor-pointer transition-colors" data-user-id="${u.id}">
            <img src="${getUserAvatar(u)}" class="w-10 h-10 rounded-2xl bg-slate-900 ring-1 ring-blue-500/30 object-cover" />
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between">
                <h5 class="text-sm font-semibold truncate ${state.isDark ? 'text-slate-100' : 'text-slate-900'}">${getContactDisplayName(u)}</h5>
                <span class="text-[10px] font-mono font-bold text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">#${u.royal_id}</span>
              </div>
              <p class="text-xs ${state.isDark ? 'text-slate-400' : 'text-slate-500'} font-mono">@${u.username}</p>
            </div>
            <span class="mdi mdi-message-plus text-blue-500 text-lg"></span>
          </div>
        `).join('')}
      </div>
    ` : ''}

    ${state.searchTab === 'groups' && state.groupSearchResults.length > 0 ? `
      <div class="absolute top-full left-3 right-3 z-30 mt-1 max-h-72 overflow-y-auto ${state.isDark ? 'glass-card-dark border-white/10 divide-white/5' : 'glass-card-light border-slate-200 divide-slate-100'} rounded-2xl shadow-2xl divide-y border">
        ${state.groupSearchResults.map(g => `
          <div class="search-group-item flex items-center gap-3 p-3 hover:bg-blue-500/10 cursor-pointer transition-colors" data-group-id="${g.id}">
            <img src="${g.avatar_url || `https://api.dicebear.com/7.x/identicon/svg?seed=${g.name}`}" class="w-10 h-10 rounded-2xl bg-slate-900 ring-1 ring-blue-500/30 object-cover" />
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between">
                <h5 class="text-sm font-semibold truncate ${state.isDark ? 'text-slate-100' : 'text-slate-900'}">${g.name}</h5>
                <span class="text-[10px] font-mono font-bold text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20">#GRP-${g.group_royal_id || 'PUBLIC'}</span>
              </div>
              <p class="text-xs ${state.isDark ? 'text-slate-400' : 'text-slate-500'} truncate">${g.participant_count || 1} members • ${g.description || 'Public Group'}</p>
            </div>
            <button class="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl">${g.is_member ? 'Open' : 'Join'}</button>
          </div>
        `).join('')}
      </div>
    ` : ''}
  </div>`;
}

function renderChatList() {
  if (state.chats.length === 0) {
    return `
    <div class="flex-1 p-8 text-center text-xs flex flex-col items-center justify-center space-y-2 ${state.isDark ? 'text-slate-400' : 'text-slate-500'}">
      <span class="mdi mdi-chat-outline text-4xl text-blue-500/40"></span>
      <p class="font-semibold text-sm ${state.isDark ? 'text-slate-300' : 'text-slate-700'}">No conversations yet</p>
      <p>Search any username or 7-digit Royal ID above to start chatting!</p>
    </div>`;
  }

  return `
  <div class="flex-1 overflow-y-auto divide-y ${state.isDark ? 'divide-white/5' : 'divide-slate-200/60'}">
    ${state.chats.map(chat => {
      const isActive = chat.id === state.activeChatId;
      const isSelf = Boolean(chat.is_self);
      const other = !chat.is_group && !isSelf && chat.other_participants ? chat.other_participants[0] : null;
      const title = isSelf ? `${state.user?.display_name || 'You'} (You)` : (chat.is_group ? chat.name : getContactDisplayName(other));
      const avatar = isSelf ? getUserAvatar(state.user) : (chat.is_group ? (chat.avatar_url || `https://api.dicebear.com/7.x/identicon/svg?seed=${chat.name}`) : getUserAvatar(other));
      const lastMsg = chat.last_message ? (chat.last_message.is_deleted ? '🚫 This message was deleted' : (chat.last_message.message_type !== 'text' ? `📎 [${chat.last_message.message_type.toUpperCase()}] ${chat.last_message.file_name || ''}` : chat.last_message.content)) : (isSelf ? 'Message yourself • Notes & 1GB files' : 'No messages yet');
      const time = chat.last_message?.created_at ? new Date(chat.last_message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
      const unreadCount = Number(chat.unread_count || 0);
      const hasUnread = unreadCount > 0;
      const isBlocked = other && state.blockedUserIds.has(other.id);

      return `
      <div class="chat-list-item relative flex items-center gap-3 p-3.5 cursor-pointer transition-all ${isActive ? (state.isDark ? 'bg-blue-600/20 border-l-4 border-blue-500' : 'bg-blue-50 border-l-4 border-blue-600') : 'hover:bg-white/10'}" data-chat-id="${chat.id}">
        <!-- Avatar with unread / self indicator dot -->
        <div class="relative shrink-0">
          <img src="${avatar}" class="w-12 h-12 rounded-2xl object-cover bg-slate-900 border ${state.isDark ? 'border-white/10' : 'border-slate-200'} shadow-sm" />
          ${isSelf ? `<span class="absolute -bottom-1 -right-1 p-0.5 bg-blue-600 text-white rounded-full text-[10px] mdi mdi-bookmark-check"></span>` : ''}
          ${chat.is_group ? `<span class="absolute -bottom-1 -right-1 p-0.5 bg-blue-600 text-white rounded-full text-[10px] mdi mdi-account-multiple"></span>` : ''}
          ${hasUnread ? `<span class="absolute -top-1 -right-1 w-3.5 h-3.5 bg-blue-500 border-2 ${state.isDark ? 'border-slate-950' : 'border-white'} rounded-full shadow-lg shadow-blue-500/60 animate-pulse"></span>` : ''}
        </div>

        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-1.5 truncate">
              <h4 class="font-semibold text-sm truncate ${hasUnread ? 'text-blue-500 font-bold' : (state.isDark ? 'text-slate-100' : 'text-slate-900')}">${title}</h4>
              ${isSelf ? `<span class="text-[9px] bg-blue-500/20 text-blue-400 border border-blue-500/30 px-1.5 py-0.2 rounded font-mono font-bold">You</span>` : ''}
              ${isBlocked ? `<span class="text-[9px] bg-red-500/15 text-red-400 border border-red-500/25 px-1 py-0.2 rounded font-mono">BLOCKED</span>` : ''}
            </div>
            <div class="flex items-center gap-1.5 shrink-0 ml-2">
              <span class="text-[11px] ${hasUnread ? 'text-blue-500 font-semibold' : (state.isDark ? 'text-slate-400' : 'text-slate-500')}">${time}</span>
              ${hasUnread ? `<span class="w-2 h-2 rounded-full bg-blue-500 ring-4 ring-blue-500/25 animate-ping"></span>` : ''}
            </div>
          </div>

          <div class="flex items-center justify-between mt-1">
            <p class="text-xs ${hasUnread ? (state.isDark ? 'text-slate-100 font-semibold' : 'text-slate-900 font-semibold') : (state.isDark ? 'text-slate-400' : 'text-slate-500')} truncate flex-1">${lastMsg}</p>
            ${hasUnread ? `<span class="bg-blue-600 text-white font-bold text-[10px] px-1.5 py-0.2 rounded-full shadow-md shrink-0 ml-2">${unreadCount}</span>` : ''}
          </div>

          <div class="flex items-center gap-2 mt-1">
            ${isSelf ? `<span class="inline-block text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded-md border border-emerald-500/20 font-bold">Personal Vault</span>` : ''}
            ${other ? `<span class="inline-block text-[9px] font-mono text-amber-500 bg-amber-500/10 px-1.5 py-0.2 rounded-md border border-amber-500/20 font-bold">#${other.royal_id}</span>` : ''}
            ${chat.is_group ? `<span class="inline-block text-[9px] font-mono text-blue-400 bg-blue-500/10 px-1.5 py-0.2 rounded-md border border-blue-500/20 font-bold">#GRP-${chat.group_royal_id || 'PUBLIC'}</span>` : ''}
            ${chat.is_group && chat.is_public ? `<span class="text-[9px] text-emerald-400 bg-emerald-500/10 px-1 rounded border border-emerald-500/20">Public</span>` : ''}
          </div>
        </div>
      </div>`;
    }).join('')}
  </div>`;
}

// ============================================================
// CHAT AREA
// ============================================================
function renderChatArea() {
  const activeChat = state.chats.find(c => c.id === state.activeChatId);
  if (!activeChat) {
    return `
    <div class="flex-1 h-full flex flex-col items-center justify-center p-8 text-center select-none ${state.isDark ? 'text-slate-400' : 'text-slate-500'}">
      <div class="max-w-md space-y-4">
        <div class="flex justify-center">${LOGO_SVG}</div>
        <h2 class="text-2xl font-bold font-heading ${state.isDark ? 'text-slate-100' : 'text-slate-900'} drop-shadow-sm">LogsApp 2.0 Web Chat</h2>
        <p class="text-xs leading-relaxed ${state.isDark ? 'text-slate-400' : 'text-slate-600'}">Ultra-fast messaging, 1GB file transfers, audio calling, reports & moderation with zero-sudo Linux terminal sync.</p>
        <div class="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-500/10 border border-blue-500/25 text-blue-500 rounded-full text-xs font-mono backdrop-blur-md shadow-sm">
          <span class="mdi mdi-console"></span> CLI: logsapp chats
        </div>
      </div>
    </div>`;
  }

  const isSelf = Boolean(activeChat.is_self);
  const other = !activeChat.is_group && !isSelf && activeChat.other_participants ? activeChat.other_participants[0] : null;
  const title = isSelf ? `${state.user?.display_name || 'You'} (You)` : (activeChat.is_group ? activeChat.name : getContactDisplayName(other));
  const avatar = isSelf ? getUserAvatar(state.user) : (activeChat.is_group ? (activeChat.avatar_url || `https://api.dicebear.com/7.x/identicon/svg?seed=${activeChat.name}`) : getUserAvatar(other));
  const isBlocked = other && state.blockedUserIds.has(other.id);

  return `
  <div class="flex-1 h-full flex flex-col bg-transparent relative overflow-hidden">
    <!-- Chat Header -->
    <div class="h-16 px-4 flex items-center justify-between border-b ${state.isDark ? 'glass-nav-dark' : 'glass-nav-light'} shrink-0 z-10">
      <div class="flex items-center gap-3 min-w-0">
        <button id="btn-chat-back" class="md:hidden p-1 ${state.isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'}"><span class="mdi mdi-arrow-left text-xl"></span></button>
        <img src="${avatar}" class="w-10 h-10 rounded-2xl object-cover bg-slate-900 border ${state.isDark ? 'border-white/10' : 'border-slate-200'} shrink-0 ring-1 ring-blue-500/30 shadow" />
        <div class="min-w-0">
          <div class="flex items-center gap-2">
            <h3 class="font-semibold text-sm truncate ${state.isDark ? 'text-slate-100' : 'text-slate-900'}">${title}</h3>
            ${isSelf ? `<span class="text-[10px] font-mono font-bold text-blue-400 bg-blue-500/10 px-1.5 py-0.2 rounded-md border border-blue-500/20">Personal Vault</span>` : ''}
            ${other ? `<span class="text-[10px] font-mono font-bold text-amber-500 bg-amber-500/10 px-1.5 py-0.2 rounded-md border border-amber-500/20">#${other.royal_id}</span>` : ''}
            ${activeChat.is_group ? `<span class="text-[10px] font-mono font-bold text-blue-400 bg-blue-500/10 px-1.5 py-0.2 rounded-md border border-blue-500/20">#GRP-${activeChat.group_royal_id || 'PUBLIC'}</span>` : ''}
          </div>
          <p class="text-[11px] ${state.isDark ? 'text-slate-400' : 'text-slate-500'}">${isSelf ? 'Message yourself • Personal notes & 1GB transfers' : (activeChat.is_group ? `${activeChat.participant_count || 2} members ${activeChat.is_public ? '• Public Group' : '• Private Group'}` : (other ? `@${other.username}` : 'Direct Chat'))}</p>
        </div>
      </div>

      <!-- Action Buttons in Header -->
      <div class="flex items-center gap-1.5 ${state.isDark ? 'text-slate-400' : 'text-slate-500'}">
        ${!activeChat.is_group && !isSelf && other ? `
          <button id="btn-start-call" class="p-2 hover:bg-white/10 rounded-2xl text-emerald-500 hover:text-emerald-400 transition-all" title="Start WebRTC Audio Call"><span class="mdi mdi-phone text-lg"></span></button>
        ` : ''}
        <button id="btn-chat-storage" class="p-2 hover:bg-white/10 rounded-2xl text-amber-500 hover:text-amber-400 transition-all" title="Storage Quota"><span class="mdi mdi-harddisk text-lg"></span></button>
        
        <!-- Chat Menu Dropdown Button -->
        <div class="relative">
          <button id="btn-toggle-chat-menu" class="p-2 hover:bg-white/10 rounded-2xl hover:text-blue-500 transition-all" title="More Options"><span class="mdi mdi-dots-vertical text-lg"></span></button>
          
          ${state.showChatMenu ? `
            <div class="absolute right-0 top-full mt-2 w-56 ${state.isDark ? 'glass-card-dark border-white/10 divide-white/5' : 'glass-card-light border-slate-200 divide-slate-100'} rounded-2xl shadow-2xl divide-y border z-50 text-xs overflow-hidden modal-enter">
              ${!activeChat.is_group && !isSelf && other ? `
                <button id="menu-set-alias" class="w-full text-left p-3 hover:bg-blue-500/10 flex items-center gap-2 transition-colors"><span class="mdi mdi-pencil text-blue-400"></span> Edit Custom Nickname</button>
                <button id="menu-report-user" class="w-full text-left p-3 hover:bg-red-500/10 text-red-400 flex items-center gap-2 transition-colors"><span class="mdi mdi-flag-outline"></span> Report User to Admin</button>
                <button id="menu-toggle-block" class="w-full text-left p-3 hover:bg-red-500/10 ${isBlocked ? 'text-emerald-400' : 'text-red-400'} flex items-center gap-2 transition-colors"><span class="mdi ${isBlocked ? 'mdi-account-check' : 'mdi-account-cancel'}"></span> ${isBlocked ? 'Unblock User' : 'Block User'}</button>
              ` : ''}
              <button id="menu-clear-chat" class="w-full text-left p-3 hover:bg-red-500/10 text-amber-400 flex items-center gap-2 transition-colors"><span class="mdi mdi-broom"></span> Clear Chat History</button>
            </div>
          ` : ''}
        </div>
      </div>
    </div>

    <!-- Messages Container -->
    <div id="messages-container" class="flex-1 overflow-y-auto p-4 md:p-6 space-y-3">
      ${state.activeMessages.length === 0 ? `
        <div class="flex flex-col items-center justify-center h-full text-center text-xs space-y-2 ${state.isDark ? 'text-slate-400' : 'text-slate-500'}">
          <span class="mdi mdi-message-text-outline text-3xl text-blue-500/40"></span>
          <p class="font-semibold ${state.isDark ? 'text-slate-300' : 'text-slate-700'}">${isSelf ? 'Your Personal Notes & 1GB Cloud Vault' : 'No messages yet'}</p>
          <p>${isSelf ? 'Send notes, copy code, or store files up to 1GB to access across devices & Linux CLI!' : 'Send a message or attach any file up to 1GB!'}</p>
        </div>
      ` : state.activeMessages.map(msg => renderMessageBubble(msg, msg.sender_id === state.user.id)).join('')}
    </div>

    <!-- Mobile-Optimized Input Bar -->
    <div class="p-3 border-t ${state.isDark ? 'glass-nav-dark' : 'glass-nav-light'} shrink-0" style="padding-bottom: max(0.75rem, env(safe-area-inset-bottom));">
      ${isBlocked ? `
        <div class="p-3 bg-red-500/15 border border-red-500/30 text-red-400 text-xs text-center rounded-2xl font-semibold">
          🚫 You have blocked this user. Unblock to send messages.
        </div>
      ` : `
        <form id="chat-input-form" class="flex items-center gap-2 max-w-5xl mx-auto">
          <input type="file" id="file-upload-input" class="hidden" />
          <button type="button" id="btn-attach-file" class="p-2.5 ${state.isDark ? 'text-slate-400 hover:text-blue-400' : 'text-slate-500 hover:text-blue-600'} rounded-2xl hover:bg-white/10 transition-all" title="Attach file (up to 1GB)"><span class="mdi mdi-paperclip text-xl"></span></button>
          <input type="text" id="chat-message-input" placeholder="${isSelf ? 'Message yourself (notes, links, code)...' : 'Type a message...'}" class="flex-1 py-2.5 px-4 rounded-2xl text-sm ${state.isDark ? 'bg-slate-900/70 border-white/10 text-slate-100 placeholder:text-slate-500' : 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 shadow-sm'} border focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 backdrop-blur-md transition-all" />
          <button type="submit" class="p-2.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-2xl shadow-lg shadow-blue-500/25 border border-white/10 shrink-0 transition-all flex items-center justify-center"><span class="mdi mdi-send text-base"></span></button>
        </form>
      `}
    </div>
  </div>`;
}

// Render Message Bubble with Forward, Delete, and Direct Save Actions
function renderMessageBubble(msg, isMe) {
  const time = msg.created_at ? new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
  const downloadUrl = `${API.getBaseUrl()}/files/download/${msg.id}`;

  if (msg.is_deleted) {
    return `
    <div class="flex flex-col my-1.5 ${isMe ? 'items-end' : 'items-start'} opacity-60">
      <div class="rounded-2xl px-4 py-2 text-xs italic ${state.isDark ? 'bg-slate-900/60 text-slate-400 border border-white/5' : 'bg-slate-100 text-slate-500 border border-slate-200'}">
        🚫 This message was deleted
      </div>
    </div>`;
  }

  return `
  <div class="group flex flex-col my-1.5 ${isMe ? 'items-end' : 'items-start'}">
    <div class="relative max-w-[85%] md:max-w-[70%]">
      
      <!-- Forward / Delete Action Toolbar on Hover -->
      <div class="absolute -top-3 ${isMe ? 'left-0 -translate-x-full' : 'right-0 translate-x-full'} hidden group-hover:flex items-center gap-1 px-2 py-1 ${state.isDark ? 'bg-slate-900/90 border-white/10' : 'bg-white border-slate-200 shadow-md'} border rounded-xl z-20 backdrop-blur-md text-xs">
        <button class="btn-msg-forward p-1 text-blue-400 hover:text-blue-300" data-msg-id="${msg.id}" title="Forward Message"><span class="mdi mdi-share"></span></button>
        ${['file', 'document', 'archive', 'video', 'audio', 'image'].includes(msg.message_type) ? `
          <button class="btn-direct-download p-1 text-emerald-400 hover:text-emerald-300" data-url="${downloadUrl}" data-filename="${msg.file_name || 'download'}" title="Save Direct to Device"><span class="mdi mdi-download"></span></button>
        ` : ''}
        ${isMe ? `<button class="btn-msg-delete p-1 text-red-400 hover:text-red-300" data-msg-id="${msg.id}" title="Delete Message"><span class="mdi mdi-delete-outline"></span></button>` : ''}
      </div>

      <div class="rounded-2xl px-4 py-2.5 text-sm break-words ${isMe ? 'bubble-sent' : (state.isDark ? 'bubble-received-dark' : 'bubble-received-light')} flex flex-col shadow-sm">
        
        ${msg.forwarded_from_id ? `
          <div class="text-[10px] text-amber-300 flex items-center gap-1 mb-1 opacity-80 font-mono">
            <span class="mdi mdi-share"></span> Forwarded Message
          </div>
        ` : ''}

        ${msg.message_type === 'image' ? `
          <div class="mb-2 -mx-1.5 -mt-1 rounded-2xl overflow-hidden cursor-pointer border border-white/10 shadow-sm group/img relative" data-lightbox="${downloadUrl}">
            <img src="${downloadUrl}" alt="Attached Image" loading="lazy" class="w-full max-h-72 object-cover transition-transform group-hover/img:scale-102" onerror="this.onerror=null; this.parentElement.innerHTML='<div class=\\'p-3 bg-black/40 text-xs text-amber-300 flex items-center gap-2\\'><span class=\\'mdi mdi-image-broken\\'></span> Photo attached (${msg.file_name || 'image'})</div>'" />
            <div class="absolute inset-0 bg-black/30 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold gap-1">
              <span class="mdi mdi-magnify-plus-outline text-lg"></span> View Full Size
            </div>
            ${msg.quick_code ? `<div class="bg-black/75 px-2.5 py-1 flex justify-between text-[10px] text-amber-300 font-mono backdrop-blur-sm"><span>Code: ${msg.quick_code}</span></div>` : ''}
          </div>
        ` : ''}

        ${['file', 'document', 'archive', 'video', 'audio'].includes(msg.message_type) ? `
          <div class="flex items-center gap-3 p-3 bg-black/25 rounded-2xl mb-2 border border-white/10 backdrop-blur-sm">
            <span class="mdi mdi-file-document text-2xl text-blue-300"></span>
            <div class="flex-1 min-w-0">
              <p class="font-semibold text-xs truncate text-white">${msg.file_name || 'Attached File'}</p>
              <span class="text-[10px] font-mono text-amber-300">${msg.quick_code ? `QuickCode: ${msg.quick_code}` : '1GB max'}</span>
            </div>
            <button class="btn-direct-download p-2 bg-blue-500/30 hover:bg-blue-500/50 text-blue-200 rounded-xl transition-all" data-url="${downloadUrl}" data-filename="${msg.file_name || 'download'}" title="Save Direct to Device"><span class="mdi mdi-download"></span></button>
          </div>
        ` : ''}

        ${msg.content && msg.content !== msg.file_name ? `<p class="whitespace-pre-wrap leading-relaxed">${msg.content}</p>` : ''}

        <!-- Clean Timestamp Flow -->
        <div class="flex items-center justify-end gap-1 mt-1.5 pt-0.5 text-[10px] opacity-75 font-mono select-none">
          <span>${time}</span>
          ${isMe ? `<span class="mdi mdi-check-all text-cyan-300 ml-0.5"></span>` : ''}
        </div>
      </div>
    </div>
  </div>`;
}

// ============================================================
// DRAGGABLE WEBRTC AUDIO CALL OVERLAY (Zero UI Glitching)
// ============================================================
function renderCallOverlay() {
  const container = document.getElementById('call-container');
  if (!container) return;

  const call = state.activeCall;
  if (!call) {
    stopRingtoneSound();
    container.innerHTML = '';
    return;
  }

  const isCaller = call.caller_id === state.user?.id;
  const otherName = isCaller ? (call.receiver_name || 'Contact') : (call.caller_name || 'Caller');
  const otherAvatar = isCaller ? (call.receiver_avatar || getDeterministicAnimeAvatar(call.receiver_id).url) : (call.caller_avatar || getDeterministicAnimeAvatar(call.caller_id).url);

  if (call.status === 'ringing') {
    playRingtoneSound();
    if (!isCaller) {
      // Incoming Call Ringing Banner
      container.innerHTML = `
      <div class="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-md p-4 glass-card-dark rounded-3xl shadow-2xl border border-blue-500/40 call-pulse flex items-center justify-between pointer-events-auto animate-in fade-in">
        <div class="flex items-center gap-3 min-w-0">
          <img src="${otherAvatar}" class="w-12 h-12 rounded-2xl object-cover border-2 border-emerald-500" />
          <div>
            <h4 class="font-bold text-sm text-white">${otherName}</h4>
            <p class="text-xs text-emerald-400 font-semibold animate-pulse">📞 Incoming Audio Call...</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button id="btn-accept-call" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold text-xs flex items-center gap-1 shadow-lg shadow-emerald-500/30 transition-all"><span class="mdi mdi-phone"></span> Accept</button>
          <button id="btn-decline-call" class="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-2xl font-bold text-xs flex items-center gap-1 shadow-lg shadow-red-500/30 transition-all"><span class="mdi mdi-phone-hangup"></span> Decline</button>
        </div>
      </div>`;
    } else {
      // Outgoing Call Ringing Banner
      container.innerHTML = `
      <div class="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-md p-4 glass-card-dark rounded-3xl shadow-2xl border border-blue-500/40 flex items-center justify-between pointer-events-auto animate-in fade-in">
        <div class="flex items-center gap-3 min-w-0">
          <img src="${otherAvatar}" class="w-12 h-12 rounded-2xl object-cover border-2 border-blue-500 animate-pulse" />
          <div>
            <h4 class="font-bold text-sm text-white">${otherName}</h4>
            <p class="text-xs text-blue-400 font-semibold">Calling...</p>
          </div>
        </div>
        <button id="btn-hangup-call" class="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-2xl font-bold text-xs flex items-center gap-1 transition-all"><span class="mdi mdi-phone-hangup"></span> Cancel</button>
      </div>`;
    }
  } else if (call.status === 'accepted') {
    stopRingtoneSound();
    // Active In-Call Draggable Floating Widget
    const minutes = Math.floor(state.callDuration / 60).toString().padStart(2, '0');
    const seconds = (state.callDuration % 60).toString().padStart(2, '0');

    container.innerHTML = `
    <div id="draggable-call-widget" class="fixed top-20 right-4 md:right-8 z-50 p-3.5 px-4 glass-card-dark rounded-3xl shadow-2xl border border-emerald-500/40 flex items-center gap-3.5 pointer-events-auto cursor-grab touch-none select-none animate-in fade-in">
      <div class="flex items-center gap-1 text-slate-400 mr-0.5 text-xs">
        <span class="mdi mdi-drag-vertical"></span>
      </div>
      <img src="${otherAvatar}" class="w-10 h-10 rounded-2xl object-cover border-2 border-emerald-500 pointer-events-none" />
      <div class="pointer-events-none">
        <h4 class="font-bold text-xs text-white">${otherName}</h4>
        <span id="call-timer-text" class="text-[11px] font-mono text-emerald-400 font-bold">${minutes}:${seconds}</span>
      </div>
      <div class="flex items-center gap-1.5 ml-2">
        <button id="btn-toggle-mute" class="p-2.5 ${state.isMuted ? 'bg-red-500/30 text-red-400' : 'bg-white/10 text-white'} hover:bg-white/20 rounded-2xl transition-all" title="${state.isMuted ? 'Unmute' : 'Mute'}">
          <span class="mdi ${state.isMuted ? 'mdi-microphone-off' : 'mdi-microphone'}"></span>
        </button>
        <button id="btn-hangup-call" class="p-2.5 bg-red-600 hover:bg-red-500 text-white rounded-2xl transition-all" title="End Call">
          <span class="mdi mdi-phone-hangup"></span>
        </button>
      </div>
    </div>`;

    initDraggableCallWidget();
  }

  // Bind Call Event Buttons
  document.getElementById('btn-accept-call')?.addEventListener('click', () => answerVoiceCall());
  document.getElementById('btn-decline-call')?.addEventListener('click', () => endVoiceCall());
  document.getElementById('btn-hangup-call')?.addEventListener('click', () => endVoiceCall());
  document.getElementById('btn-toggle-mute')?.addEventListener('click', () => {
    if (state.localStream) {
      state.isMuted = !state.isMuted;
      state.localStream.getAudioTracks().forEach(t => { t.enabled = !state.isMuted; });
      renderCallOverlay();
    }
  });
}

// Drag helper for floating in-call widget
function initDraggableCallWidget() {
  const widget = document.getElementById('draggable-call-widget');
  if (!widget) return;

  let isDragging = false;
  let startX = 0, startY = 0, initialX = 0, initialY = 0;

  const onPointerDown = (e) => {
    if (e.target.closest('button')) return;
    isDragging = true;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    startX = clientX;
    startY = clientY;

    const rect = widget.getBoundingClientRect();
    initialX = rect.left;
    initialY = rect.top;

    widget.style.bottom = 'auto';
    widget.style.right = 'auto';
    widget.style.left = `${initialX}px`;
    widget.style.top = `${initialY}px`;
    widget.classList.add('cursor-grabbing');
  };

  const onPointerMove = (e) => {
    if (!isDragging) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    const dx = clientX - startX;
    const dy = clientY - startY;

    const newX = Math.max(10, Math.min(window.innerWidth - widget.offsetWidth - 10, initialX + dx));
    const newY = Math.max(10, Math.min(window.innerHeight - widget.offsetHeight - 10, initialY + dy));

    widget.style.left = `${newX}px`;
    widget.style.top = `${newY}px`;
  };

  const onPointerUp = () => {
    isDragging = false;
    widget.classList.remove('cursor-grabbing');
  };

  widget.addEventListener('mousedown', onPointerDown);
  widget.addEventListener('touchstart', onPointerDown, { passive: true });
  window.addEventListener('mousemove', onPointerMove);
  window.addEventListener('touchmove', onPointerMove, { passive: true });
  window.addEventListener('mouseup', onPointerUp);
  window.addEventListener('touchend', onPointerUp);
}

// ============================================================
// ADMIN DASHBOARD MODAL
// ============================================================
function renderAdminModal() {
  return `
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl p-4 overflow-y-auto animate-in fade-in">
    <div class="w-full max-w-5xl ${state.isDark ? 'glass-card-dark border-white/10' : 'glass-card-light border-slate-200'} rounded-3xl overflow-hidden modal-enter max-h-[90dvh] flex flex-col border">
      <!-- Admin Header -->
      <div class="bg-gradient-to-r from-purple-900/90 via-indigo-900/90 to-slate-950/90 p-6 text-white flex items-center justify-between border-b border-white/10 shrink-0">
        <div class="flex items-center gap-3">
          <span class="mdi mdi-shield-crown text-3xl text-purple-400"></span>
          <div>
            <h3 class="font-bold text-lg font-heading">LogsApp Administrator Panel</h3>
            <p class="text-xs text-purple-200">Moderation, Blackmail/Abuse Reports, User Controls, & System Stats</p>
          </div>
        </div>
        <button id="btn-close-admin" class="p-2 bg-black/30 hover:bg-black/50 rounded-2xl text-white"><span class="mdi mdi-close text-lg"></span></button>
      </div>

      <!-- Admin Tabs -->
      <div class="flex border-b ${state.isDark ? 'border-white/10 bg-slate-950/50' : 'border-slate-200 bg-slate-100'} p-2 gap-2 text-xs font-bold shrink-0">
        <button class="admin-tab-btn px-4 py-2 rounded-2xl transition-all ${state.adminTab === 'overview' ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}" data-tab="overview"><span class="mdi mdi-view-dashboard mr-1"></span> Overview Stats</button>
        <button class="admin-tab-btn px-4 py-2 rounded-2xl transition-all ${state.adminTab === 'reports' ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}" data-tab="reports"><span class="mdi mdi-flag-alert mr-1"></span> Reports & Chat Snapshots (${state.adminStats?.pendingReports || 0})</button>
        <button class="admin-tab-btn px-4 py-2 rounded-2xl transition-all ${state.adminTab === 'users' ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}" data-tab="users"><span class="mdi mdi-account-cog mr-1"></span> User Management</button>
      </div>

      <!-- Admin Content -->
      <div class="p-6 overflow-y-auto flex-1 space-y-6">
        ${state.adminTab === 'overview' ? `
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="p-4 ${state.isDark ? 'bg-slate-900/60 border-white/10' : 'bg-white border-slate-200 shadow-sm'} rounded-3xl border">
              <span class="text-[11px] uppercase font-bold text-slate-400">Total Users</span>
              <p class="text-2xl font-mono font-extrabold text-blue-500 mt-1">${state.adminStats?.totalUsers || 0}</p>
            </div>
            <div class="p-4 ${state.isDark ? 'bg-slate-900/60 border-white/10' : 'bg-white border-slate-200 shadow-sm'} rounded-3xl border">
              <span class="text-[11px] uppercase font-bold text-slate-400">Total Chats</span>
              <p class="text-2xl font-mono font-extrabold text-indigo-500 mt-1">${state.adminStats?.totalChats || 0}</p>
            </div>
            <div class="p-4 ${state.isDark ? 'bg-slate-900/60 border-white/10' : 'bg-white border-slate-200 shadow-sm'} rounded-3xl border">
              <span class="text-[11px] uppercase font-bold text-slate-400">Total Messages</span>
              <p class="text-2xl font-mono font-extrabold text-emerald-500 mt-1">${state.adminStats?.totalMessages || 0}</p>
            </div>
            <div class="p-4 ${state.isDark ? 'bg-slate-900/60 border-white/10' : 'bg-white border-slate-200 shadow-sm'} rounded-3xl border">
              <span class="text-[11px] uppercase font-bold text-slate-400">Pending Reports</span>
              <p class="text-2xl font-mono font-extrabold text-red-500 mt-1">${state.adminStats?.pendingReports || 0}</p>
            </div>
          </div>

          <div class="p-4 bg-purple-500/10 border border-purple-500/20 rounded-3xl text-xs text-purple-300">
            🛡️ <b>Administrator Policy:</b> Inactive user accounts (> 30 days) and old storage archives are automatically audited and purged daily to maintain high performance.
          </div>
        ` : ''}

        ${state.adminTab === 'reports' ? `
          <div class="space-y-4">
            ${state.adminReports.length === 0 ? `
              <div class="p-8 text-center text-slate-400 text-xs">No reports submitted yet. Everything is clean! 🎉</div>
            ` : state.adminReports.map(r => `
              <div class="p-4 ${state.isDark ? 'bg-slate-900/80 border-white/10' : 'bg-white border-slate-200 shadow-sm'} rounded-3xl border space-y-3">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="px-2.5 py-1 bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl font-bold text-xs">${r.reason}</span>
                    <span class="text-xs ${state.isDark ? 'text-slate-300' : 'text-slate-700'}">Reported by <b>@${r.reporter_username}</b> against <b>@${r.reported_username}</b> (#${r.reported_royal_id})</span>
                  </div>
                  <span class="text-[11px] font-mono text-slate-400">${new Date(r.created_at).toLocaleString()}</span>
                </div>

                ${r.description ? `<p class="text-xs ${state.isDark ? 'text-slate-300' : 'text-slate-600'} bg-black/20 p-2.5 rounded-2xl">Description: ${r.description}</p>` : ''}

                <!-- Chat History Snapshot -->
                ${r.chat_snapshot && r.chat_snapshot.length > 0 ? `
                  <div class="space-y-1.5">
                    <span class="text-[10px] font-bold uppercase text-slate-400">Chat History Snapshot (${r.chat_snapshot.length} messages):</span>
                    <div class="max-h-48 overflow-y-auto p-3 ${state.isDark ? 'bg-slate-950 border-white/5' : 'bg-slate-100 border-slate-200'} rounded-2xl border space-y-2 text-xs font-mono">
                      ${r.chat_snapshot.map(m => `
                        <div class="flex items-start gap-2">
                          <span class="font-bold text-blue-400 shrink-0">@${m.sender_username}:</span>
                          <span class="${state.isDark ? 'text-slate-200' : 'text-slate-800'} break-words">${m.content || `[${m.message_type}]`}</span>
                        </div>
                      `).join('')}
                    </div>
                  </div>
                ` : ''}

                <div class="flex justify-end gap-2 pt-2">
                  <button class="btn-admin-block-user px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-2xl text-xs font-bold shadow" data-user-id="${r.reported_id}">Block Reported User</button>
                  <button class="btn-admin-resolve-report px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-xs font-bold shadow" data-report-id="${r.id}">Mark Resolved</button>
                </div>
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${state.adminTab === 'users' ? `
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="border-b ${state.isDark ? 'border-white/10 text-slate-400' : 'border-slate-200 text-slate-600'}">
                  <th class="p-3">User / Royal ID</th>
                  <th class="p-3">Role</th>
                  <th class="p-3">Status</th>
                  <th class="p-3">Storage</th>
                  <th class="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y ${state.isDark ? 'divide-white/5' : 'divide-slate-200'}">
                ${state.adminUsers.map(u => `
                  <tr class="hover:bg-white/5">
                    <td class="p-3">
                      <div class="flex items-center gap-2">
                        <img src="${getUserAvatar(u)}" class="w-8 h-8 rounded-xl object-cover bg-slate-900" />
                        <div>
                          <p class="font-bold ${state.isDark ? 'text-slate-100' : 'text-slate-900'}">${u.display_name} (@${u.username})</p>
                          <span class="font-mono text-amber-500 text-[10px]">#${u.royal_id}</span>
                        </div>
                      </div>
                    </td>
                    <td class="p-3 font-mono font-bold ${u.role === 'admin' ? 'text-purple-400' : 'text-slate-400'}">${u.role || 'user'}</td>
                    <td class="p-3">${u.is_blocked ? '<span class="text-red-400 font-bold">Blocked</span>' : '<span class="text-emerald-400 font-bold">Active</span>'}</td>
                    <td class="p-3 font-mono text-[11px]">${((Number(u.storage_used_bytes || 0)) / (1024 * 1024)).toFixed(1)} MB</td>
                    <td class="p-3 text-right space-x-1">
                      <button class="btn-admin-msg px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-xl" data-user-id="${u.id}" title="Send Admin Message"><span class="mdi mdi-message-text"></span></button>
                      <button class="btn-admin-toggle-block px-2.5 py-1 ${u.is_blocked ? 'bg-emerald-600' : 'bg-amber-600'} text-white rounded-xl" data-user-id="${u.id}" data-blocked="${u.is_blocked}">${u.is_blocked ? 'Unblock' : 'Block'}</button>
                      <button class="btn-admin-delete-user px-2.5 py-1 bg-red-600 hover:bg-red-500 text-white rounded-xl" data-user-id="${u.id}" title="Delete User"><span class="mdi mdi-trash-can"></span></button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        ` : ''}
      </div>
    </div>
  </div>`;
}

// ============================================================
// REPORT USER MODAL
// ============================================================
function renderReportModal() {
  const target = state.showReportModal;
  if (!target) return '';

  return `
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-lg p-4">
    <div class="w-full max-w-md ${state.isDark ? 'glass-card-dark border-white/10' : 'glass-card-light border-slate-200'} rounded-3xl overflow-hidden modal-enter p-6 space-y-4 border">
      <div class="flex items-center justify-between">
        <h3 class="font-bold text-lg font-heading text-red-500 flex items-center gap-2"><span class="mdi mdi-flag-alert"></span> Report @${target.username}</h3>
        <button id="btn-close-report" class="${state.isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}"><span class="mdi mdi-close text-lg"></span></button>
      </div>
      <p class="text-xs ${state.isDark ? 'text-slate-400' : 'text-slate-600'} leading-relaxed">
        Reports are sent directly to the administrators along with an automated snapshot of recent messages for investigation.
      </p>
      <form id="report-user-form" class="space-y-3">
        <div>
          <label class="block text-xs font-semibold ${state.isDark ? 'text-slate-300' : 'text-slate-600'} mb-1">Reason for Report</label>
          <select id="report-reason" required class="w-full px-3.5 py-2.5 ${state.isDark ? 'bg-slate-950/70 border-white/10 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'} border rounded-2xl text-xs focus:outline-none focus:border-red-500">
            <option value="Blackmail / Extortion">Blackmail / Extortion</option>
            <option value="Harassment / Abuse">Harassment / Abuse</option>
            <option value="Scam / Fraudulent Content">Scam / Fraudulent Content</option>
            <option value="Spam / Malicious Files">Spam / Malicious Files</option>
            <option value="Other Safety Violation">Other Safety Violation</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-semibold ${state.isDark ? 'text-slate-300' : 'text-slate-600'} mb-1">Detailed Explanation</label>
          <textarea id="report-desc" rows="3" placeholder="Please describe what occurred..." class="w-full px-3.5 py-2.5 ${state.isDark ? 'bg-slate-950/70 border-white/10 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'} border rounded-2xl text-xs focus:outline-none focus:border-red-500"></textarea>
        </div>
        <button type="submit" class="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-2xl text-xs shadow-lg shadow-red-500/25 transition-all">Submit Report & Snapshot</button>
      </form>
    </div>
  </div>`;
}

// ============================================================
// CUSTOM CONTACT NICKNAME (ALIAS) MODAL
// ============================================================
function renderAliasModal() {
  const contact = state.showAliasModal;
  if (!contact) return '';

  const currentAlias = state.aliases[contact.id] || '';

  return `
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-lg p-4">
    <div class="w-full max-w-md ${state.isDark ? 'glass-card-dark border-white/10' : 'glass-card-light border-slate-200'} rounded-3xl overflow-hidden modal-enter p-6 space-y-4 border">
      <div class="flex items-center justify-between">
        <h3 class="font-bold text-lg font-heading ${state.isDark ? 'text-slate-100' : 'text-slate-900'}">Custom Nickname</h3>
        <button id="btn-close-alias" class="${state.isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}"><span class="mdi mdi-close text-lg"></span></button>
      </div>
      <p class="text-xs ${state.isDark ? 'text-slate-400' : 'text-slate-600'} leading-relaxed">
        Set a private custom name for <b>@${contact.username}</b>. Only you will see this nickname in your chats and sidebar.
      </p>
      <form id="alias-form" class="space-y-3">
        <div>
          <label class="block text-xs font-semibold ${state.isDark ? 'text-slate-300' : 'text-slate-600'} mb-1">Nickname (e.g. Julius)</label>
          <input type="text" id="alias-input" value="${currentAlias}" placeholder="e.g. Julius" class="w-full px-3.5 py-2.5 ${state.isDark ? 'bg-slate-950/70 border-white/10 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'} border rounded-2xl text-sm focus:outline-none focus:border-blue-500 transition-all" />
        </div>
        <div class="flex gap-2">
          ${currentAlias ? `<button type="button" id="btn-delete-alias" class="px-4 py-2.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 rounded-2xl text-xs font-semibold">Reset</button>` : ''}
          <button type="submit" class="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-2xl text-xs shadow-lg shadow-blue-500/25 transition-all">Save Nickname</button>
        </div>
      </form>
    </div>
  </div>`;
}

// ============================================================
// FORWARD MESSAGE MODAL
// ============================================================
function renderForwardModal() {
  const msg = state.showForwardModal;
  if (!msg) return '';

  return `
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-lg p-4">
    <div class="w-full max-w-md ${state.isDark ? 'glass-card-dark border-white/10' : 'glass-card-light border-slate-200'} rounded-3xl overflow-hidden modal-enter p-6 space-y-4 border">
      <div class="flex items-center justify-between">
        <h3 class="font-bold text-lg font-heading ${state.isDark ? 'text-slate-100' : 'text-slate-900'}">Forward Message</h3>
        <button id="btn-close-forward" class="${state.isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}"><span class="mdi mdi-close text-lg"></span></button>
      </div>
      <div class="p-3 bg-black/20 rounded-2xl text-xs italic ${state.isDark ? 'text-slate-300' : 'text-slate-700'} truncate">
        "${msg.content || `[${msg.message_type}] ${msg.file_name || ''}`}"
      </div>
      <div class="space-y-2 max-h-60 overflow-y-auto">
        <label class="block text-xs font-semibold ${state.isDark ? 'text-slate-300' : 'text-slate-600'}">Select Chat to Forward to:</label>
        ${state.chats.map(c => `
          <div class="forward-target-item flex items-center justify-between p-3 rounded-2xl cursor-pointer hover:bg-blue-600/15 border ${state.isDark ? 'border-white/5' : 'border-slate-200'} transition-all" data-chat-id="${c.id}">
            <span class="font-semibold text-xs truncate">${c.is_self ? `${state.user?.display_name || 'You'} (You)` : (c.is_group ? c.name : (c.other_participants ? getContactDisplayName(c.other_participants[0]) : 'Chat'))}</span>
            <span class="mdi mdi-send text-blue-500 text-base"></span>
          </div>
        `).join('')}
      </div>
    </div>
  </div>`;
}

// ============================================================
// PROFILE MODAL (Anime Avatars & 7-digit Royal ID)
// ============================================================
function renderProfileModal() {
  const avatar = getUserAvatar(state.user);
  const currentAnime = ANIME_AVATARS.find(a => a.url === avatar);
  const usedMb = ((Number(state.user?.storage_used_bytes || 0)) / (1024 * 1024)).toFixed(2);
  const limitMb = ((Number(state.user?.storage_limit_bytes || 1073741824)) / (1024 * 1024)).toFixed(0);

  return `
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-lg p-4 animate-in fade-in">
    <div class="w-full max-w-lg ${state.isDark ? 'glass-card-dark' : 'glass-card-light'} rounded-3xl overflow-hidden modal-enter max-h-[90dvh] flex flex-col border">
      <!-- Top Banner -->
      <div class="relative bg-gradient-to-r from-blue-700/85 via-indigo-700/85 to-purple-800/85 p-6 text-white text-center shrink-0 border-b border-white/10">
        <button id="btn-close-profile" class="absolute top-4 right-4 p-1.5 bg-black/30 hover:bg-black/50 rounded-2xl transition-all text-white"><span class="mdi mdi-close text-base"></span></button>
        
        <div class="relative inline-block mx-auto mb-2">
          <img src="${avatar}" class="w-24 h-24 rounded-3xl object-cover bg-slate-950 ring-4 ring-amber-400/80 shadow-2xl shadow-blue-500/50" />
          <span class="absolute -bottom-2 -right-2 p-1 bg-amber-500 text-slate-950 rounded-full text-xs font-bold shadow" title="Anime Avatar">⚡</span>
        </div>

        <div class="flex items-center justify-center gap-2 mt-1">
          <button id="btn-shuffle-avatar" class="text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 px-3.5 py-1.5 rounded-2xl font-bold shadow-md flex items-center gap-1.5 transition-all">
            <span>🎲 Shuffle Anime Avatar</span>
          </button>
          <button id="btn-toggle-avatar-grid" class="text-xs bg-blue-500/30 hover:bg-blue-500/50 text-white border border-blue-400/40 px-3.5 py-1.5 rounded-2xl font-semibold flex items-center gap-1 transition-all backdrop-blur-md">
            <span class="mdi mdi-grid"></span> Pick Character
          </button>
        </div>

        ${currentAnime ? `
          <div class="mt-2 text-xs font-semibold text-amber-300 font-heading">
            ✨ ${currentAnime.name} <span class="opacity-75 font-normal font-sans">(${currentAnime.anime})</span>
          </div>
        ` : ''}

        <h3 class="text-xl font-bold font-heading mt-2">${state.user?.display_name}</h3>
        <p class="text-xs text-blue-100 font-mono">@${state.user?.username}</p>
      </div>

      <!-- 7-Digit Royal ID Bar -->
      <div class="p-4 ${state.isDark ? 'bg-slate-950/60 border-white/10' : 'bg-slate-100/70 border-slate-200'} border-b flex items-center justify-between shrink-0 backdrop-blur-md">
        <div>
          <span class="text-[10px] font-bold uppercase tracking-wider ${state.isDark ? 'text-slate-400' : 'text-slate-500'}">7-Digit Royal ID</span>
          <p class="text-lg font-mono font-extrabold text-amber-500 mt-0.5">#${state.user?.royal_id}</p>
        </div>
        <button id="btn-copy-royal-id" class="px-3.5 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 border border-amber-500/30 rounded-2xl text-xs font-semibold flex items-center gap-1.5 transition-all">
          <span class="mdi mdi-content-copy"></span> Copy ID
        </button>
      </div>

      <!-- Character Grid / Storage -->
      <div class="p-6 space-y-4 overflow-y-auto flex-1">
        ${state.showAvatarGrid ? `
          <div class="space-y-2 p-3.5 ${state.isDark ? 'bg-slate-950/60 border-white/10' : 'bg-slate-100/80 border-slate-200'} rounded-3xl border backdrop-blur-md">
            <div class="flex items-center justify-between text-xs font-bold uppercase ${state.isDark ? 'text-slate-300' : 'text-slate-700'}">
              <span>Choose Your Anime Hero</span>
              <span class="text-[10px] text-amber-500">${ANIME_AVATARS.length} Characters</span>
            </div>
            <div class="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-48 overflow-y-auto p-1">
              ${ANIME_AVATARS.map((av) => `
                <div class="avatar-option-item flex flex-col items-center p-1.5 rounded-2xl cursor-pointer hover:bg-blue-600/20 border ${av.url === avatar ? 'border-amber-400 bg-amber-400/15 ring-2 ring-amber-400/40' : (state.isDark ? 'border-white/5 bg-slate-900/60' : 'border-slate-200 bg-white')} transition-all" data-url="${av.url}">
                  <img src="${av.url}" class="w-11 h-11 rounded-xl object-cover bg-slate-900" />
                  <span class="text-[9px] ${state.isDark ? 'text-slate-300' : 'text-slate-700'} font-semibold truncate w-full text-center mt-1">${av.name.split(' ')[0]}</span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Edit Profile Name & Password Form -->
        <form id="edit-profile-form" class="space-y-3 p-4 ${state.isDark ? 'bg-slate-950/60 border-white/10' : 'bg-slate-100/80 border-slate-200'} rounded-3xl border backdrop-blur-md">
          <h4 class="text-xs font-bold uppercase tracking-wider ${state.isDark ? 'text-slate-300' : 'text-slate-700'}">Edit Name & Password</h4>
          <div>
            <label class="block text-[11px] font-semibold ${state.isDark ? 'text-slate-400' : 'text-slate-600'} mb-1">Display Name</label>
            <input type="text" id="edit-profile-name" value="${state.user?.display_name || ''}" required class="w-full px-3.5 py-2 ${state.isDark ? 'bg-slate-900 border-white/10 text-slate-100' : 'bg-white border-slate-200 text-slate-900'} border rounded-2xl text-xs focus:outline-none focus:border-blue-500 transition-all" />
          </div>
          <div>
            <label class="block text-[11px] font-semibold ${state.isDark ? 'text-slate-400' : 'text-slate-600'} mb-1">New Password (Leave blank to keep unchanged)</label>
            <input type="password" id="edit-profile-pass" placeholder="••••••••" class="w-full px-3.5 py-2 ${state.isDark ? 'bg-slate-900 border-white/10 text-slate-100' : 'bg-white border-slate-200 text-slate-900'} border rounded-2xl text-xs focus:outline-none focus:border-blue-500 transition-all" />
          </div>
          <button type="submit" id="btn-save-profile" class="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-xs font-bold shadow-lg shadow-blue-500/25 transition-all">Save Profile Changes</button>
        </form>

        <div class="p-3.5 ${state.isDark ? 'bg-slate-950/60 border-white/10' : 'bg-slate-100/80 border-slate-200'} rounded-2xl border space-y-1 text-xs backdrop-blur-md">
          <div class="flex justify-between">
            <span class="${state.isDark ? 'text-slate-400' : 'text-slate-600'} font-medium">Storage Usage</span>
            <span class="font-mono text-blue-500 font-bold">${usedMb} MB / ${limitMb} MB</span>
          </div>
        </div>

        <div class="pt-2 flex justify-between">
          <button id="btn-logout" class="px-4 py-2.5 bg-red-500/15 hover:bg-red-500/25 text-red-500 border border-red-500/30 rounded-2xl text-xs font-semibold transition-all">Logout</button>
          <button id="btn-profile-done" class="px-6 py-2.5 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-2xl text-xs shadow transition-all">Close</button>
        </div>
      </div>
    </div>
  </div>`;
}

// ============================================================
// CREATE GROUP MODAL (Public vs Private & 7-digit Group ID)
// ============================================================
function renderGroupModal() {
  return `
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-lg p-4">
    <div class="w-full max-w-md ${state.isDark ? 'glass-card-dark border-white/10' : 'glass-card-light border-slate-200'} rounded-3xl overflow-hidden modal-enter p-6 space-y-4 border">
      <div class="flex items-center justify-between">
        <h3 class="font-bold text-lg font-heading ${state.isDark ? 'text-slate-100' : 'text-slate-900'}">Create Group Chat</h3>
        <button id="btn-close-group" class="${state.isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}"><span class="mdi mdi-close text-lg"></span></button>
      </div>
      <form id="create-group-form" class="space-y-4">
        <div>
          <label class="block text-xs font-semibold ${state.isDark ? 'text-slate-300' : 'text-slate-600'} mb-1">Group Name</label>
          <input type="text" id="group-name-input" placeholder="e.g. Project Alpha" required class="w-full px-3.5 py-2.5 ${state.isDark ? 'bg-slate-950/60 border-white/10 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'} border rounded-2xl text-sm focus:outline-none focus:border-blue-500 transition-all" />
        </div>
        <div>
          <label class="block text-xs font-semibold ${state.isDark ? 'text-slate-300' : 'text-slate-600'} mb-1">Description (Optional)</label>
          <input type="text" id="group-desc-input" placeholder="e.g. Official College Discussion" class="w-full px-3.5 py-2.5 ${state.isDark ? 'bg-slate-950/60 border-white/10 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'} border rounded-2xl text-sm focus:outline-none focus:border-blue-500 transition-all" />
        </div>
        
        <!-- Privacy Option -->
        <div class="p-3 ${state.isDark ? 'bg-slate-950/60 border-white/10' : 'bg-slate-100 border-slate-200'} rounded-2xl border space-y-2">
          <label class="block text-xs font-bold ${state.isDark ? 'text-slate-200' : 'text-slate-800'}">Group Privacy Setting</label>
          <div class="flex gap-4 text-xs">
            <label class="flex items-center gap-1.5 cursor-pointer">
              <input type="radio" name="group-privacy" value="private" checked class="text-blue-600" />
              <span>🔒 Private (Invite Only)</span>
            </label>
            <label class="flex items-center gap-1.5 cursor-pointer">
              <input type="radio" name="group-privacy" value="public" class="text-blue-600" />
              <span>🌐 Public (Searchable)</span>
            </label>
          </div>
          <p class="text-[10px] text-slate-400">Public groups are discoverable in the search bar and anyone can join.</p>
        </div>

        <button type="submit" class="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-2xl text-xs shadow-lg shadow-blue-500/25 border border-white/10 transition-all">Create Group & 7-Digit ID</button>
      </form>
    </div>
  </div>`;
}

// Storage Modal
function renderStorageModal() {
  const usedMb = ((Number(state.user?.storage_used_bytes || 0)) / (1024 * 1024)).toFixed(2);
  const limitMb = ((Number(state.user?.storage_limit_bytes || 1073741824)) / (1024 * 1024)).toFixed(0);

  return `
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-lg p-4">
    <div class="w-full max-w-md ${state.isDark ? 'glass-card-dark border-white/10' : 'glass-card-light border-slate-200'} rounded-3xl overflow-hidden modal-enter p-6 space-y-4 border">
      <div class="flex items-center justify-between">
        <h3 class="font-bold text-lg font-heading flex items-center gap-2 text-amber-500"><span class="mdi mdi-harddisk"></span> Storage Quota & Policies</h3>
        <button id="btn-close-storage" class="${state.isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}"><span class="mdi mdi-close text-lg"></span></button>
      </div>
      <div class="p-3.5 ${state.isDark ? 'bg-slate-950/60 border-white/10' : 'bg-slate-100 border-slate-200'} rounded-2xl border text-xs backdrop-blur-md">
        <div class="flex justify-between font-bold text-blue-500"><span>Current Storage:</span><span>${usedMb} MB / ${limitMb} MB</span></div>
      </div>
      <div class="space-y-2 text-xs ${state.isDark ? 'text-slate-400' : 'text-slate-600'} leading-relaxed">
        <p>• <b>1GB File Limit:</b> You can transfer zip files, photos, videos, and datasets up to 1GB per file.</p>
        <p>• <b>30-Day Inactivity Auto-Purge:</b> Accounts that do not log in or communicate for over 30 days are automatically pruned from the server to save capacity.</p>
      </div>
      <button id="btn-storage-done" class="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-xs font-semibold shadow-lg shadow-blue-500/25 transition-all">Done</button>
    </div>
  </div>`;
}

// CLI Modal
function renderCLIModal() {
  const host = API.getServerHost();
  const installCmd = `curl -fsSL ${host}/api/cli/install.sh | bash`;

  return `
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-lg p-4 overflow-y-auto">
    <div class="w-full max-w-2xl ${state.isDark ? 'glass-card-dark border-white/10' : 'glass-card-light border-slate-200'} rounded-3xl overflow-hidden modal-enter border">
      <div class="bg-gradient-to-r from-blue-900/85 via-indigo-900/85 to-slate-950/85 p-6 text-white flex items-center justify-between border-b border-white/10">
        <div class="flex items-center gap-3">
          <span class="mdi mdi-console text-3xl text-blue-400"></span>
          <div>
            <h3 class="font-bold text-lg font-heading">Linux CLI & College Lab Companion</h3>
            <p class="text-xs text-slate-300">Access files, code, & chats on College Linux PCs without root/sudo.</p>
          </div>
        </div>
        <button id="btn-close-cli" class="p-1.5 rounded-2xl text-slate-400 hover:text-white"><span class="mdi mdi-close text-lg"></span></button>
      </div>

      <div class="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
        <div>
          <label class="block font-bold text-blue-500 uppercase tracking-wider mb-1">1-Step Install (College User Account Ready)</label>
          <div class="flex items-center justify-between ${state.isDark ? 'bg-slate-950/70 border-white/10' : 'bg-slate-100 border-slate-200'} p-3.5 rounded-2xl border font-mono text-blue-500 backdrop-blur-md">
            <span class="truncate">${installCmd}</span>
            <button class="btn-copy-text px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl ml-2 font-semibold shadow transition-all" data-copy="${installCmd}">Copy</button>
          </div>
        </div>

        <div class="p-4 ${state.isDark ? 'bg-blue-950/40 border-blue-500/30' : 'bg-blue-50 border-blue-200'} rounded-2xl border space-y-2 backdrop-blur-md">
          <h4 class="font-bold text-blue-500">🎓 College Lab Commands</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div class="p-3 ${state.isDark ? 'bg-slate-950/70 border-white/10' : 'bg-white border-slate-200 shadow-sm'} rounded-xl border">
              <span class="font-mono text-blue-500 font-bold">logsapp pull @friend</span>
              <p class="text-[11px] ${state.isDark ? 'text-slate-400' : 'text-slate-600'} mt-0.5">Download all shared files straight into your college lab folder.</p>
            </div>
            <div class="p-3 ${state.isDark ? 'bg-slate-950/70 border-white/10' : 'bg-white border-slate-200 shadow-sm'} rounded-xl border">
              <span class="font-mono text-blue-500 font-bold">logsapp push-dir ./lab_code @friend</span>
              <p class="text-[11px] ${state.isDark ? 'text-slate-400' : 'text-slate-600'} mt-0.5">Zip & upload your assignment folder (up to 1GB).</p>
            </div>
          </div>
        </div>
      </div>

      <div class="p-4 ${state.isDark ? 'bg-slate-950/60 border-white/10' : 'bg-slate-100 border-slate-200'} border-t flex justify-end">
        <button id="btn-cli-done" class="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-semibold shadow-lg shadow-blue-500/25 transition-all">Done</button>
      </div>
    </div>
  </div>`;
}

// Lightbox
function renderLightbox() {
  return `
  <div id="lightbox-modal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 cursor-pointer animate-in fade-in">
    <div class="relative max-w-4xl max-h-[90vh] flex flex-col items-center">
      <button id="btn-close-lightbox" class="absolute -top-12 right-0 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all"><span class="mdi mdi-close text-xl"></span></button>
      <img src="${state.lightboxMedia}" class="max-w-full max-h-[80vh] rounded-3xl shadow-2xl object-contain border border-white/20" />
      <button class="btn-direct-download mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-2xl flex items-center gap-1.5 shadow-lg" data-url="${state.lightboxMedia}" data-filename="photo.jpg"><span class="mdi mdi-download"></span> Save Direct to Device</button>
    </div>
  </div>`;
}

// ============================================================
// WEBRTC AUDIO CALL ENGINE (Full Voice Transmission & ICE)
// ============================================================
const rtcConfig = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
    { urls: 'stun:stun2.l.google.com:19302' },
    { urls: 'stun:stun3.l.google.com:19302' },
    { urls: 'stun:stun4.l.google.com:19302' },
    { urls: 'stun:stun.services.mozilla.com' },
    { urls: 'stun:stun.relay.metered.ca:80' }
  ],
  iceCandidatePoolSize: 10
};

const processedIceCandidates = new Set();

async function startVoiceCall(chatId, receiverId) {
  processedIceCandidates.clear();
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true
      },
      video: false
    }).catch(err => {
      console.warn('Microphone error:', err);
      return null;
    });

    state.localStream = stream;
    state.peerConnection = new RTCPeerConnection(rtcConfig);

    // Add audio transceiver for bidirectional routing
    try {
      state.peerConnection.addTransceiver('audio', { direction: 'sendrecv' });
    } catch (e) {}

    if (stream) {
      stream.getTracks().forEach(track => state.peerConnection.addTrack(track, stream));
    }

    state.peerConnection.ontrack = (event) => {
      console.log('[WebRTC] Remote audio stream received:', event.streams[0]);
      const audioEl = document.getElementById('remote-audio');
      if (audioEl && event.streams[0]) {
        audioEl.muted = false;
        audioEl.volume = 1.0;
        audioEl.srcObject = event.streams[0];
        audioEl.play().catch(e => console.warn('Audio autoplay gesture required:', e));
      }
    };

    state.peerConnection.onicecandidate = (event) => {
      if (event.candidate && state.activeCall?.id) {
        API.request(`/calls/ice-candidate/${state.activeCall.id}`, {
          method: 'POST',
          body: JSON.stringify({ candidate: event.candidate })
        }).catch(() => {});
      }
    };

    const offer = await state.peerConnection.createOffer({
      offerToReceiveAudio: true,
      voiceActivityDetection: true
    });
    await state.peerConnection.setLocalDescription(offer);

    const data = await API.request('/calls/initiate', {
      method: 'POST',
      body: JSON.stringify({ chatId, receiverId, sdpOffer: offer })
    });

    state.activeCall = data.call;
    renderCallOverlay();
    startCallPolling();
    showToast('Calling... 📞', 'info');
  } catch (err) {
    showToast('Could not start call', 'error');
  }
}

async function answerVoiceCall() {
  if (!state.activeCall) return;
  processedIceCandidates.clear();
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true
      },
      video: false
    }).catch(err => {
      console.warn('Microphone error:', err);
      return null;
    });

    state.localStream = stream;
    state.peerConnection = new RTCPeerConnection(rtcConfig);

    try {
      state.peerConnection.addTransceiver('audio', { direction: 'sendrecv' });
    } catch (e) {}

    if (stream) {
      stream.getTracks().forEach(track => state.peerConnection.addTrack(track, stream));
    }

    state.peerConnection.ontrack = (event) => {
      console.log('[WebRTC] Remote audio stream received:', event.streams[0]);
      const audioEl = document.getElementById('remote-audio');
      if (audioEl && event.streams[0]) {
        audioEl.muted = false;
        audioEl.volume = 1.0;
        audioEl.srcObject = event.streams[0];
        audioEl.play().catch(e => console.warn('Audio autoplay gesture required:', e));
      }
    };

    state.peerConnection.onicecandidate = (event) => {
      if (event.candidate && state.activeCall?.id) {
        API.request(`/calls/ice-candidate/${state.activeCall.id}`, {
          method: 'POST',
          body: JSON.stringify({ candidate: event.candidate })
        }).catch(() => {});
      }
    };

    if (state.activeCall.sdp_offer) {
      await state.peerConnection.setRemoteDescription(new RTCSessionDescription(state.activeCall.sdp_offer));
    }

    const answer = await state.peerConnection.createAnswer({
      offerToReceiveAudio: true
    });
    await state.peerConnection.setLocalDescription(answer);

    const data = await API.request(`/calls/answer/${state.activeCall.id}`, {
      method: 'POST',
      body: JSON.stringify({ sdpAnswer: answer })
    });

    state.activeCall = data.call;
    stopRingtoneSound();
    startCallTimer();
    renderCallOverlay();
    startCallPolling();
    showToast('Call connected! 🎙️', 'success');
  } catch (err) {
    showToast('Failed to answer call', 'error');
  }
}

async function endVoiceCall() {
  if (state.activeCall) {
    API.request(`/calls/end/${state.activeCall.id}`, { method: 'POST' }).catch(() => {});
  }
  cleanupCallState();
}

function cleanupCallState() {
  stopRingtoneSound();
  if (state.localStream) {
    state.localStream.getTracks().forEach(t => t.stop());
    state.localStream = null;
  }
  if (state.peerConnection) {
    state.peerConnection.close();
    state.peerConnection = null;
  }
  const audioEl = document.getElementById('remote-audio');
  if (audioEl) {
    audioEl.srcObject = null;
  }
  processedIceCandidates.clear();
  clearInterval(state.callTimerInterval);
  clearInterval(state.callPollInterval);
  state.callTimerInterval = null;
  state.callPollInterval = null;
  state.activeCall = null;
  state.callDuration = 0;
  state.isMuted = false;
  renderCallOverlay();
}

function startCallTimer() {
  clearInterval(state.callTimerInterval);
  state.callDuration = 0;
  state.callTimerInterval = setInterval(() => {
    state.callDuration++;
    const timerEl = document.getElementById('call-timer-text');
    if (timerEl) {
      const minutes = Math.floor(state.callDuration / 60).toString().padStart(2, '0');
      const seconds = (state.callDuration % 60).toString().padStart(2, '0');
      timerEl.innerText = `${minutes}:${seconds}`;
    }
  }, 1000);
}

// Rapid 1.2s Call State & ICE Candidate Poller
function startCallPolling() {
  clearInterval(state.callPollInterval);
  state.callPollInterval = setInterval(async () => {
    if (!state.activeCall) return;
    try {
      const [statusRes, iceRes] = await Promise.all([
        API.request(`/calls/status/${state.activeCall.chat_id}`).catch(() => ({})),
        API.request(`/calls/ice-candidates/${state.activeCall.id}`).catch(() => ({ candidates: [] }))
      ]);

      const serverCall = statusRes.activeCall;

      if (!serverCall || serverCall.status === 'ended' || serverCall.status === 'rejected') {
        showToast('Call ended', 'info');
        cleanupCallState();
        return;
      }

      // If transition from 'ringing' to 'accepted'
      if (state.activeCall.status === 'ringing' && serverCall.status === 'accepted') {
        state.activeCall = serverCall;
        stopRingtoneSound();
        if (serverCall.caller_id === state.user?.id && serverCall.sdp_answer) {
          if (state.peerConnection && state.peerConnection.signalingState !== 'stable') {
            await state.peerConnection.setRemoteDescription(new RTCSessionDescription(serverCall.sdp_answer)).catch(() => {});
          }
        }
        startCallTimer();
        renderCallOverlay();
        showToast('Call connected! 🎙️', 'success');
      }

      // Ingest remote ICE candidates
      if (iceRes.candidates && state.peerConnection && state.peerConnection.remoteDescription) {
        for (const cand of iceRes.candidates) {
          const candKey = JSON.stringify(cand);
          if (!processedIceCandidates.has(candKey)) {
            processedIceCandidates.add(candKey);
            try {
              await state.peerConnection.addIceCandidate(new RTCIceCandidate(cand));
            } catch (err) {}
          }
        }
      }
    } catch (e) {}
  }, 1200);
}

// ============================================================
// DATA SYNC & EVENT LISTENERS
// ============================================================
async function loadInitialData() {
  if (!state.token) return;
  try {
    const [meData, chatsData, aliasesData, blocksData] = await Promise.all([
      API.request('/auth/me').catch(() => ({})),
      API.request('/chats').catch(() => ({ chats: [] })),
      API.request('/aliases').catch(() => ({ aliases: {} })),
      API.request('/blocks').catch(() => ({ blockedUsers: [] }))
    ]);

    if (meData.user) {
      state.user = meData.user;
      localStorage.setItem('logsapp_user', JSON.stringify(meData.user));
    }
    state.chats = chatsData.chats || [];
    state.aliases = aliasesData.aliases || {};
    state.blockedUserIds = new Set((blocksData.blockedUsers || []).map(b => b.blocked_id));

    // Default to self chat if no active chat selected
    if (!state.activeChatId && state.chats.length > 0) {
      const selfChat = state.chats.find(c => c.is_self);
      if (selfChat) {
        state.activeChatId = selfChat.id;
        localStorage.setItem('logsapp_active_chat_id', selfChat.id);
      }
    }

    if (state.activeChatId) {
      await loadMessages(state.activeChatId);
    }
  } catch (e) {
    console.error('Initial data sync error:', e);
  }
}

async function loadChats() {
  if (!state.token) return;
  try {
    const data = await API.request('/chats');
    state.chats = data.chats || [];
  } catch (e) {}
}

async function loadMessages(chatId) {
  if (!chatId || !state.token) return;
  try {
    const data = await API.request(`/messages/${chatId}`);
    state.activeMessages = data.messages || [];
    API.request(`/chats/${chatId}/read`, { method: 'POST' }).catch(() => {});
    const chat = state.chats.find(c => c.id === chatId);
    if (chat) chat.unread_count = 0;
  } catch (e) {}
}

function bindMainEvents() {
  // Theme Toggle
  document.getElementById('btn-toggle-theme')?.addEventListener('click', () => {
    state.isDark = !state.isDark;
    localStorage.setItem('logsapp_theme', state.isDark ? 'dark' : 'light');
    render();
  });

  // Profile
  document.getElementById('btn-open-profile')?.addEventListener('click', () => { state.showProfile = true; render(); });
  document.getElementById('btn-close-profile')?.addEventListener('click', () => { state.showProfile = false; render(); });
  document.getElementById('btn-profile-done')?.addEventListener('click', () => { state.showProfile = false; render(); });

  document.getElementById('edit-profile-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const displayName = document.getElementById('edit-profile-name').value.trim();
    const newPassword = document.getElementById('edit-profile-pass').value;

    if (!displayName) {
      showToast('Display Name cannot be empty', 'error');
      return;
    }

    const payload = { display_name: displayName };
    if (newPassword) {
      if (newPassword.length < 6) {
        showToast('Password must be at least 6 characters', 'error');
        return;
      }
      payload.new_password = newPassword;
    }

    try {
      const res = await API.request('/auth/me', { method: 'PUT', body: JSON.stringify(payload) });
      state.user = res.user;
      localStorage.setItem('logsapp_user', JSON.stringify(res.user));
      showToast('Name & profile updated successfully! 🎉', 'success');
      await loadChats();
      render();
    } catch (err) {
      showToast(err.message || 'Failed to update profile', 'error');
    }
  });

  // Admin Dashboard
  document.getElementById('btn-open-admin')?.addEventListener('click', async () => {
    state.showAdminModal = true;
    state.adminTab = 'overview';
    render();
    try {
      const [statsData, reportsData, usersData] = await Promise.all([
        API.request('/admin/stats'),
        API.request('/admin/reports'),
        API.request('/admin/users')
      ]);
      state.adminStats = statsData.stats;
      state.adminReports = reportsData.reports || [];
      state.adminUsers = usersData.users || [];
      render();
    } catch (e) {
      showToast('Admin access denied', 'error');
    }
  });

  document.getElementById('btn-close-admin')?.addEventListener('click', () => { state.showAdminModal = false; render(); });
  document.querySelectorAll('.admin-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.adminTab = btn.getAttribute('data-tab');
      render();
    });
  });

  // Admin Actions
  document.querySelectorAll('.btn-admin-resolve-report').forEach(btn => {
    btn.addEventListener('click', async () => {
      const reportId = btn.getAttribute('data-report-id');
      try {
        await API.request(`/admin/reports/${reportId}/resolve`, { method: 'PUT', body: JSON.stringify({ status: 'resolved' }) });
        state.adminReports = state.adminReports.filter(r => r.id !== reportId);
        render();
        showToast('Report marked as resolved!', 'success');
      } catch (e) {
        showToast('Failed to resolve report', 'error');
      }
    });
  });

  document.querySelectorAll('.btn-admin-block-user').forEach(btn => {
    btn.addEventListener('click', async () => {
      const userId = btn.getAttribute('data-user-id');
      try {
        await API.request(`/admin/users/${userId}`, { method: 'PUT', body: JSON.stringify({ is_blocked: true }) });
        showToast('User suspended by Admin!', 'success');
      } catch (e) {
        showToast('Failed to suspend user', 'error');
      }
    });
  });

  document.querySelectorAll('.btn-admin-toggle-block').forEach(btn => {
    btn.addEventListener('click', async () => {
      const userId = btn.getAttribute('data-user-id');
      const isCurrentlyBlocked = btn.getAttribute('data-blocked') === 'true';
      try {
        await API.request(`/admin/users/${userId}`, { method: 'PUT', body: JSON.stringify({ is_blocked: !isCurrentlyBlocked }) });
        const usersData = await API.request('/admin/users');
        state.adminUsers = usersData.users || [];
        render();
        showToast(`User ${isCurrentlyBlocked ? 'unblocked' : 'blocked'}!`, 'success');
      } catch (e) {
        showToast('Operation failed', 'error');
      }
    });
  });

  document.querySelectorAll('.btn-admin-delete-user').forEach(btn => {
    btn.addEventListener('click', async () => {
      if (!confirm('Are you sure you want to permanently delete this user account?')) return;
      const userId = btn.getAttribute('data-user-id');
      try {
        await API.request(`/admin/users/${userId}`, { method: 'DELETE' });
        state.adminUsers = state.adminUsers.filter(u => u.id !== userId);
        render();
        showToast('User account deleted', 'success');
      } catch (e) {
        showToast('Failed to delete user', 'error');
      }
    });
  });

  document.querySelectorAll('.btn-admin-msg').forEach(btn => {
    btn.addEventListener('click', async () => {
      const userId = btn.getAttribute('data-user-id');
      const msg = prompt('Enter administrative broadcast message:');
      if (!msg) return;
      try {
        await API.request(`/admin/message/${userId}`, { method: 'POST', body: JSON.stringify({ content: msg }) });
        showToast('Administrative notice sent!', 'success');
      } catch (e) {
        showToast('Failed to send notice', 'error');
      }
    });
  });

  // Modals Toggles
  document.getElementById('btn-open-cli')?.addEventListener('click', () => { state.showCLIModal = true; render(); });
  document.getElementById('btn-close-cli')?.addEventListener('click', () => { state.showCLIModal = false; render(); });
  document.getElementById('btn-cli-done')?.addEventListener('click', () => { state.showCLIModal = false; render(); });

  document.getElementById('btn-open-storage')?.addEventListener('click', () => { state.showStorageModal = true; render(); });
  document.getElementById('btn-close-storage')?.addEventListener('click', () => { state.showStorageModal = false; render(); });
  document.getElementById('btn-storage-done')?.addEventListener('click', () => { state.showStorageModal = false; render(); });

  document.getElementById('btn-open-group')?.addEventListener('click', () => { state.showGroupModal = true; render(); });
  document.getElementById('btn-close-group')?.addEventListener('click', () => { state.showGroupModal = false; render(); });

  document.getElementById('btn-toggle-avatar-grid')?.addEventListener('click', () => {
    state.showAvatarGrid = !state.showAvatarGrid;
    render();
  });

  // Chat Menu Dropdown Toggle
  document.getElementById('btn-toggle-chat-menu')?.addEventListener('click', () => {
    state.showChatMenu = !state.showChatMenu;
    render();
  });

  // Report User
  document.getElementById('menu-report-user')?.addEventListener('click', () => {
    state.showChatMenu = false;
    const activeChat = state.chats.find(c => c.id === state.activeChatId);
    const other = !activeChat?.is_group && !activeChat?.is_self && activeChat?.other_participants ? activeChat.other_participants[0] : null;
    if (other) {
      state.showReportModal = other;
      render();
    }
  });

  document.getElementById('btn-close-report')?.addEventListener('click', () => { state.showReportModal = null; render(); });
  document.getElementById('report-user-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const reason = document.getElementById('report-reason').value;
    const description = document.getElementById('report-desc').value;
    try {
      await API.request('/reports', {
        method: 'POST',
        body: JSON.stringify({
          reportedUserId: state.showReportModal.id,
          chatId: state.activeChatId,
          reason,
          description
        })
      });
      state.showReportModal = null;
      render();
      showToast('Report and chat snapshot submitted to Admin! 🛡️', 'success');
    } catch (err) {
      showToast('Failed to submit report', 'error');
    }
  });

  // Block / Unblock User
  document.getElementById('menu-toggle-block')?.addEventListener('click', async () => {
    state.showChatMenu = false;
    const activeChat = state.chats.find(c => c.id === state.activeChatId);
    const other = !activeChat?.is_group && !activeChat?.is_self && activeChat?.other_participants ? activeChat.other_participants[0] : null;
    if (!other) return;

    const isBlocked = state.blockedUserIds.has(other.id);
    try {
      if (isBlocked) {
        await API.request(`/blocks/${other.id}`, { method: 'DELETE' });
        state.blockedUserIds.delete(other.id);
        showToast(`Unblocked @${other.username}`, 'success');
      } else {
        await API.request(`/blocks/${other.id}`, { method: 'POST' });
        state.blockedUserIds.add(other.id);
        showToast(`Blocked @${other.username}`, 'success');
      }
      render();
    } catch (e) {
      showToast('Block operation failed', 'error');
    }
  });

  // Edit Custom Nickname (Alias)
  document.getElementById('menu-set-alias')?.addEventListener('click', () => {
    state.showChatMenu = false;
    const activeChat = state.chats.find(c => c.id === state.activeChatId);
    const other = !activeChat?.is_group && !activeChat?.is_self && activeChat?.other_participants ? activeChat.other_participants[0] : null;
    if (other) {
      state.showAliasModal = other;
      render();
    }
  });

  document.getElementById('btn-close-alias')?.addEventListener('click', () => { state.showAliasModal = null; render(); });
  document.getElementById('alias-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const aliasName = document.getElementById('alias-input').value.trim();
    const contactId = state.showAliasModal?.id;
    if (!contactId) return;

    try {
      await API.request('/aliases', { method: 'POST', body: JSON.stringify({ contactId, aliasName }) });
      if (aliasName) {
        state.aliases[contactId] = aliasName;
      } else {
        delete state.aliases[contactId];
      }
      state.showAliasModal = null;
      render();
      showToast('Nickname updated in your perspective!', 'success');
    } catch (err) {
      showToast('Failed to update nickname', 'error');
    }
  });

  document.getElementById('btn-delete-alias')?.addEventListener('click', async () => {
    const contactId = state.showAliasModal?.id;
    if (!contactId) return;
    try {
      await API.request('/aliases', { method: 'POST', body: JSON.stringify({ contactId, aliasName: '' }) });
      delete state.aliases[contactId];
      state.showAliasModal = null;
      render();
      showToast('Nickname reset', 'info');
    } catch (e) {}
  });

  // Clear Chat History
  document.getElementById('menu-clear-chat')?.addEventListener('click', async () => {
    state.showChatMenu = false;
    if (!confirm('Clear all chat messages for yourself in this conversation?')) return;
    try {
      await API.request(`/messages/clear/${state.activeChatId}`, { method: 'POST' });
      state.activeMessages = [];
      render();
      showToast('Chat history cleared', 'success');
    } catch (e) {
      showToast('Failed to clear chat', 'error');
    }
  });

  // Start Voice Call
  document.getElementById('btn-start-call')?.addEventListener('click', () => {
    const activeChat = state.chats.find(c => c.id === state.activeChatId);
    const other = !activeChat?.is_group && !activeChat?.is_self && activeChat?.other_participants ? activeChat.other_participants[0] : null;
    if (other) {
      startVoiceCall(state.activeChatId, other.id);
    }
  });

  // Direct File Download Buttons
  document.querySelectorAll('.btn-direct-download').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const url = btn.getAttribute('data-url');
      const filename = btn.getAttribute('data-filename');
      if (url) downloadFileDirect(url, filename);
    });
  });

  // Forward Message
  document.querySelectorAll('.btn-msg-forward').forEach(btn => {
    btn.addEventListener('click', () => {
      const msgId = btn.getAttribute('data-msg-id');
      const msg = state.activeMessages.find(m => m.id === msgId);
      if (msg) {
        state.showForwardModal = msg;
        render();
      }
    });
  });

  document.getElementById('btn-close-forward')?.addEventListener('click', () => { state.showForwardModal = null; render(); });
  document.querySelectorAll('.forward-target-item').forEach(item => {
    item.addEventListener('click', async () => {
      const targetChatId = item.getAttribute('data-chat-id');
      const msgId = state.showForwardModal?.id;
      if (!msgId || !targetChatId) return;

      try {
        await API.request(`/messages/${msgId}/forward`, {
          method: 'POST',
          body: JSON.stringify({ targetChatIds: [targetChatId] })
        });
        state.showForwardModal = null;
        render();
        showToast('Message forwarded!', 'success');
        await loadChats();
      } catch (e) {
        showToast('Failed to forward message', 'error');
      }
    });
  });

  // Delete Message for Everyone
  document.querySelectorAll('.btn-msg-delete').forEach(btn => {
    btn.addEventListener('click', async () => {
      if (!confirm('Delete this message for everyone?')) return;
      const msgId = btn.getAttribute('data-msg-id');
      try {
        await API.request(`/messages/${msgId}`, { method: 'DELETE' });
        const target = state.activeMessages.find(m => m.id === msgId);
        if (target) {
          target.is_deleted = true;
          target.content = '🚫 This message was deleted';
        }
        render();
        showToast('Message deleted', 'info');
      } catch (e) {
        showToast('Failed to delete message', 'error');
      }
    });
  });

  // Lightbox
  document.getElementById('lightbox-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'lightbox-modal' || e.target.closest('#btn-close-lightbox')) {
      state.lightboxMedia = null;
      render();
    }
  });

  document.querySelectorAll('[data-lightbox]').forEach(el => {
    el.addEventListener('click', () => {
      state.lightboxMedia = el.getAttribute('data-lightbox');
      render();
    });
  });

  // Search Tabs & Search Engine
  document.getElementById('tab-search-users')?.addEventListener('click', () => {
    state.searchTab = 'users';
    state.searchResults = [];
    render();
  });

  document.getElementById('tab-search-groups')?.addEventListener('click', async () => {
    state.searchTab = 'groups';
    render();
    try {
      const res = await API.request('/chats/search/groups');
      state.groupSearchResults = res.groups || [];
      render();
    } catch (e) {}
  });

  let searchTimer = null;
  const searchInput = document.getElementById('search-input');
  searchInput?.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    clearTimeout(searchTimer);
    if (!state.searchQuery.trim()) {
      state.searchResults = [];
      state.groupSearchResults = [];
      render();
      return;
    }
    searchTimer = setTimeout(async () => {
      try {
        if (state.searchTab === 'users') {
          const data = await API.request(`/auth/search?q=${encodeURIComponent(state.searchQuery)}`);
          state.searchResults = data.users || [];
        } else {
          const data = await API.request(`/chats/search/groups?q=${encodeURIComponent(state.searchQuery)}`);
          state.groupSearchResults = data.groups || [];
        }
        render();
      } catch (err) {}
    }, 200);
  });

  document.getElementById('btn-clear-search')?.addEventListener('click', () => {
    state.searchQuery = '';
    state.searchResults = [];
    state.groupSearchResults = [];
    render();
  });

  document.querySelectorAll('.search-user-item').forEach(item => {
    item.addEventListener('click', async () => {
      const targetUserId = item.getAttribute('data-user-id');
      try {
        const data = await API.request('/chats/direct', { method: 'POST', body: JSON.stringify({ targetUserId }) });
        state.searchQuery = '';
        state.searchResults = [];
        state.activeChatId = data.chatId;
        localStorage.setItem('logsapp_active_chat_id', data.chatId);
        state.mobileView = 'chat';
        await loadChats();
        await loadMessages(data.chatId);
        render();
      } catch (err) {
        showToast(err.message || 'Failed to start chat', 'error');
      }
    });
  });

  document.querySelectorAll('.search-group-item').forEach(item => {
    item.addEventListener('click', async () => {
      const groupId = item.getAttribute('data-group-id');
      try {
        const data = await API.request(`/chats/group/join/${groupId}`, { method: 'POST' });
        state.searchQuery = '';
        state.groupSearchResults = [];
        state.activeChatId = groupId;
        localStorage.setItem('logsapp_active_chat_id', groupId);
        state.mobileView = 'chat';
        await loadChats();
        await loadMessages(groupId);
        render();
        showToast(data.message || 'Joined group!', 'success');
      } catch (err) {
        showToast(err.message || 'Failed to join group', 'error');
      }
    });
  });

  document.querySelectorAll('.chat-list-item').forEach(item => {
    item.addEventListener('click', async () => {
      const chatId = item.getAttribute('data-chat-id');
      state.activeChatId = chatId;
      localStorage.setItem('logsapp_active_chat_id', chatId);
      state.mobileView = 'chat';
      await loadMessages(chatId);
      render();
      const container = document.getElementById('messages-container');
      if (container) container.scrollTop = container.scrollHeight;
    });
  });

  document.getElementById('btn-chat-back')?.addEventListener('click', () => {
    state.mobileView = 'sidebar';
    render();
  });

  // Message Send
  const chatForm = document.getElementById('chat-input-form');
  const chatInput = document.getElementById('chat-message-input');
  chatForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const content = chatInput.value.trim();
    if (!content || !state.activeChatId) return;
    chatInput.value = '';

    try {
      const res = await API.request(`/messages/${state.activeChatId}`, {
        method: 'POST',
        body: JSON.stringify({ content })
      });
      state.activeMessages.push(res.message);
      render();
      const container = document.getElementById('messages-container');
      if (container) container.scrollTop = container.scrollHeight;
      await loadChats();
    } catch (err) {
      showToast(err.message || 'Failed to send message', 'error');
    }
  });

  // File Upload (1GB)
  const fileInput = document.getElementById('file-upload-input');
  document.getElementById('btn-attach-file')?.addEventListener('click', () => fileInput?.click());
  fileInput?.addEventListener('change', async (e) => {
    const file = e.target.files?.[0];
    if (!file || !state.activeChatId) return;

    if (file.size > 1024 * 1024 * 1024) {
      showToast('File size exceeds 1GB limit', 'error');
      return;
    }

    showToast(`Uploading ${file.name} (up to 1GB)...`, 'info');
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await API.request(`/files/upload/${state.activeChatId}`, { method: 'POST', body: formData });
      state.activeMessages.push(res.message);
      render();
      showToast(`File uploaded! QuickCode: ${res.message.quick_code}`, 'success');
      await loadChats();
    } catch (err) {
      showToast('Upload failed', 'error');
    }
  });

  // Create Group
  document.getElementById('create-group-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('group-name-input').value.trim();
    const description = document.getElementById('group-desc-input').value.trim();
    const isPublic = (document.querySelector('input[name="group-privacy"]:checked')?.value || 'private') === 'public';

    if (!name) return;
    try {
      const res = await API.request('/chats/group', {
        method: 'POST',
        body: JSON.stringify({ name, description, is_public: isPublic, member_ids: [] })
      });
      state.showGroupModal = false;
      state.activeChatId = res.group.id;
      localStorage.setItem('logsapp_active_chat_id', res.group.id);
      state.mobileView = 'chat';
      await loadChats();
      await loadMessages(res.group.id);
      render();
      showToast(`Group "${name}" (#GRP-${res.group.group_royal_id}) created!`, 'success');
    } catch (err) {
      showToast('Failed to create group', 'error');
    }
  });

  // Notification Permission Toggle
  document.getElementById('btn-toggle-notif')?.addEventListener('click', async () => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      showToast('Notifications not supported by this browser', 'info');
      return;
    }
    if (Notification.permission === 'granted') {
      showToast('Desktop Notifications are already active! 🔔', 'info');
      return;
    }
    try {
      const perm = await Notification.requestPermission();
      if (perm === 'granted') {
        showToast('Desktop Notifications enabled! 🎉', 'success');
        try {
          new Notification('LogsApp Notifications Enabled', {
            body: 'You will receive new message and 1GB file notifications.',
            icon: getUserAvatar(state.user)
          });
        } catch (e) {}
        render();
      }
    } catch (e) {}
  });

  // Avatar Selection & Shuffle
  document.querySelectorAll('.avatar-option-item').forEach(item => {
    item.addEventListener('click', async () => {
      const selectedUrl = item.getAttribute('data-url');
      if (!selectedUrl) return;
      try {
        await API.request('/auth/me', { method: 'PUT', body: JSON.stringify({ avatar_url: selectedUrl }) });
        state.user.avatar_url = selectedUrl;
        localStorage.setItem('logsapp_user', JSON.stringify(state.user));
        render();
        showToast('Anime Avatar saved to account!', 'success');
      } catch (e) {
        showToast('Failed to update avatar', 'error');
      }
    });
  });

  document.getElementById('btn-shuffle-avatar')?.addEventListener('click', async () => {
    const randomAnime = ANIME_AVATARS[Math.floor(Math.random() * ANIME_AVATARS.length)];
    try {
      await API.request('/auth/me', { method: 'PUT', body: JSON.stringify({ avatar_url: randomAnime.url }) });
      state.user.avatar_url = randomAnime.url;
      localStorage.setItem('logsapp_user', JSON.stringify(state.user));
      render();
      showToast(`Avatar updated to ${randomAnime.name}!`, 'success');
    } catch (e) {}
  });

  document.getElementById('btn-copy-royal-id')?.addEventListener('click', () => {
    if (state.user?.royal_id) {
      navigator.clipboard.writeText(state.user.royal_id);
      showToast(`Royal ID #${state.user.royal_id} copied!`, 'success');
    }
  });

  document.querySelectorAll('.btn-copy-text').forEach(btn => {
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(btn.getAttribute('data-copy') || '');
      showToast('Copied to clipboard!', 'success');
    });
  });

  document.getElementById('btn-logout')?.addEventListener('click', () => {
    localStorage.clear();
    state.user = null;
    state.token = null;
    state.activeChatId = null;
    state.showProfile = false;
    render();
  });
}

// Global 2.5s Sync Polling (Messages + Global Incoming Call Check)
setInterval(async () => {
  if (!state.token) return;

  // 1. Check for any global incoming call across all chats
  try {
    const callRes = await API.request('/calls/incoming').catch(() => ({}));
    if (callRes.activeCall) {
      if (!state.activeCall) {
        state.activeCall = callRes.activeCall;
        renderCallOverlay();
        startCallPolling();
      }
    } else if (state.activeCall && state.activeCall.status === 'ringing') {
      cleanupCallState();
    }
  } catch (e) {}

  // 2. Sync Messages for active chat
  if (state.activeChatId) {
    try {
      const msgsData = await API.request(`/messages/${state.activeChatId}`).catch(() => ({}));
      const incoming = msgsData.messages || [];
      if (incoming.length !== state.activeMessages.length) {
        const newMsgs = incoming.slice(state.activeMessages.length);
        state.activeMessages = incoming;
        render();
        const container = document.getElementById('messages-container');
        if (container) container.scrollTop = container.scrollHeight;

        // Desktop Notification for new messages
        if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
          newMsgs.forEach(msg => {
            if (msg.sender_id !== state.user?.id) {
              try {
                const notif = new Notification(msg.sender_display_name || 'LogsApp Contact', {
                  body: msg.message_type !== 'text' ? `📎 Sent a ${msg.message_type}: ${msg.file_name || ''}` : msg.content,
                  icon: msg.sender_avatar_url || 'https://api.dicebear.com/7.x/adventurer/svg?seed=LogsApp'
                });
                notif.onclick = () => { window.focus(); notif.close(); };
              } catch (e) {}
            }
          });
        }
        await loadChats();
      }
    } catch (e) {}
  }
}, 2500);

// App Initialization
(async function init() {
  if (state.token) {
    await loadInitialData();
  }

  // Smoothly auto-request notification permissions on initial launch
  if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'default') {
    setTimeout(() => {
      Notification.requestPermission().catch(() => {});
    }, 1500);
  }

  render();
})();
