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
          blue: '#4BA4DE', // Azul Espectro
          'blue-bright': '#4BA4DE',
          'blue-glow': '#4BA4DE',
          'blue-light': '#BAE6FD', // Azul claro
          'blue-dark': '#0284C7', // Azul escuro
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
          '0%': { boxShadow: '0 0 5px #4BA4DE, 0 0 10px #4BA4DE' },
          '100%': { boxShadow: '0 0 10px #4BA4DE, 0 0 20px #4BA4DE, 0 0 30px #4BA4DE' },
        },
      },
    },
  },
  plugins: [],
}

export default config
