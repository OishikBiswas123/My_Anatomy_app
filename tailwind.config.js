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
        background: {
          DEFAULT: '#0a0e17',
          secondary: '#111827',
          tertiary: '#1e293b',
          elevated: '#1a2234',
        },
        surface: {
          DEFAULT: '#151d2f',
          hover: '#1e293b',
          active: '#27354f',
          border: '#24324d',
        },
        anatomy: {
          bone: '#e2e8f0',
          muscle: '#f87171',
          ligament: '#38bdf8',
          nerve: '#facc15',
          vessel: '#ef4444',
          organ: '#fb923c',
        },
        accent: {
          cyan: '#06b6d4',
          sky: '#0ea5e9',
          blue: '#2563eb',
          teal: '#14b8a6',
          glow: 'rgba(6, 182, 212, 0.25)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 20px -5px rgba(6, 182, 212, 0.4)',
        'glow-blue': '0 0 20px -5px rgba(14, 165, 233, 0.4)',
        'hud': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}
