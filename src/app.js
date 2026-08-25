// ============================================================
// LogsApp — Ultra-Modern Glassmorphism UI (100% Silent & Persistent State)
// ============================================================

// Brand Logo SVG
export const LOGO_SVG = `
<div class="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 shadow-lg shadow-blue-500/25 p-1.5 shrink-0 border border-white/10">
  <svg viewBox="0 0 32 32" fill="none" class="w-full h-full">
    <circle cx="11" cy="11" r="4" fill="white" />
    <path d="M4 23C4 19.6863 7.13401 17 11 17C14.866 17 18 19.6863 18 23" fill="white" fill-opacity="0.95" />
    <circle cx="21" cy="13" r="3.5" fill="#f59e0b" />
    <path d="M15 25C15 22.2386 17.6863 20 21 20C24.3137 20 27 22.2386 27 25" fill="#f59e0b" fill-opacity="0.95" />
  </svg>
</div>`;

// Curated Anime Avatars
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
  searchResults: [],
  searchQuery: '',
  showProfile: false,
  showGroupModal: false,
  showStorageModal: false,
  showCLIModal: false,
  showServerConfig: false,
  showAvatarGrid: false,
  lightboxMedia: null
};

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
  toast.className = `p-3 px-4 rounded-xl border text-xs font-semibold shadow-2xl flex items-center gap-2 pointer-events-auto transition-all transform translate-y-2 opacity-0 ${colors[type] || colors.info}`;
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
    <div class="h-screen w-screen flex overflow-hidden ${state.isDark ? 'bg-ambient-dark text-slate-100' : 'bg-ambient-light text-slate-900'}">
      <!-- Sidebar -->
      <div class="h-full ${state.mobileView === 'sidebar' ? 'w-full md:w-[380px] lg:w-[410px] block' : 'hidden md:block'} border-r ${state.isDark ? 'border-white/10 bg-slate-950/40 backdrop-blur-xl' : 'border-slate-200/90 bg-white/80 backdrop-blur-xl'} shrink-0 flex flex-col z-20">
        ${renderSidebarHeader()}
        ${renderSearchBar()}
        ${renderChatList()}
      </div>

      <!-- Main Chat Area -->
      <div class="h-full flex-1 ${state.mobileView === 'chat' ? 'w-full flex flex-col' : 'hidden md:flex flex-col'}">
        ${renderChatArea()}
      </div>
    </div>

    <!-- Modals -->
    ${state.showProfile ? renderProfileModal() : ''}
    ${state.showGroupModal ? renderGroupModal() : ''}
    ${state.showStorageModal ? renderStorageModal() : ''}
    ${state.showCLIModal ? renderCLIModal() : ''}
    ${state.lightboxMedia ? renderLightbox() : ''}
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
  <div class="h-screen w-screen flex items-center justify-center ${state.isDark ? 'bg-ambient-dark text-slate-100' : 'bg-ambient-light text-slate-900'} p-4 relative overflow-hidden">
    <div class="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>

    <div class="relative w-full max-w-md ${state.isDark ? 'glass-card-dark' : 'glass-card-light'} rounded-3xl overflow-hidden modal-enter">
      <!-- Header Banner -->
      <div class="bg-gradient-to-r from-blue-700/90 via-blue-600/90 to-indigo-700/90 p-6 text-white text-center border-b border-white/10 backdrop-blur-md">
        <div class="flex justify-center mb-3">
          ${LOGO_SVG}
        </div>
        <h1 class="text-2xl font-bold font-heading tracking-tight drop-shadow-md">LogsApp</h1>
        <p class="text-blue-100 text-xs mt-0.5 font-medium">Web Chat • 1GB File Bridge • Anime Avatars</p>
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
        <div id="auth-error" class="hidden p-3 bg-red-500/15 border border-red-500/30 rounded-xl text-red-400 text-xs flex items-start gap-2 backdrop-blur-md"></div>

        ${!isSignUpTab ? `
          <div>
            <label class="block text-xs font-semibold ${state.isDark ? 'text-slate-300' : 'text-slate-600'} mb-1">Username or 7-Digit Royal ID</label>
            <input type="text" id="login-identifier" placeholder="e.g. @madarauchiha or 8471027" required class="w-full px-3.5 py-2.5 ${state.isDark ? 'bg-slate-950/60 border-white/10 text-slate-100 placeholder:text-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'} border rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-mono transition-all" />
          </div>
          <div>
            <label class="block text-xs font-semibold ${state.isDark ? 'text-slate-300' : 'text-slate-600'} mb-1">Password</label>
            <input type="password" id="login-password" placeholder="••••••••" required class="w-full px-3.5 py-2.5 ${state.isDark ? 'bg-slate-950/60 border-white/10 text-slate-100 placeholder:text-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'} border rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" />
          </div>
        ` : `
          <div>
            <label class="block text-xs font-semibold ${state.isDark ? 'text-slate-300' : 'text-slate-600'} mb-1">Display Name</label>
            <input type="text" id="reg-name" placeholder="Madara Uchiha" required class="w-full px-3.5 py-2.5 ${state.isDark ? 'bg-slate-950/60 border-white/10 text-slate-100 placeholder:text-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'} border rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" />
          </div>
          <div>
            <label class="block text-xs font-semibold ${state.isDark ? 'text-slate-300' : 'text-slate-600'} mb-1">Username</label>
            <div class="relative flex items-center">
              <span class="absolute left-3 ${state.isDark ? 'text-slate-400' : 'text-slate-500'} font-bold text-sm">@</span>
              <input type="text" id="reg-username" placeholder="madarauchiha" required class="w-full pl-8 pr-3.5 py-2.5 ${state.isDark ? 'bg-slate-950/60 border-white/10 text-slate-100 placeholder:text-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'} border rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-mono transition-all" />
            </div>
          </div>
          <div>
            <label class="block text-xs font-semibold ${state.isDark ? 'text-slate-300' : 'text-slate-600'} mb-1">Password</label>
            <input type="password" id="reg-password" placeholder="••••••••" required class="w-full px-3.5 py-2.5 ${state.isDark ? 'bg-slate-950/60 border-white/10 text-slate-100 placeholder:text-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'} border rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" />
          </div>
          <div>
            <label class="block text-xs font-semibold ${state.isDark ? 'text-slate-300' : 'text-slate-600'} mb-1">Re-enter Password</label>
            <input type="password" id="reg-confirm" placeholder="••••••••" required class="w-full px-3.5 py-2.5 ${state.isDark ? 'bg-slate-950/60 border-white/10 text-slate-100 placeholder:text-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'} border rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" />
          </div>
          <div class="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-[11px] text-amber-500 font-medium">
            ✨ Auto-generates a unique <b>7-digit Royal ID</b> & Anime Avatar.
          </div>
        `}

        <button type="submit" id="auth-submit-btn" class="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl text-sm shadow-lg shadow-blue-500/25 border border-white/10 transition-all">
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
          <div class="mt-2 text-left p-3 ${state.isDark ? 'bg-slate-900/80 border-white/10' : 'bg-white border-slate-200 shadow-sm'} rounded-xl border space-y-2 backdrop-blur-md">
            <label class="block text-[11px] ${state.isDark ? 'text-slate-300' : 'text-slate-600'} font-semibold">Custom Backend URL (Render / VPS)</label>
            <div class="flex gap-1.5">
              <input type="text" id="server-url-input" value="${localStorage.getItem('logsapp_server_url') || ''}" placeholder="https://logsapp-2vqv.onrender.com" class="flex-1 px-2.5 py-1.5 ${state.isDark ? 'bg-slate-950 border-slate-700 text-blue-300' : 'bg-slate-50 border-slate-200 text-blue-600'} border rounded-lg text-xs font-mono placeholder:text-slate-400 focus:outline-none focus:border-blue-500" />
              <button id="btn-save-server-url" class="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold shadow">Save</button>
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
  <div class="h-16 px-4 flex items-center justify-between border-b ${state.isDark ? 'glass-nav-dark' : 'glass-nav-light'}">
    <!-- Clickable User Profile -->
    <button id="btn-open-profile" class="flex items-center gap-3 p-1.5 rounded-2xl hover:bg-white/10 text-left transition-all group">
      <div class="relative shrink-0">
        <img src="${avatar}" class="w-10 h-10 rounded-xl object-cover bg-slate-900 ring-2 ring-blue-500/50 shadow-md group-hover:ring-blue-400 transition-all" />
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
      <button id="btn-open-cli" class="p-2 hover:bg-white/10 rounded-xl text-blue-500 hover:text-blue-400 transition-all" title="Linux CLI Companion"><span class="mdi mdi-console text-lg"></span></button>
      <button id="btn-open-storage" class="p-2 hover:bg-white/10 rounded-xl text-amber-500 hover:text-amber-400 transition-all" title="Storage Quota"><span class="mdi mdi-harddisk text-lg"></span></button>
      <button id="btn-open-group" class="p-2 hover:bg-white/10 rounded-xl hover:text-blue-500 transition-all" title="New Group"><span class="mdi mdi-account-multiple-plus text-lg"></span></button>
      <button id="btn-toggle-theme" class="p-2 hover:bg-white/10 rounded-xl hover:text-amber-400 transition-all" title="Toggle Light/Dark Theme"><span class="mdi ${state.isDark ? 'mdi-weather-sunny text-amber-300' : 'mdi-weather-night text-indigo-600'} text-lg"></span></button>
    </div>
  </div>`;
}

function renderSearchBar() {
  return `
  <div class="p-3 relative bg-transparent">
    <div class="relative flex items-center ${state.isDark ? 'bg-slate-900/60 border-white/10 text-slate-100' : 'bg-slate-100/90 border-slate-200 text-slate-900'} border rounded-2xl px-3.5 py-2.5 backdrop-blur-md transition-all shadow-inner focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">
      <span class="mdi mdi-magnify ${state.isDark ? 'text-slate-400' : 'text-slate-500'} mr-2 text-base"></span>
      <input type="text" id="search-input" value="${state.searchQuery}" placeholder="Search username or 7-digit Royal ID..." class="w-full bg-transparent text-sm focus:outline-none placeholder:text-slate-400" />
      ${state.searchQuery ? `<button id="btn-clear-search" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"><span class="mdi mdi-close"></span></button>` : ''}
    </div>

    ${state.searchQuery && state.searchResults.length > 0 ? `
      <div class="absolute top-full left-3 right-3 z-30 mt-1 max-h-72 overflow-y-auto ${state.isDark ? 'glass-card-dark border-white/10 divide-white/5' : 'glass-card-light border-slate-200 divide-slate-100'} rounded-2xl shadow-2xl divide-y border">
        ${state.searchResults.map(u => `
          <div class="search-user-item flex items-center gap-3 p-3 hover:bg-blue-500/10 cursor-pointer transition-colors" data-user-id="${u.id}">
            <img src="${u.avatar_url || getRandomAnimeAvatar().url}" class="w-10 h-10 rounded-xl bg-slate-900 ring-1 ring-blue-500/30 object-cover" />
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between">
                <h5 class="text-sm font-semibold truncate ${state.isDark ? 'text-slate-100' : 'text-slate-900'}">${u.display_name}</h5>
                <span class="text-[10px] font-mono font-bold text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">#${u.royal_id}</span>
              </div>
              <p class="text-xs ${state.isDark ? 'text-slate-400' : 'text-slate-500'} font-mono">@${u.username}</p>
            </div>
            <span class="mdi mdi-message-plus text-blue-500 text-lg"></span>
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
      const other = !chat.is_group && chat.other_participants ? chat.other_participants[0] : null;
      const title = chat.is_group ? chat.name : (other?.display_name || 'Direct Chat');
      const avatar = chat.is_group ? (chat.avatar_url || `https://api.dicebear.com/7.x/identicon/svg?seed=${chat.name}`) : (other?.avatar_url || getRandomAnimeAvatar().url);
      const lastMsg = chat.last_message ? (chat.last_message.message_type !== 'text' ? `📎 [${chat.last_message.message_type.toUpperCase()}] ${chat.last_message.file_name || ''}` : chat.last_message.content) : 'No messages yet';
      const time = chat.last_message?.created_at ? new Date(chat.last_message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
      const unreadCount = Number(chat.unread_count || 0);
      const hasUnread = unreadCount > 0;

      return `
      <div class="chat-list-item relative flex items-center gap-3 p-3.5 cursor-pointer transition-all ${isActive ? (state.isDark ? 'bg-blue-600/20 border-l-4 border-blue-500' : 'bg-blue-50 border-l-4 border-blue-600') : 'hover:bg-white/10'}" data-chat-id="${chat.id}">
        <!-- Avatar with unread indicator dot -->
        <div class="relative shrink-0">
          <img src="${avatar}" class="w-12 h-12 rounded-2xl object-cover bg-slate-900 border ${state.isDark ? 'border-white/10' : 'border-slate-200'} shadow-sm" />
          ${chat.is_group ? `<span class="absolute -bottom-1 -right-1 p-0.5 bg-blue-600 text-white rounded-full text-[10px] mdi mdi-account-multiple"></span>` : ''}
          ${hasUnread ? `<span class="absolute -top-1 -right-1 w-3.5 h-3.5 bg-blue-500 border-2 ${state.isDark ? 'border-slate-950' : 'border-white'} rounded-full shadow-lg shadow-blue-500/60 animate-pulse"></span>` : ''}
        </div>

        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between">
            <h4 class="font-semibold text-sm truncate ${hasUnread ? 'text-blue-500 font-bold' : (state.isDark ? 'text-slate-100' : 'text-slate-900')}">${title}</h4>
            <div class="flex items-center gap-1.5 shrink-0 ml-2">
              <span class="text-[11px] ${hasUnread ? 'text-blue-500 font-semibold' : (state.isDark ? 'text-slate-400' : 'text-slate-500')}">${time}</span>
              ${hasUnread ? `<span class="w-2 h-2 rounded-full bg-blue-500 ring-4 ring-blue-500/25 animate-ping"></span>` : ''}
            </div>
          </div>

          <div class="flex items-center justify-between mt-1">
            <p class="text-xs ${hasUnread ? (state.isDark ? 'text-slate-100 font-semibold' : 'text-slate-900 font-semibold') : (state.isDark ? 'text-slate-400' : 'text-slate-500')} truncate flex-1">${lastMsg}</p>
            ${hasUnread ? `<span class="bg-blue-600 text-white font-bold text-[10px] px-1.5 py-0.2 rounded-full shadow-md shrink-0 ml-2">${unreadCount}</span>` : ''}
          </div>

          ${other ? `<span class="inline-block mt-1 text-[9px] font-mono text-amber-500 bg-amber-500/10 px-1.5 py-0.2 rounded-md border border-amber-500/20 font-bold">#${other.royal_id}</span>` : ''}
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
        <h2 class="text-2xl font-bold font-heading ${state.isDark ? 'text-slate-100' : 'text-slate-900'} drop-shadow-sm">LogsApp Web Chat</h2>
        <p class="text-xs leading-relaxed ${state.isDark ? 'text-slate-400' : 'text-slate-600'}">Ultra-fast messaging, anime avatars, and 1GB file sharing with zero-sudo Linux terminal sync.</p>
        <div class="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-500/10 border border-blue-500/25 text-blue-500 rounded-full text-xs font-mono backdrop-blur-md shadow-sm">
          <span class="mdi mdi-console"></span> CLI: logsapp chats
        </div>
      </div>
    </div>`;
  }

  const other = !activeChat.is_group && activeChat.other_participants ? activeChat.other_participants[0] : null;
  const title = activeChat.is_group ? activeChat.name : (other?.display_name || 'Direct Chat');
  const avatar = activeChat.is_group ? (activeChat.avatar_url || `https://api.dicebear.com/7.x/identicon/svg?seed=${activeChat.name}`) : (other?.avatar_url || getRandomAnimeAvatar().url);

  return `
  <div class="flex-1 h-full flex flex-col bg-transparent relative">
    <!-- Chat Header -->
    <div class="h-16 px-4 flex items-center justify-between border-b ${state.isDark ? 'glass-nav-dark' : 'glass-nav-light'} z-10">
      <div class="flex items-center gap-3 min-w-0">
        <button id="btn-chat-back" class="md:hidden p-1 ${state.isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'}"><span class="mdi mdi-arrow-left text-xl"></span></button>
        <img src="${avatar}" class="w-10 h-10 rounded-xl object-cover bg-slate-900 border ${state.isDark ? 'border-white/10' : 'border-slate-200'} shrink-0 ring-1 ring-blue-500/30 shadow" />
        <div class="min-w-0">
          <div class="flex items-center gap-2">
            <h3 class="font-semibold text-sm truncate ${state.isDark ? 'text-slate-100' : 'text-slate-900'}">${title}</h3>
            ${other ? `<span class="text-[10px] font-mono font-bold text-amber-500 bg-amber-500/10 px-1.5 py-0.2 rounded-md border border-amber-500/20">#${other.royal_id}</span>` : ''}
          </div>
          <p class="text-[11px] ${state.isDark ? 'text-slate-400' : 'text-slate-500'}">${activeChat.is_group ? `${activeChat.participant_count || 2} members` : 'Direct Chat'}</p>
        </div>
      </div>
      <div class="flex items-center gap-1 ${state.isDark ? 'text-slate-400' : 'text-slate-500'}">
        <button id="btn-chat-storage" class="p-2 hover:bg-white/10 rounded-xl text-amber-500 hover:text-amber-400 transition-all" title="Storage Quota"><span class="mdi mdi-harddisk text-lg"></span></button>
        <button id="btn-chat-cli" class="p-2 hover:bg-white/10 rounded-xl text-blue-500 hover:text-blue-400 transition-all" title="CLI Sync"><span class="mdi mdi-console text-lg"></span></button>
      </div>
    </div>

    <!-- Messages Container -->
    <div id="messages-container" class="flex-1 overflow-y-auto p-4 md:p-6 space-y-3">
      ${state.activeMessages.length === 0 ? `
        <div class="flex flex-col items-center justify-center h-full text-center text-xs space-y-2 ${state.isDark ? 'text-slate-400' : 'text-slate-500'}">
          <span class="mdi mdi-message-text-outline text-3xl text-blue-500/40"></span>
          <p class="font-semibold ${state.isDark ? 'text-slate-300' : 'text-slate-700'}">No messages yet</p>
          <p>Send a message or attach any file up to 1GB!</p>
        </div>
      ` : state.activeMessages.map(msg => renderMessageBubble(msg, msg.sender_id === state.user.id)).join('')}
    </div>

    <!-- Input Bar -->
    <div class="p-3 border-t ${state.isDark ? 'glass-nav-dark' : 'glass-nav-light'}">
      <form id="chat-input-form" class="flex items-center gap-2 max-w-5xl mx-auto">
        <input type="file" id="file-upload-input" class="hidden" />
        <button type="button" id="btn-attach-file" class="p-2.5 ${state.isDark ? 'text-slate-400 hover:text-blue-400' : 'text-slate-500 hover:text-blue-600'} rounded-2xl hover:bg-white/10 transition-all" title="Attach file (up to 1GB)"><span class="mdi mdi-paperclip text-xl"></span></button>
        <input type="text" id="chat-message-input" placeholder="Type a message..." class="flex-1 py-2.5 px-4 rounded-2xl text-sm ${state.isDark ? 'bg-slate-900/70 border-white/10 text-slate-100 placeholder:text-slate-500' : 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 shadow-sm'} border focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 backdrop-blur-md transition-all" />
        <button type="submit" class="p-2.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-2xl shadow-lg shadow-blue-500/25 border border-white/10 shrink-0 transition-all flex items-center justify-center"><span class="mdi mdi-send text-base"></span></button>
      </form>
    </div>
  </div>`;
}

// Fixed Message Bubble Layout (Images with fallback, Lightbox preview, and collision-free timestamps)
function renderMessageBubble(msg, isMe) {
  const time = msg.created_at ? new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
  const downloadUrl = `${API.getBaseUrl()}/files/download/${msg.id}`;

  return `
  <div class="flex flex-col my-1.5 ${isMe ? 'items-end' : 'items-start'}">
    <div class="relative max-w-[85%] md:max-w-[70%]">
      <div class="rounded-2xl px-4 py-2.5 text-sm break-words ${isMe ? 'bubble-sent' : (state.isDark ? 'bubble-received-dark' : 'bubble-received-light')} flex flex-col">
        ${msg.message_type === 'image' ? `
          <div class="mb-2 -mx-1.5 -mt-1 rounded-xl overflow-hidden cursor-pointer border border-white/10 shadow-sm group relative" data-lightbox="${downloadUrl}">
            <img src="${downloadUrl}" alt="Attached Image" loading="lazy" class="w-full max-h-72 object-cover transition-transform group-hover:scale-102" onerror="this.onerror=null; this.parentElement.innerHTML='<div class=\\'p-3 bg-black/40 text-xs text-amber-300 flex items-center gap-2\\'><span class=\\'mdi mdi-image-broken\\'></span> Photo attached (${msg.file_name || 'image'})</div>'" />
            <div class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold gap-1">
              <span class="mdi mdi-magnify-plus-outline text-lg"></span> View Full Size
            </div>
            ${msg.quick_code ? `<div class="bg-black/75 px-2.5 py-1 flex justify-between text-[10px] text-amber-300 font-mono backdrop-blur-sm"><span>Code: ${msg.quick_code}</span></div>` : ''}
          </div>
        ` : ''}

        ${['file', 'document', 'archive', 'video', 'audio'].includes(msg.message_type) ? `
          <div class="flex items-center gap-3 p-3 bg-black/25 rounded-xl mb-2 border border-white/10 backdrop-blur-sm">
            <span class="mdi mdi-file-document text-2xl text-blue-300"></span>
            <div class="flex-1 min-w-0">
              <p class="font-semibold text-xs truncate text-white">${msg.file_name || 'Attached File'}</p>
              <span class="text-[10px] font-mono text-amber-300">${msg.quick_code ? `QuickCode: ${msg.quick_code}` : '1GB max'}</span>
            </div>
            <a href="${downloadUrl}" download="${msg.file_name || 'download'}" class="p-2 bg-blue-500/25 hover:bg-blue-500/40 text-blue-200 rounded-xl transition-all"><span class="mdi mdi-download"></span></a>
          </div>
        ` : ''}

        ${msg.content && msg.content !== msg.file_name ? `<p class="whitespace-pre-wrap leading-relaxed">${msg.content}</p>` : ''}

        <!-- Clean Timestamp Flow (Never collides with message text) -->
        <div class="flex items-center justify-end gap-1 mt-1.5 pt-0.5 text-[10px] opacity-75 font-mono select-none">
          <span>${time}</span>
          ${isMe ? `<span class="mdi mdi-check-all text-cyan-300 ml-0.5"></span>` : ''}
        </div>
      </div>
    </div>
  </div>`;
}

// Lightbox Preview Modal
function renderLightbox() {
  return `
  <div id="lightbox-modal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 cursor-pointer animate-in fade-in">
    <div class="relative max-w-4xl max-h-[90vh] flex flex-col items-center">
      <button id="btn-close-lightbox" class="absolute -top-12 right-0 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all"><span class="mdi mdi-close text-xl"></span></button>
      <img src="${state.lightboxMedia}" class="max-w-full max-h-[80vh] rounded-2xl shadow-2xl object-contain border border-white/20" />
      <a href="${state.lightboxMedia}" download="photo" class="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-lg"><span class="mdi mdi-download"></span> Download Full Resolution</a>
    </div>
  </div>`;
}

// ============================================================
// PROFILE MODAL (Glassmorphism + Anime Character Grid)
// ============================================================
function renderProfileModal() {
  const avatar = state.user?.avatar_url || getRandomAnimeAvatar().url;
  const currentAnime = ANIME_AVATARS.find(a => a.url === avatar);
  const usedMb = ((Number(state.user?.storage_used_bytes || 0)) / (1024 * 1024)).toFixed(2);
  const limitMb = ((Number(state.user?.storage_limit_bytes || 1073741824)) / (1024 * 1024)).toFixed(0);

  return `
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-lg p-4 animate-in fade-in">
    <div class="w-full max-w-lg ${state.isDark ? 'glass-card-dark' : 'glass-card-light'} rounded-3xl overflow-hidden modal-enter max-h-[90vh] flex flex-col border">
      <!-- Top Banner -->
      <div class="relative bg-gradient-to-r from-blue-700/85 via-indigo-700/85 to-purple-800/85 p-6 text-white text-center shrink-0 border-b border-white/10">
        <button id="btn-close-profile" class="absolute top-4 right-4 p-1.5 bg-black/30 hover:bg-black/50 rounded-full transition-all text-white"><span class="mdi mdi-close text-base"></span></button>
        
        <div class="relative inline-block mx-auto mb-2">
          <img src="${avatar}" class="w-24 h-24 rounded-2xl object-cover bg-slate-950 ring-4 ring-amber-400/80 shadow-2xl shadow-blue-500/50" />
          <span class="absolute -bottom-2 -right-2 p-1 bg-amber-500 text-slate-950 rounded-full text-xs font-bold shadow" title="Anime Avatar">⚡</span>
        </div>

        <div class="flex items-center justify-center gap-2 mt-1">
          <button id="btn-shuffle-avatar" class="text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 px-3.5 py-1.5 rounded-full font-bold shadow-md flex items-center gap-1.5 transition-all">
            <span>🎲 Shuffle Anime Avatar</span>
          </button>
          <button id="btn-toggle-avatar-grid" class="text-xs bg-blue-500/30 hover:bg-blue-500/50 text-white border border-blue-400/40 px-3.5 py-1.5 rounded-full font-semibold flex items-center gap-1 transition-all backdrop-blur-md">
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
        <button id="btn-copy-royal-id" class="px-3.5 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 border border-amber-500/30 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all">
          <span class="mdi mdi-content-copy"></span> Copy ID
        </button>
      </div>

      <!-- Character Grid / Storage -->
      <div class="p-6 space-y-4 overflow-y-auto flex-1">
        ${state.showAvatarGrid ? `
          <div class="space-y-2 p-3.5 ${state.isDark ? 'bg-slate-950/60 border-white/10' : 'bg-slate-100/80 border-slate-200'} rounded-2xl border backdrop-blur-md">
            <div class="flex items-center justify-between text-xs font-bold uppercase ${state.isDark ? 'text-slate-300' : 'text-slate-700'}">
              <span>Choose Your Anime Hero</span>
              <span class="text-[10px] text-amber-500">${ANIME_AVATARS.length} Characters</span>
            </div>
            <div class="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-48 overflow-y-auto p-1">
              ${ANIME_AVATARS.map((av) => `
                <div class="avatar-option-item flex flex-col items-center p-1.5 rounded-xl cursor-pointer hover:bg-blue-600/20 border ${av.url === avatar ? 'border-amber-400 bg-amber-400/15 ring-2 ring-amber-400/40' : (state.isDark ? 'border-white/5 bg-slate-900/60' : 'border-slate-200 bg-white')} transition-all" data-url="${av.url}">
                  <img src="${av.url}" class="w-11 h-11 rounded-lg object-cover bg-slate-900" />
                  <span class="text-[9px] ${state.isDark ? 'text-slate-300' : 'text-slate-700'} font-semibold truncate w-full text-center mt-1">${av.name.split(' ')[0]}</span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <div class="p-3.5 ${state.isDark ? 'bg-slate-950/60 border-white/10' : 'bg-slate-100/80 border-slate-200'} rounded-2xl border space-y-1 text-xs backdrop-blur-md">
          <div class="flex justify-between">
            <span class="${state.isDark ? 'text-slate-400' : 'text-slate-600'} font-medium">Storage Usage</span>
            <span class="font-mono text-blue-500 font-bold">${usedMb} MB / ${limitMb} MB</span>
          </div>
        </div>

        <div class="pt-2 flex justify-between">
          <button id="btn-logout" class="px-4 py-2.5 bg-red-500/15 hover:bg-red-500/25 text-red-500 border border-red-500/30 rounded-xl text-xs font-semibold transition-all">Logout</button>
          <button id="btn-profile-done" class="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-xs shadow-lg shadow-blue-500/25 border border-white/10 transition-all">Done</button>
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
        <button id="btn-close-cli" class="p-1.5 rounded-xl text-slate-400 hover:text-white"><span class="mdi mdi-close text-lg"></span></button>
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
        <button id="btn-cli-done" class="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/25 transition-all">Done</button>
      </div>
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
        <h3 class="font-bold text-lg font-heading flex items-center gap-2 text-amber-500"><span class="mdi mdi-harddisk"></span> Storage & Auto-Purge</h3>
        <button id="btn-close-storage" class="${state.isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}"><span class="mdi mdi-close text-lg"></span></button>
      </div>
      <p class="text-xs ${state.isDark ? 'text-slate-400' : 'text-slate-600'} leading-relaxed">When your chat reaches its limit, older messages and files are automatically pruned to stay within quota.</p>
      <div class="p-3.5 ${state.isDark ? 'bg-slate-950/60 border-white/10' : 'bg-slate-100 border-slate-200'} rounded-2xl border text-xs backdrop-blur-md">
        <div class="flex justify-between font-bold text-blue-500"><span>Current Storage:</span><span>${usedMb} MB / ${limitMb} MB</span></div>
      </div>
      <button id="btn-storage-done" class="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-blue-500/25 transition-all">Done</button>
    </div>
  </div>`;
}

// Group Modal
function renderGroupModal() {
  return `
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-lg p-4">
    <div class="w-full max-w-md ${state.isDark ? 'glass-card-dark border-white/10' : 'glass-card-light border-slate-200'} rounded-3xl overflow-hidden modal-enter p-6 space-y-4 border">
      <div class="flex items-center justify-between">
        <h3 class="font-bold text-lg font-heading ${state.isDark ? 'text-slate-100' : 'text-slate-900'}">Create Group Chat</h3>
        <button id="btn-close-group" class="${state.isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}"><span class="mdi mdi-close text-lg"></span></button>
      </div>
      <form id="create-group-form" class="space-y-3">
        <div>
          <label class="block text-xs font-semibold ${state.isDark ? 'text-slate-300' : 'text-slate-600'} mb-1">Group Name</label>
          <input type="text" id="group-name-input" placeholder="e.g. Project Team" required class="w-full px-3.5 py-2.5 ${state.isDark ? 'bg-slate-950/60 border-white/10 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'} border rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-all" />
        </div>
        <button type="submit" class="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl text-xs shadow-lg shadow-blue-500/25 border border-white/10 transition-all">Create Group</button>
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
    API.request(`/chats/${chatId}/read`, { method: 'POST' }).catch(() => {});
    const chat = state.chats.find(c => c.id === chatId);
    if (chat) chat.unread_count = 0;
  } catch (e) {
    console.error('Failed to load messages:', e);
  }
}

function bindMainEvents() {
  // Theme Toggle
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

  // Lightbox close
  document.getElementById('lightbox-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'lightbox-modal' || e.target.closest('#btn-close-lightbox')) {
      state.lightboxMedia = null;
      render();
    }
  });

  // Lightbox click on image preview
  document.querySelectorAll('[data-lightbox]').forEach(el => {
    el.addEventListener('click', () => {
      state.lightboxMedia = el.getAttribute('data-lightbox');
      render();
    });
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

  // Shuffle Anime Avatar (Silent)
  document.getElementById('btn-shuffle-avatar')?.addEventListener('click', async () => {
    const randomAnime = getRandomAnimeAvatar();
    try {
      await API.request('/auth/me', {
        method: 'PUT',
        body: JSON.stringify({ avatar_url: randomAnime.url })
      });
      state.user.avatar_url = randomAnime.url;
      localStorage.setItem('logsapp_user', JSON.stringify(state.user));
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
    state.activeChatId = null;
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
      localStorage.setItem('logsapp_active_chat_id', res.chat.id);
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

// 3s Smart Polling (100% Silent)
setInterval(async () => {
  if (state.token && state.activeChatId) {
    try {
      const data = await API.request(`/messages/${state.activeChatId}`);
      const incoming = data.messages || [];
      if (incoming.length !== state.activeMessages.length) {
        state.activeMessages = incoming;
        render();
        const container = document.getElementById('messages-container');
        if (container) container.scrollTop = container.scrollHeight;
        await loadChats();
      }
    } catch (e) {}
  }
}, 3000);

// App Initialization with Hard Reload State Preservation
(async function init() {
  if (state.token) {
    // 1. Sync User Profile from Database
    try {
      const meData = await API.request('/auth/me');
      if (meData.user) {
        state.user = meData.user;
        localStorage.setItem('logsapp_user', JSON.stringify(meData.user));
      }
    } catch (e) {}

    // 2. Load all chats
    await loadChats();

    // 3. Restore active chat and its messages / images immediately on reload
    if (state.activeChatId) {
      await loadMessages(state.activeChatId);
    }
  }
  render();
})();
