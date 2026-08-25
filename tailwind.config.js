/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        metal: {
          950: '#0a0a0c',
          900: '#121216',
          850: '#191920',
          800: '#22222b',
          700: '#343442',
          600: '#4c4c5e',
          accent: '#dc2626',
          gold: '#d97706',
          silver: '#94a3b8',
          blood: '#991b1b',
          parchment: '#fef08a',
        }
      },
      fontFamily: {
        metal: ['"UnifrakturMaguntia"', '"Metal Mania"', 'serif'],
        gothic: ['"Cinzel"', 'serif'],
        arabic: ['"Cairo"', '"Amiri"', 'sans-serif'],
        arabicDisplay: ['"Reem Kufi"', '"El Messiri"', 'sans-serif'],
        body: ['"Inter"', '"Montserrat"', 'sans-serif'],
      },
      boxShadow: {
        'metal-glow': '0 0 25px rgba(220, 38, 38, 0.35)',
        'metal-gold': '0 0 20px rgba(217, 119, 6, 0.3)',
        'book-shadow': '0 20px 40px rgba(0, 0, 0, 0.8), inset 0 0 10px rgba(0, 0, 0, 0.9)',
      }
    },
  },
  plugins: [],
}
