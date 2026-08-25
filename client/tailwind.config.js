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
        wa: {
          dark: {
            bg: '#111b21',
            panel: '#202c33',
            chat: '#0b141a',
            bubble: '#005c4b',
            bubbleIn: '#202c33',
            hover: '#222e35',
            border: '#2a3942',
            text: '#e9edef',
            subtext: '#8696a0',
            accent: '#00a884',
            accentHover: '#06cf9c'
          },
          light: {
            bg: '#f0f2f5',
            panel: '#ffffff',
            chat: '#efeae2',
            bubble: '#d9fdd3',
            bubbleIn: '#ffffff',
            hover: '#f5f6f6',
            border: '#e9edef',
            text: '#111b21',
            subtext: '#667781',
            accent: '#008069',
            accentHover: '#017560'
          },
          royal: {
            gold: '#f59e0b',
            amber: '#d97706',
            purple: '#8b5cf6',
            glow: '#6366f1'
          }
        }
      }
    },
  },
  plugins: [],
}
