import axios from 'axios';

export const getApiBaseUrl = (): string => {
  // 1. Check custom saved server URL in localStorage
  const savedServer = localStorage.getItem('logsapp_server_url');
  if (savedServer) {
    return savedServer.replace(/\/+$/, '') + '/api';
  }

  // 2. Check environment variable (Vercel / Vite env)
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace(/\/+$/, '') + '/api';
  }

  // 3. Local Vite dev server on port 3000
  if (typeof window !== 'undefined' && window.location.port === '3000') {
    return 'http://localhost:5000/api';
  }

  // 4. Default: relative /api
  return '/api';
};

export const getServerOrigin = (): string => {
  const savedServer = localStorage.getItem('logsapp_server_url');
  if (savedServer) {
    return savedServer.replace(/\/+$/, '');
  }
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace(/\/+$/, '');
  }
  if (typeof window !== 'undefined' && window.location.port === '3000') {
    return 'http://localhost:5000';
  }
  return typeof window !== 'undefined' ? window.location.origin : '';
};

const api = axios.create();

// Dynamic baseURL interceptor
api.interceptors.request.use((config) => {
  if (!config.baseURL) {
    config.baseURL = getApiBaseUrl();
  }
  const token = localStorage.getItem('logsapp_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (!error.config.url.includes('/auth/login') && !error.config.url.includes('/auth/register')) {
        localStorage.removeItem('logsapp_token');
        localStorage.removeItem('logsapp_user');
        window.dispatchEvent(new Event('auth_logout'));
      }
    }
    return Promise.reject(error);
  }
);

export default api;
