/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          blue:   '#00c2ff',
          purple: '#a78bfa',
          cyan:   '#06b6d4',
          green:  '#34d399',
        },
        dark: {
          950: '#04060d',
          900: '#070b14',
          800: '#0d1117',
          700: '#111827',
          600: '#1a2236',
          500: '#243047',
        }
      },
      boxShadow: {
        'glow-blue':   '0 0 0 1px rgba(0,194,255,0.25), 0 0 30px rgba(0,194,255,0.10)',
        'glow-blue-lg':'0 0 0 1px rgba(0,194,255,0.35), 0 0 60px rgba(0,194,255,0.15), 0 0 120px rgba(167,139,250,0.05)',
        'glow-green':  '0 0 12px rgba(52,211,153,0.4)',
        'glow-red':    '0 0 12px rgba(248,113,113,0.4)',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        'scan': 'scan 2s linear infinite',
      },
      keyframes: {
        scan: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        }
      }
    },
  },
  plugins: [],
}
