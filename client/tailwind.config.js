/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb', // SmartPrep Royal Blue
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        slateDark: {
          bg: '#0b0f19',        // SmartPrep Deep Obsidian
          surface: '#111827',   // SmartPrep Surface
          card: '#1e293b',      // SmartPrep Elevated Card
          border: '#334155',    // Border
          hover: '#1f293d',
          text: '#f8fafc',
          subtext: '#94a3b8',
        },
        slateLight: {
          bg: '#f8fafc',        // SmartPrep Light Canvas
          surface: '#ffffff',   // Clean White Surface
          card: '#ffffff',
          border: '#e2e8f0',
          hover: '#f1f5f9',
          text: '#0f172a',
          subtext: '#64748b',
        },
        accent: {
          amber: '#f59e0b',
          gold: '#d97706',
          emerald: '#10b981',
          purple: '#8b5cf6',
          cyan: '#06b6d4',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Space Grotesk', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        heading: ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-blue': '0 0 24px rgba(37, 99, 235, 0.25)',
        'glow-amber': '0 0 20px rgba(245, 158, 11, 0.25)',
        'glow-card': '0 8px 32px 0 rgba(0, 0, 0, 0.36)',
      }
    },
  },
  plugins: [],
}
