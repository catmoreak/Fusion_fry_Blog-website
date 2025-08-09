/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eafff0',
          100: '#b8ffcc',
          200: '#7dff99',
          300: '#39ff5a',
          400: '#00ff1a',
          500: '#00ff66', // Neon green
          600: '#00e65c',
          700: '#00b347',
          800: '#008f39',
          900: '#006626',
        },
        // Optionally override blue utility classes for neon green
        'blue-50': '#eafff0',
        'blue-100': '#b8ffcc',
        'blue-200': '#7dff99',
        'blue-300': '#39ff5a',
        'blue-400': '#00ff1a',
        'blue-500': '#00ff66',
        'blue-600': '#00ff66',
        'blue-700': '#00b347',
        'blue-800': '#008f39',
        'blue-900': '#006626',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'loading-bar': 'loading-bar 3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'loading-bar': {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        }
      }
    },
  },
  plugins: [],
};