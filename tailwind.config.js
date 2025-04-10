/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6faf2',
          100: '#c0f5df',
          200: '#96efc9',
          300: '#67e9b2',
          400: '#3de49e',
          500: '#00c777',
          600: '#00b36b',
          700: '#009c5d',
          800: '#008550',
          900: '#006038',
        },
        dark: {
          50: '#e6e8eb',
          100: '#c1c5cc',
          200: '#989fa9',
          300: '#6e7886',
          400: '#4d5a6b',
          500: '#283951',
          600: '#223349',
          700: '#1a2b40',
          800: '#142337',
          900: '#020618',
        },
      },
    },
  },
  plugins: [],
}