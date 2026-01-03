import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#0F172A',
          'dark-light': '#1E293B',
          green: '#34D399',
          'green-bright': '#22C55E',
          'green-glow': '#4ADE80',
          'green-light': '#86EFAC', // Verde muito claro (quase branco)
          'green-dark': '#10B981', // Verde escuro
          red: '#FB7185',
          'red-bright': '#F87171',
          'red-dark': '#EF4444',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
          glow: {
            '0%': { boxShadow: '0 0 5px #22C55E, 0 0 10px #22C55E' },
            '100%': { boxShadow: '0 0 10px #22C55E, 0 0 20px #22C55E, 0 0 30px #22C55E' },
          },
      },
    },
  },
  plugins: [],
}
export default config

