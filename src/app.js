// ============================================================
// LogsApp — Web Chat (Anime Avatars & Unread Glow System)
// ============================================================

// Brand Logo SVG (2 People Chatting / Connecting)
export const LOGO_SVG = `
<div class="relative flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600 shadow-md p-1.5 shrink-0">
  <svg viewBox="0 0 32 32" fill="none" class="w-full h-full">
    <circle cx="11" cy="11" r="4" fill="white" />
    <path d="M4 23C4 19.6863 7.13401 17 11 17C14.866 17 18 19.6863 18 23" fill="white" fill-opacity="0.95" />
    <circle cx="21" cy="13" r="3.5" fill="#f59e0b" />
    <path d="M15 25C15 22.2386 17.6863 20 21 20C24.3137 20 27 22.2386 27 25" fill="#f59e0b" fill-opacity="0.95" />
  </svg>
</div>`;

// Curated Anime Avatars (Solo Leveling, Naruto, Jujutsu Kaisen, Bleach, One Piece, AOT, Demon Slayer)
export const ANIME_AVATARS = [
  // Solo Leveling
  { name: 'Sung Jin-Woo (Shadow Monarch)', anime: 'Solo Leveling', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=SungJinwoo&hair=short04&hairColor=0e1111&eyes=variant08&glasses=variant02' },
  { name: 'Cha Hae-In (Sword Dancer)', anime: 'Solo Leveling', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=ChaHaeIn&hair=long01&hairColor=ffd700&eyes=variant04' },
  { name: 'Igris Commander', anime: 'Solo Leveling', url: 'https://api.dicebear.com/7.x/bottts/svg?seed=IgrisBlood&colors=red,crimson' },
  { name: 'Beru (Ant King)', anime: 'Solo Leveling', url: 'https://api.dicebear.com/7.x/bottts/svg?seed=BeruShadow&colors=indigo,purple' },

  // Naruto
  { name: 'Madara Uchiha (Eternal Mangekyo)', anime: 'Naruto', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=MadaraUchiha&hair=long04&hairColor=0e1111&eyes=variant09' },
  { name: 'Itachi Uchiha (Crow Genjutsu)', anime: 'Naruto', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=ItachiUchiha&hair=long02&hairColor=1a1a1a&eyes=variant02' },
  { name: 'Sasuke Uchiha (Rinnegan)', anime: 'Naruto', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=SasukeUchiha&hair=short03&hairColor=111111&eyes=variant06' },
  { name: 'Naruto Uzumaki (Sage Mode)', anime: 'Naruto', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=NarutoUzumaki&hair=short01&hairColor=ffd700&eyes=variant03' },
  { name: 'Kakashi Hatake (Copy Ninja)', anime: 'Naruto', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=KakashiHatake&hair=short02&hairColor=cccccc' },
  { name: 'Minato Namikaze (Yellow Flash)', anime: 'Naruto', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=MinatoNamikaze&hair=short05&hairColor=ffd700&eyes=variant01' },

  // Jujutsu Kaisen
  { name: 'Gojo Satoru (Six Eyes)', anime: 'Jujutsu Kaisen', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=GojoSatoru&hair=short02&hairColor=ffffff&glasses=variant05' },
  { name: 'Ryomen Sukuna (King of Curses)', anime: 'Jujutsu Kaisen', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=RyomenSukuna&hair=short01&hairColor=ff69b4&eyes=variant12' },
  { name: 'Megumi Fushiguro (Shadows)', anime: 'Jujutsu Kaisen', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=MegumiFushiguro&hair=short06&hairColor=000033' },
  { name: 'Yuta Okkotsu (Special Grade)', anime: 'Jujutsu Kaisen', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=YutaOkkotsu&hair=short04&hairColor=111111' },

  // Bleach
  { name: 'Ichigo Kurosaki (Bankai)', anime: 'Bleach', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=IchigoKurosaki&hair=short01&hairColor=ff8c00&eyes=variant05' },
  { name: 'Sosuke Aizen (Kyoka Suigetsu)', anime: 'Bleach', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=SosukeAizen&hair=short02&hairColor=4a2e18' },
  { name: 'Kenpachi Zaraki (Squad 11)', anime: 'Bleach', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=KenpachiZaraki&hair=short08&hairColor=0e1111&eyes=variant14' },

  // One Piece & Attack on Titan & Demon Slayer
  { name: 'Roronoa Zoro (King of Hell)', anime: 'One Piece', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=RoronoaZoro&hair=short03&hairColor=00aa44&eyes=variant07' },
  { name: 'Monkey D. Luffy (Gear 5)', anime: 'One Piece', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=LuffyGear5&hair=short05&hairColor=ffffff&eyes=variant04' },
  { name: 'Levi Ackerman (Humanity\'s Strongest)', anime: 'Attack on Titan', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=LeviAckerman&hair=short01&hairColor=111111&eyes=variant02' },
  { name: 'Eren Yeager (Attack Titan)', anime: 'Attack on Titan', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=ErenYeager&hair=long03&hairColor=2d1a0e&eyes=variant10' },
  { name: 'Tanjiro Kamado (Sun Breathing)', anime: 'Demon Slayer', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=TanjiroKamado&hair=short04&hairColor=8b0000&eyes=variant06' },
  { name: 'Giyu Tomioka (Water Hashira)', anime: 'Demon Slayer', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=GiyuTomioka&hair=long02&hairColor=000033&eyes=variant02' }
];

export function getRandomAnimeAvatar() {
  const index = Math.floor(Math.random() * ANIME_AVATARS.length);
  return ANIME_AVATARS[index];
}

// Sound Engine
class SoundEngine {
  constructor() {
    this.enabled = localStorage.getItem('logsapp_sound') !== 'false';
    this.ctx = null;
  }
  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
  }
  playSent() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch (e) {}
  }
  playReceived() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1174.66, this.ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch (e) {}
  }
}
const sounds = new SoundEngine();

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
  activeChatId: null,
  activeMessages: [],
  mobileView: 'sidebar',
  searchResults: [],
  searchQuery: '',
  showProfile: false,
  showGroupModal: false,
  showStorageModal: false,
  showCLIModal: false,
  showServerConfig: false,
  showAvatarGrid: false
};

// Toast Notifications
function showToast(msg, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  const colors = {
    info: 'bg-slate-900 border-blue-500/40 text-blue-300',
    success: 'bg-slate-900 border-emerald-500/40 text-emerald-300',
    error: 'bg-slate-900 border-red-500/40 text-red-300'
  };
  toast.className = `p-3 px-4 rounded-xl border text-xs font-semibold shadow-xl flex items-center gap-2 pointer-events-auto transition-all transform translate-y-2 opacity-0 ${colors[type] || colors.info}`;
  toast.innerHTML = `<span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.classList.remove('translate-y-2', 'opacity-0'), 10);
  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Master Render
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
    return;
  }

  root.innerHTML = `
    <div class="h-screen w-screen flex overflow-hidden ${state.isDark ? 'bg-[#0b0f19] text-[#f8fafc]' : 'bg-[#f8fafc] text-[#0f172a]'}">
      <!-- Sidebar -->
      <div class="h-full ${state.mobileView === 'sidebar' ? 'w-full md:w-[380px] lg:w-[420px] block' : 'hidden md:block'} border-r ${state.isDark ? 'border-[#1e293b] bg-[#0b0f19]' : 'border-[#e2e8f0] bg-white'} shrink-0 flex flex-col">
        ${renderSidebarHeader()}
        ${renderSearchBar()}
        ${renderChatList()}
      </div>

      <!-- Main Chat -->
      <div class="h-full flex-1 ${state.mobileView === 'chat' ? 'w-full flex flex-col' : 'hidden md:flex flex-col'}">
        ${renderChatArea()}
      </div>
    </div>

    <!-- Modals -->
    ${state.showProfile ? renderProfileModal() : ''}
    ${state.showGroupModal ? renderGroupModal() : ''}
    ${state.showStorageModal ? renderStorageModal() : ''}
    ${state.showCLIModal ? renderCLIModal() : ''}
  `;

  bindMainEvents();
}

// ============================================================
// AUTH SCREEN
// ============================================================
let isSignUpTab = false;

function renderAuthScreen() {
  const currentServer = API.getBaseUrl().replace(/\/api$/, '');
  return `
  <div class="h-screen w-screen flex items-center justify-center bg-[#0b0f19] p-4 relative overflow-hidden">
    <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

    <div class="relative w-full max-w-md bg-[#111827] text-slate-100 rounded-2xl shadow-2xl border border-[#1e293b] overflow-hidden modal-enter">
      <!-- Brand Header -->
      <div class="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 p-6 text-white text-center">
        <div class="flex justify-center mb-3">
          ${LOGO_SVG}
        </div>
        <h1 class="text-2xl font-bold font-heading tracking-tight">LogsApp</h1>
        <p class="text-blue-100 text-xs mt-0.5">Web Chat • 1GB File Bridge • Anime Avatars Ready</p>
      </div>

      <!-- Tab Switcher -->
      <div class="flex border-b border-[#1e293b] text-sm font-semibold">
        <button id="tab-signin" class="flex-1 py-3 text-center transition-all ${!isSignUpTab ? 'text-blue-400 border-b-2 border-blue-500 bg-blue-500/10 font-bold' : 'text-slate-400 hover:text-slate-200'}">
          Sign In
        </button>
        <button id="tab-signup" class="flex-1 py-3 text-center transition-all ${isSignUpTab ? 'text-blue-400 border-b-2 border-blue-500 bg-blue-500/10 font-bold' : 'text-slate-400 hover:text-slate-200'}">
          Sign Up
        </button>
      </div>

      <!-- Form -->
      <form id="auth-form" class="p-6 space-y-4">
        <div id="auth-error" class="hidden p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs flex items-start gap-2"></div>

        ${!isSignUpTab ? `
          <!-- Sign In -->
          <div>
            <label class="block text-xs font-semibold text-slate-400 mb-1">Username or 7-Digit Royal ID</label>
            <input type="text" id="login-identifier" placeholder="e.g. @madarauchiha or 8471027" required class="w-full px-3.5 py-2.5 bg-[#0b0f19] border border-[#1e293b] rounded-xl text-sm focus:outline-none focus:border-blue-500 text-slate-100 placeholder:text-slate-500 font-mono" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-400 mb-1">Password</label>
            <input type="password" id="login-password" placeholder="••••••••" required class="w-full px-3.5 py-2.5 bg-[#0b0f19] border border-[#1e293b] rounded-xl text-sm focus:outline-none focus:border-blue-500 text-slate-100 placeholder:text-slate-500" />
          </div>
        ` : `
          <!-- Sign Up (Exact 4 fields) -->
          <div>
            <label class="block text-xs font-semibold text-slate-400 mb-1">Display Name</label>
            <input type="text" id="reg-name" placeholder="Madara Uchiha" required class="w-full px-3.5 py-2.5 bg-[#0b0f19] border border-[#1e293b] rounded-xl text-sm focus:outline-none focus:border-blue-500 text-slate-100 placeholder:text-slate-500" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-400 mb-1">Username</label>
            <div class="relative flex items-center">
              <span class="absolute left-3 text-slate-400 font-bold text-sm">@</span>
              <input type="text" id="reg-username" placeholder="madarauchiha" required class="w-full pl-8 pr-3.5 py-2.5 bg-[#0b0f19] border border-[#1e293b] rounded-xl text-sm focus:outline-none focus:border-blue-500 text-slate-100 placeholder:text-slate-500 font-mono" />
            </div>
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-400 mb-1">Password</label>
            <input type="password" id="reg-password" placeholder="••••••••" required class="w-full px-3.5 py-2.5 bg-[#0b0f19] border border-[#1e293b] rounded-xl text-sm focus:outline-none focus:border-blue-500 text-slate-100 placeholder:text-slate-500" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-400 mb-1">Re-enter Password</label>
            <input type="password" id="reg-confirm" placeholder="••••••••" required class="w-full px-3.5 py-2.5 bg-[#0b0f19] border border-[#1e293b] rounded-xl text-sm focus:outline-none focus:border-blue-500 text-slate-100 placeholder:text-slate-500" />
          </div>
          <div class="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-[11px] text-amber-300">
            ✨ Auto-generates a unique <b>7-digit Royal ID</b> (e.g. <code>#8471027</code>) & Anime Avatar.
          </div>
        `}

        <button type="submit" id="auth-submit-btn" class="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-sm shadow-md transition-all">
          ${!isSignUpTab ? 'Sign In to LogsApp' : 'Complete Sign Up'}
        </button>
      </form>

      <!-- Server Config Drawer -->
      <div class="px-6 py-2 bg-[#0b0f19]/60 border-t border-[#1e293b]/60 text-center">
        <button id="btn-toggle-server-config" class="text-[11px] text-slate-400 hover:text-blue-400 inline-flex items-center gap-1">
          <span class="mdi mdi-server-network"></span>
          <span>Backend Server Settings</span>
        </button>

        ${state.showServerConfig ? `
          <div class="mt-2 text-left p-3 bg-[#0b0f19] rounded-xl border border-slate-800 space-y-2">
            <label class="block text-[11px] text-slate-400">Custom Backend URL (Render / VPS)</label>
            <div class="flex gap-1.5">
              <input type="text" id="server-url-input" value="${localStorage.getItem('logsapp_server_url') || ''}" placeholder="https://logsapp-2vqv.onrender.com" class="flex-1 px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-blue-300 placeholder:text-slate-600 focus:outline-none focus:border-blue-500" />
              <button id="btn-save-server-url" class="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold">Save</button>
            </div>
            <p class="text-[10px] text-slate-500">Connected: <code class="text-blue-400">${currentServer}</code></p>
          </div>
        ` : ''}
      </div>

      <div class="p-3 bg-[#0b0f19] border-t border-[#1e293b]/40 text-center font-mono text-[11px] text-slate-400">
        Linux CLI: <code class="text-blue-400 font-bold">logsapp login</code>
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

        const initialAvatar = getRandomAnimeAvatar().url;

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

      await loadChats();
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
// SIDEBAR
// ============================================================
function renderSidebarHeader() {
  const avatar = state.user?.avatar_url || getRandomAnimeAvatar().url;
  return `
  <div class="h-16 px-4 flex items-center justify-between border-b ${state.isDark ? 'border-[#1e293b] bg-[#111827]' : 'border-[#e2e8f0] bg-slate-50'}">
    <!-- Clickable User Profile -->
    <button id="btn-open-profile" class="flex items-center gap-3 p-1 rounded-xl hover:bg-slate-800/40 text-left transition-all group">
      <div class="relative shrink-0">
        <img src="${avatar}" class="w-10 h-10 rounded-xl object-cover bg-slate-900 ring-2 ring-blue-500/50 shadow-md" />
        <span class="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#111827] rounded-full"></span>
      </div>
      <div class="min-w-0">
        <h4 class="font-semibold text-sm truncate group-hover:text-blue-400 transition-colors">${state.user?.display_name}</h4>
        <span class="inline-flex items-center text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-1.5 py-0.2 rounded border border-amber-500/20">
          #${state.user?.royal_id}
        </span>
      </div>
    </button>

    <!-- Header Actions -->
    <div class="flex items-center gap-1 text-slate-400">
      <button id="btn-open-cli" class="p-2 hover:bg-slate-800/40 rounded-xl text-blue-400" title="Linux CLI Companion"><span class="mdi mdi-console text-lg"></span></button>
      <button id="btn-open-storage" class="p-2 hover:bg-slate-800/40 rounded-xl text-amber-400" title="Storage Quota"><span class="mdi mdi-harddisk text-lg"></span></button>
      <button id="btn-open-group" class="p-2 hover:bg-slate-800/40 rounded-xl" title="New Group"><span class="mdi mdi-account-multiple-plus text-lg"></span></button>
      <button id="btn-toggle-theme" class="p-2 hover:bg-slate-800/40 rounded-xl" title="Theme"><span class="mdi ${state.isDark ? 'mdi-weather-sunny text-amber-300' : 'mdi-weather-night text-indigo-600'} text-lg"></span></button>
    </div>
  </div>`;
}

function renderSearchBar() {
  return `
  <div class="p-3 relative ${state.isDark ? 'bg-[#0b0f19]' : 'bg-white'}">
    <div class="relative flex items-center ${state.isDark ? 'bg-[#111827] border-[#1e293b]' : 'bg-slate-100 border-slate-200'} border rounded-xl px-3 py-2">
      <span class="mdi mdi-magnify text-slate-400 mr-2 text-base"></span>
      <input type="text" id="search-input" value="${state.searchQuery}" placeholder="Search username or 7-digit Royal ID..." class="w-full bg-transparent text-sm focus:outline-none placeholder:text-slate-500" />
      ${state.searchQuery ? `<button id="btn-clear-search" class="text-slate-400 hover:text-slate-200"><span class="mdi mdi-close"></span></button>` : ''}
    </div>

    ${state.searchQuery && state.searchResults.length > 0 ? `
      <div class="absolute top-full left-3 right-3 z-30 mt-1 max-h-72 overflow-y-auto bg-[#111827] border border-[#1e293b] rounded-2xl shadow-2xl divide-y divide-slate-800">
        ${state.searchResults.map(u => `
          <div class="search-user-item flex items-center gap-3 p-3 hover:bg-slate-800 cursor-pointer transition-colors" data-user-id="${u.id}">
            <img src="${u.avatar_url || getRandomAnimeAvatar().url}" class="w-10 h-10 rounded-xl bg-slate-900 ring-1 ring-blue-500/30" />
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between">
                <h5 class="text-sm font-semibold truncate">${u.display_name}</h5>
                <span class="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">#${u.royal_id}</span>
              </div>
              <p class="text-xs text-slate-400 font-mono">@${u.username}</p>
            </div>
            <span class="mdi mdi-message-plus text-blue-400 text-lg"></span>
          </div>
        `).join('')}
      </div>
    ` : ''}
  </div>`;
}

function renderChatList() {
  if (state.chats.length === 0) {
    return `
    <div class="flex-1 p-8 text-center text-slate-500 text-xs flex flex-col items-center justify-center space-y-2">
      <span class="mdi mdi-chat-outline text-4xl text-blue-500/40"></span>
      <p class="font-semibold text-sm text-slate-300">No conversations yet</p>
      <p>Search any username or 7-digit Royal ID above to start chatting!</p>
    </div>`;
  }

  return `
  <div class="flex-1 overflow-y-auto divide-y ${state.isDark ? 'divide-[#1e293b]/60' : 'divide-slate-200'}">
    ${state.chats.map(chat => {
      const isActive = chat.id === state.activeChatId;
      const other = !chat.is_group && chat.other_participants ? chat.other_participants[0] : null;
      const title = chat.is_group ? chat.name : (other?.display_name || 'Direct Chat');
      const avatar = chat.is_group ? (chat.avatar_url || `https://api.dicebear.com/7.x/identicon/svg?seed=${chat.name}`) : (other?.avatar_url || getRandomAnimeAvatar().url);
      const lastMsg = chat.last_message ? (chat.last_message.message_type !== 'text' ? `📎 [${chat.last_message.message_type.toUpperCase()}] ${chat.last_message.file_name || ''}` : chat.last_message.content) : 'No messages yet';
      const time = chat.last_message?.created_at ? new Date(chat.last_message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
      const unreadCount = Number(chat.unread_count || 0);
      const hasUnread = unreadCount > 0;

      return `
      <div class="chat-list-item relative flex items-center gap-3 p-3.5 cursor-pointer transition-colors ${isActive ? 'bg-blue-600/15 border-l-4 border-blue-500' : 'hover:bg-slate-800/30'}" data-chat-id="${chat.id}">
        <!-- Avatar with unread indicator dot -->
        <div class="relative shrink-0">
          <img src="${avatar}" class="w-12 h-12 rounded-xl object-cover bg-slate-900 border border-slate-700 ring-1 ring-white/10" />
          ${chat.is_group ? `<span class="absolute -bottom-1 -right-1 p-0.5 bg-blue-600 text-white rounded-full text-[10px] mdi mdi-account-multiple"></span>` : ''}
          ${hasUnread ? `<span class="absolute -top-1 -right-1 w-3.5 h-3.5 bg-blue-500 border-2 border-[#111827] rounded-full shadow-lg shadow-blue-500/50 animate-pulse"></span>` : ''}
        </div>

        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between">
            <h4 class="font-semibold text-sm truncate ${hasUnread ? 'text-blue-300 font-bold' : ''}">${title}</h4>
            <div class="flex items-center gap-1.5 shrink-0 ml-2">
              <span class="text-[11px] ${hasUnread ? 'text-blue-400 font-semibold' : 'text-slate-500'}">${time}</span>
              ${hasUnread ? `<span class="w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-blue-500/20 animate-ping"></span>` : ''}
            </div>
          </div>

          <div class="flex items-center justify-between mt-1">
            <p class="text-xs ${hasUnread ? 'text-slate-100 font-semibold' : 'text-slate-400'} truncate flex-1">${lastMsg}</p>
            ${hasUnread ? `<span class="bg-blue-600 text-white font-bold text-[10px] px-1.5 py-0.2 rounded-full shadow-md shrink-0 ml-2">${unreadCount}</span>` : ''}
          </div>

          ${other ? `<span class="inline-block mt-1 text-[9px] font-mono text-amber-400 bg-amber-500/10 px-1 py-0.2 rounded border border-amber-500/20 font-bold">#${other.royal_id}</span>` : ''}
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
        <h2 class="text-2xl font-bold font-heading text-slate-100">LogsApp Web Chat</h2>
        <p class="text-xs leading-relaxed text-slate-400">Encrypted real-time messaging, voice notes, anime avatars, and 1GB file sharing with zero-sudo Linux terminal sync.</p>
        <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full text-xs font-mono">
          <span class="mdi mdi-console"></span> CLI: logsapp chats
        </div>
      </div>
    </div>`;
  }

  const other = !activeChat.is_group && activeChat.other_participants ? activeChat.other_participants[0] : null;
  const title = activeChat.is_group ? activeChat.name : (other?.display_name || 'Direct Chat');
  const avatar = activeChat.is_group ? (activeChat.avatar_url || `https://api.dicebear.com/7.x/identicon/svg?seed=${activeChat.name}`) : (other?.avatar_url || getRandomAnimeAvatar().url);

  return `
  <div class="flex-1 h-full flex flex-col ${state.isDark ? 'bg-[#0b0f19]' : 'bg-[#f8fafc]'} relative">
    <!-- Chat Header -->
    <div class="h-16 px-4 flex items-center justify-between border-b ${state.isDark ? 'border-[#1e293b] bg-[#111827]' : 'border-[#e2e8f0] bg-white'} z-10">
      <div class="flex items-center gap-3 min-w-0">
        <button id="btn-chat-back" class="md:hidden p-1 text-slate-400 hover:text-slate-200"><span class="mdi mdi-arrow-left text-xl"></span></button>
        <img src="${avatar}" class="w-10 h-10 rounded-xl object-cover bg-slate-900 border border-slate-700 shrink-0 ring-1 ring-blue-500/30" />
        <div class="min-w-0">
          <div class="flex items-center gap-2">
            <h3 class="font-semibold text-sm truncate">${title}</h3>
            ${other ? `<span class="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-1.5 py-0.2 rounded border border-amber-500/20">#${other.royal_id}</span>` : ''}
          </div>
          <p class="text-[11px] text-slate-400">${activeChat.is_group ? `${activeChat.participant_count || 2} members` : 'Direct Chat'}</p>
        </div>
      </div>
      <div class="flex items-center gap-1 text-slate-400">
        <button id="btn-chat-storage" class="p-2 hover:bg-slate-800/40 rounded-xl text-amber-400" title="Storage Quota"><span class="mdi mdi-harddisk text-lg"></span></button>
        <button id="btn-chat-cli" class="p-2 hover:bg-slate-800/40 rounded-xl text-blue-400" title="CLI Sync"><span class="mdi mdi-console text-lg"></span></button>
      </div>
    </div>

    <!-- Messages Container -->
    <div id="messages-container" class="flex-1 overflow-y-auto p-4 md:p-6 space-y-2.5">
      ${state.activeMessages.length === 0 ? `
        <div class="flex flex-col items-center justify-center h-full text-center text-xs text-slate-400 space-y-2">
          <span class="mdi mdi-message-text-outline text-3xl text-blue-500/40"></span>
          <p class="font-semibold text-slate-300">No messages yet</p>
          <p>Send a message or attach any file up to 1GB!</p>
        </div>
      ` : state.activeMessages.map(msg => renderMessageBubble(msg, msg.sender_id === state.user.id)).join('')}
    </div>

    <!-- Input Bar -->
    <div class="p-3 border-t ${state.isDark ? 'border-[#1e293b] bg-[#111827]' : 'border-[#e2e8f0] bg-white'}">
      <form id="chat-input-form" class="flex items-center gap-2">
        <input type="file" id="file-upload-input" class="hidden" />
        <button type="button" id="btn-attach-file" class="p-2 text-slate-400 hover:text-blue-400 rounded-xl" title="Attach file (up to 1GB)"><span class="mdi mdi-paperclip text-xl"></span></button>
        <input type="text" id="chat-message-input" placeholder="Type a message..." class="flex-1 py-2.5 px-4 rounded-xl text-sm ${state.isDark ? 'bg-[#0b0f19] border-[#1e293b] text-slate-100' : 'bg-slate-100 border-slate-200 text-slate-900'} border focus:outline-none focus:border-blue-500" />
        <button type="submit" class="p-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-md shrink-0"><span class="mdi mdi-send text-base"></span></button>
      </form>
    </div>
  </div>`;
}

function renderMessageBubble(msg, isMe) {
  const time = msg.created_at ? new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
  const downloadUrl = `${API.getBaseUrl()}/files/download/${msg.id}`;

  return `
  <div class="flex flex-col my-1 ${isMe ? 'items-end' : 'items-start'}">
    <div class="relative max-w-[85%] md:max-w-[70%]">
      <div class="rounded-2xl px-4 py-2.5 text-sm break-words ${isMe ? 'bubble-sent' : (state.isDark ? 'bubble-received-dark' : 'bubble-received-light')}">
        ${msg.message_type === 'image' ? `
          <div class="mb-2 -mx-1.5 -mt-1 rounded-xl overflow-hidden cursor-pointer">
            <img src="${downloadUrl}" class="w-full max-h-72 object-cover" />
            ${msg.quick_code ? `<div class="bg-black/70 px-2 py-1 flex justify-between text-[10px] text-amber-300 font-mono"><span>Code: ${msg.quick_code}</span></div>` : ''}
          </div>
        ` : ''}

        ${['file', 'document', 'archive', 'video', 'audio'].includes(msg.message_type) ? `
          <div class="flex items-center gap-3 p-2.5 bg-black/20 rounded-xl mb-2 border border-white/10">
            <span class="mdi mdi-file-document text-2xl text-blue-300"></span>
            <div class="flex-1 min-w-0">
              <p class="font-semibold text-xs truncate">${msg.file_name || 'Attached File'}</p>
              <span class="text-[10px] font-mono text-amber-300">${msg.quick_code ? `QuickCode: ${msg.quick_code}` : '1GB max'}</span>
            </div>
            <a href="${downloadUrl}" download="${msg.file_name || 'download'}" class="p-1.5 bg-blue-500/20 text-blue-300 rounded-lg"><span class="mdi mdi-download"></span></a>
          </div>
        ` : ''}

        ${msg.content && msg.content !== msg.file_name ? `<p class="whitespace-pre-wrap leading-relaxed">${msg.content}</p>` : ''}

        <div class="flex items-center justify-end gap-1 mt-1 text-[10px] opacity-75 float-right ml-2 font-mono">
          <span>${time}</span>
          ${isMe ? `<span class="mdi mdi-check-all text-cyan-300"></span>` : ''}
        </div>
      </div>
    </div>
  </div>`;
}

// ============================================================
// PROFILE MODAL (With Anime Avatar Selector & Shuffle)
// ============================================================
function renderProfileModal() {
  const avatar = state.user?.avatar_url || getRandomAnimeAvatar().url;
  const currentAnime = ANIME_AVATARS.find(a => a.url === avatar);
  const usedMb = ((Number(state.user?.storage_used_bytes || 0)) / (1024 * 1024)).toFixed(2);
  const limitMb = ((Number(state.user?.storage_limit_bytes || 1073741824)) / (1024 * 1024)).toFixed(0);

  return `
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in">
    <div class="w-full max-w-lg bg-[#111827] text-slate-100 rounded-2xl shadow-2xl border border-[#1e293b] overflow-hidden modal-enter max-h-[90vh] flex flex-col">
      <!-- Top Banner -->
      <div class="relative bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 p-6 text-white text-center shrink-0">
        <button id="btn-close-profile" class="absolute top-4 right-4 p-1 bg-black/20 hover:bg-black/40 rounded-full"><span class="mdi mdi-close text-lg"></span></button>
        
        <div class="relative inline-block mx-auto mb-2">
          <img src="${avatar}" class="w-24 h-24 rounded-2xl object-cover bg-slate-950 ring-4 ring-amber-400/80 shadow-2xl shadow-blue-500/50" />
          <span class="absolute -bottom-2 -right-2 p-1 bg-amber-500 text-slate-950 rounded-full text-xs font-bold shadow" title="Anime Avatar">⚡</span>
        </div>

        <div class="flex items-center justify-center gap-2 mt-1">
          <button id="btn-shuffle-avatar" class="text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 px-3 py-1.5 rounded-full font-bold shadow-md flex items-center gap-1.5 transition-all">
            <span>🎲 Shuffle Anime Avatar</span>
          </button>
          <button id="btn-toggle-avatar-grid" class="text-xs bg-blue-500/30 hover:bg-blue-500/50 text-white border border-blue-400/40 px-3 py-1.5 rounded-full font-semibold flex items-center gap-1 transition-all">
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
      <div class="p-4 bg-[#0b0f19] border-b border-[#1e293b] flex items-center justify-between shrink-0">
        <div>
          <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">7-Digit Royal ID</span>
          <p class="text-lg font-mono font-extrabold text-amber-400 mt-0.5">#${state.user?.royal_id}</p>
        </div>
        <button id="btn-copy-royal-id" class="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-xl text-xs font-semibold flex items-center gap-1">
          <span class="mdi mdi-content-copy"></span> Copy ID
        </button>
      </div>

      <!-- Body / Character Picker Grid -->
      <div class="p-6 space-y-4 overflow-y-auto flex-1">
        ${state.showAvatarGrid ? `
          <div class="space-y-2 p-3 bg-[#0b0f19] rounded-2xl border border-slate-800">
            <div class="flex items-center justify-between text-xs text-slate-400 font-bold uppercase">
              <span>Choose Your Anime Hero</span>
              <span class="text-[10px] text-amber-400">${ANIME_AVATARS.length} Characters</span>
            </div>
            <div class="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-48 overflow-y-auto p-1">
              ${ANIME_AVATARS.map((av, idx) => `
                <div class="avatar-option-item flex flex-col items-center p-1.5 rounded-xl cursor-pointer hover:bg-blue-600/20 border ${av.url === avatar ? 'border-amber-400 bg-amber-400/10' : 'border-slate-800'} transition-all" data-url="${av.url}">
                  <img src="${av.url}" class="w-11 h-11 rounded-lg object-cover bg-slate-900" />
                  <span class="text-[9px] text-slate-300 font-semibold truncate w-full text-center mt-1">${av.name.split(' ')[0]}</span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <div class="p-3.5 bg-[#0b0f19] border border-slate-800 rounded-xl space-y-1 text-xs">
          <div class="flex justify-between">
            <span class="text-slate-400">Storage Usage</span>
            <span class="font-mono text-blue-400 font-bold">${usedMb} MB / ${limitMb} MB</span>
          </div>
        </div>

        <div class="pt-2 flex justify-between">
          <button id="btn-logout" class="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl text-xs font-semibold">Logout</button>
          <button id="btn-profile-done" class="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-xs">Done</button>
        </div>
      </div>
    </div>
  </div>`;
}

// CLI Modal
function renderCLIModal() {
  const host = API.getServerHost();
  const installCmd = `curl -fsSL ${host}/api/cli/install.sh | bash`;

  return `
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
    <div class="w-full max-w-2xl bg-[#111827] text-slate-100 rounded-2xl shadow-2xl border border-[#1e293b] overflow-hidden modal-enter">
      <div class="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-950 p-6 text-white flex items-center justify-between border-b border-slate-800">
        <div class="flex items-center gap-3">
          <span class="mdi mdi-console text-3xl text-blue-400"></span>
          <div>
            <h3 class="font-bold text-lg font-heading">Linux CLI & College Lab Companion</h3>
            <p class="text-xs text-slate-300">Access files, code, & chats on College Linux PCs without root/sudo.</p>
          </div>
        </div>
        <button id="btn-close-cli" class="p-1 rounded-xl text-slate-400 hover:text-white"><span class="mdi mdi-close text-lg"></span></button>
      </div>

      <div class="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
        <div>
          <label class="block font-bold text-blue-400 uppercase tracking-wider mb-1">1-Step Install (College User Account Ready)</label>
          <div class="flex items-center justify-between bg-[#0b0f19] p-3 rounded-xl border border-slate-800 font-mono text-blue-300">
            <span class="truncate">${installCmd}</span>
            <button class="btn-copy-text px-2.5 py-1 bg-blue-600 text-white rounded-lg ml-2" data-copy="${installCmd}">Copy</button>
          </div>
        </div>

        <div class="p-4 bg-blue-950/30 border border-blue-500/30 rounded-2xl space-y-2">
          <h4 class="font-bold text-blue-300">🎓 College Lab Commands</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div class="p-2.5 bg-[#0b0f19] rounded-xl border border-slate-800">
              <span class="font-mono text-blue-400 font-bold">logsapp pull @friend</span>
              <p class="text-[11px] text-slate-400 mt-0.5">Download all shared files straight into your college lab folder.</p>
            </div>
            <div class="p-2.5 bg-[#0b0f19] rounded-xl border border-slate-800">
              <span class="font-mono text-blue-400 font-bold">logsapp push-dir ./lab_code @friend</span>
              <p class="text-[11px] text-slate-400 mt-0.5">Zip & upload your assignment folder (up to 1GB).</p>
            </div>
          </div>
        </div>
      </div>

      <div class="p-4 bg-[#0b0f19] border-t border-slate-800 flex justify-end">
        <button id="btn-cli-done" class="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold">Done</button>
      </div>
    </div>
  </div>`;
}

// Storage Modal
function renderStorageModal() {
  const usedMb = ((Number(state.user?.storage_used_bytes || 0)) / (1024 * 1024)).toFixed(2);
  const limitMb = ((Number(state.user?.storage_limit_bytes || 1073741824)) / (1024 * 1024)).toFixed(0);

  return `
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
    <div class="w-full max-w-md bg-[#111827] text-slate-100 rounded-2xl shadow-2xl border border-[#1e293b] overflow-hidden modal-enter p-6 space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="font-bold text-lg font-heading flex items-center gap-2 text-amber-400"><span class="mdi mdi-harddisk"></span> Storage & Auto-Purge</h3>
        <button id="btn-close-storage" class="text-slate-400 hover:text-white"><span class="mdi mdi-close text-lg"></span></button>
      </div>
      <p class="text-xs text-slate-400">When your chat reaches its limit, older messages and files are automatically pruned to stay within quota.</p>
      <div class="p-3.5 bg-[#0b0f19] rounded-xl border border-slate-800 text-xs">
        <div class="flex justify-between font-bold text-blue-400"><span>Current Storage:</span><span>${usedMb} MB / ${limitMb} MB</span></div>
      </div>
      <button id="btn-storage-done" class="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold">Done</button>
    </div>
  </div>`;
}

// Group Modal
function renderGroupModal() {
  return `
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
    <div class="w-full max-w-md bg-[#111827] text-slate-100 rounded-2xl shadow-2xl border border-[#1e293b] overflow-hidden modal-enter p-6 space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="font-bold text-lg font-heading">Create Group Chat</h3>
        <button id="btn-close-group" class="text-slate-400 hover:text-white"><span class="mdi mdi-close text-lg"></span></button>
      </div>
      <form id="create-group-form" class="space-y-3">
        <div>
          <label class="block text-xs font-semibold text-slate-400 mb-1">Group Name</label>
          <input type="text" id="group-name-input" placeholder="e.g. Project Team" required class="w-full px-3.5 py-2.5 bg-[#0b0f19] border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-blue-500 text-slate-100" />
        </div>
        <button type="submit" class="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-xs shadow-md">Create Group</button>
      </form>
    </div>
  </div>`;
}

// ============================================================
// EVENTS & SYNC
// ============================================================
async function loadChats() {
  if (!state.token) return;
  try {
    const data = await API.request('/chats');
    state.chats = data.chats || [];
  } catch (e) {
    console.error('Failed to load chats:', e);
  }
}

async function loadMessages(chatId) {
  if (!chatId || !state.token) return;
  try {
    const data = await API.request(`/messages/${chatId}`);
    state.activeMessages = data.messages || [];
    // Mark chat as read
    API.request(`/chats/${chatId}/read`, { method: 'POST' }).catch(() => {});
    // Clear local unread badge
    const chat = state.chats.find(c => c.id === chatId);
    if (chat) chat.unread_count = 0;
  } catch (e) {
    console.error('Failed to load messages:', e);
  }
}

function bindMainEvents() {
  document.getElementById('btn-toggle-theme')?.addEventListener('click', () => {
    state.isDark = !state.isDark;
    localStorage.setItem('logsapp_theme', state.isDark ? 'dark' : 'light');
    render();
  });

  document.getElementById('btn-open-profile')?.addEventListener('click', () => { state.showProfile = true; render(); });
  document.getElementById('btn-close-profile')?.addEventListener('click', () => { state.showProfile = false; render(); });
  document.getElementById('btn-profile-done')?.addEventListener('click', () => { state.showProfile = false; render(); });

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

  document.querySelectorAll('.avatar-option-item').forEach(item => {
    item.addEventListener('click', async () => {
      const selectedUrl = item.getAttribute('data-url');
      if (!selectedUrl) return;
      try {
        await API.request('/auth/me', {
          method: 'PUT',
          body: JSON.stringify({ avatar_url: selectedUrl })
        });
        state.user.avatar_url = selectedUrl;
        localStorage.setItem('logsapp_user', JSON.stringify(state.user));
        sounds.playSent();
        render();
        showToast('Anime Avatar selected!', 'success');
      } catch (e) {
        showToast('Failed to update avatar', 'error');
      }
    });
  });

  document.querySelectorAll('.btn-copy-text').forEach(btn => {
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(btn.getAttribute('data-copy') || '');
      showToast('Copied to clipboard!', 'success');
    });
  });

  document.getElementById('btn-copy-royal-id')?.addEventListener('click', () => {
    if (state.user?.royal_id) {
      navigator.clipboard.writeText(state.user.royal_id);
      showToast(`Royal ID #${state.user.royal_id} copied!`, 'success');
    }
  });

  // Shuffle Anime Avatar
  document.getElementById('btn-shuffle-avatar')?.addEventListener('click', async () => {
    const randomAnime = getRandomAnimeAvatar();
    try {
      await API.request('/auth/me', {
        method: 'PUT',
        body: JSON.stringify({ avatar_url: randomAnime.url })
      });
      state.user.avatar_url = randomAnime.url;
      localStorage.setItem('logsapp_user', JSON.stringify(state.user));
      sounds.playSent();
      render();
      showToast(`Shuffled to ${randomAnime.name}!`, 'success');
    } catch (e) {
      showToast('Failed to update avatar', 'error');
    }
  });

  document.getElementById('btn-logout')?.addEventListener('click', () => {
    localStorage.clear();
    state.user = null;
    state.token = null;
    state.showProfile = false;
    render();
  });

  // Autocomplete search
  let searchTimer = null;
  const searchInput = document.getElementById('search-input');
  searchInput?.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    clearTimeout(searchTimer);
    if (!state.searchQuery.trim()) {
      state.searchResults = [];
      render();
      return;
    }
    searchTimer = setTimeout(async () => {
      try {
        const data = await API.request(`/auth/search?q=${encodeURIComponent(state.searchQuery)}`);
        state.searchResults = data.users || [];
        render();
      } catch (err) {}
    }, 200);
  });

  document.getElementById('btn-clear-search')?.addEventListener('click', () => {
    state.searchQuery = '';
    state.searchResults = [];
    render();
  });

  document.querySelectorAll('.search-user-item').forEach(item => {
    item.addEventListener('click', async () => {
      const targetUserId = item.getAttribute('data-user-id');
      try {
        const data = await API.request('/chats/direct', {
          method: 'POST',
          body: JSON.stringify({ targetUserId })
        });
        state.searchQuery = '';
        state.searchResults = [];
        state.activeChatId = data.chatId;
        state.mobileView = 'chat';
        await loadChats();
        await loadMessages(data.chatId);
        render();
      } catch (err) {
        showToast(err.message || 'Failed to start chat', 'error');
      }
    });
  });

  document.querySelectorAll('.chat-list-item').forEach(item => {
    item.addEventListener('click', async () => {
      const chatId = item.getAttribute('data-chat-id');
      state.activeChatId = chatId;
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

  const chatForm = document.getElementById('chat-input-form');
  const chatInput = document.getElementById('chat-message-input');
  chatForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const content = chatInput.value.trim();
    if (!content || !state.activeChatId) return;
    chatInput.value = '';

    try {
      sounds.playSent();
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
      showToast('Failed to send message', 'error');
    }
  });

  const fileInput = document.getElementById('file-upload-input');
  document.getElementById('btn-attach-file')?.addEventListener('click', () => {
    fileInput?.click();
  });

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
      const res = await API.request(`/files/upload/${state.activeChatId}`, {
        method: 'POST',
        body: formData
      });
      sounds.playSent();
      state.activeMessages.push(res.message);
      render();
      showToast(`File uploaded! QuickCode: ${res.message.quick_code}`, 'success');
      await loadChats();
    } catch (err) {
      showToast('Upload failed', 'error');
    }
  });

  document.getElementById('create-group-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('group-name-input').value.trim();
    if (!name) return;
    try {
      const res = await API.request('/chats/group', {
        method: 'POST',
        body: JSON.stringify({ name, participantIds: [] })
      });
      state.showGroupModal = false;
      state.activeChatId = res.chat.id;
      state.mobileView = 'chat';
      await loadChats();
      await loadMessages(res.chat.id);
      render();
      showToast(`Group "${name}" created!`, 'success');
    } catch (err) {
      showToast('Failed to create group', 'error');
    }
  });
}

// 3s Smart Polling
setInterval(async () => {
  if (state.token && state.activeChatId) {
    try {
      const data = await API.request(`/messages/${state.activeChatId}`);
      const incoming = data.messages || [];
      if (incoming.length !== state.activeMessages.length) {
        state.activeMessages = incoming;
        sounds.playReceived();
        render();
        const container = document.getElementById('messages-container');
        if (container) container.scrollTop = container.scrollHeight;
        await loadChats();
      }
    } catch (e) {}
  }
}, 3000);

(async function init() {
  if (state.token) {
    await loadChats();
  }
  render();
})();
