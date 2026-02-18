/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'terminal-green': '#00ff00',
        'terminal-black': '#0c0c0c',
        'theme-text': 'var(--color-text)',
        'theme-dim': 'var(--color-dim)',
        'theme-accent': 'var(--color-accent)',
        'theme-bg': 'var(--color-bg)',
        'charcoal': '#121212',
        'charcoal-light': '#1e1e1e',
        'charcoal-dark': '#0a0a0a',
        'soft-white': '#f3f4f6',
        'oatmeal': '#e5e5e5',
      },
      fontFamily: {
        mono: ['"Fira Code"', 'monospace'],
        sans: ['"Inter"', 'sans-serif'],
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        }
      }
    },
  },
  plugins: [],
}
