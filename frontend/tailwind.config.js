/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        shake: 'shake 0.35s',
        fadeIn: 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        shake: {
          '0%, 100%': {
            transform: 'translateX(0)',
          },
          '25%': {
            transform: 'translateX(5px)',
          },
          '50%': {
            transform: 'translateX(-5px)',
          },
          '75%': {
            transform: 'translateX(5px)',
          }
        },
        fadeIn: {
          '0%': {
            opacity: 0
          },
          '100%': {
            opacity: 1,
          }
        } 
      }
    },
  },
  plugins: [],
}

