/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        night: {
          950: 'hsl(243, 96%, 9%)',
          900: 'hsl(243, 60%, 12%)',
          800: 'hsl(243, 27%, 20%)',
          700: 'hsl(243, 23%, 24%)',
          600: 'hsl(243, 20%, 30%)',
        },
        accent: {
          400: 'hsl(248, 85%, 70%)',
          500: 'hsl(248, 70%, 60%)',
          600: 'hsl(248, 70%, 52%)',
        },
        muted: 'hsl(250, 6%, 65%)',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Syne"', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.35s ease forwards',
        'slide-up': 'slideUp 0.4s ease forwards',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
}
