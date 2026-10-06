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
        oil: {
          navy: '#002B49',       // Official OIL Deep Navy
          darkNavy: '#001A30',   // Header Dark Navy
          crimson: '#C41E3A',    // Official Primary Red Accent
          maroon: '#800020',     // Corporate Maroon
          gold: '#FF9933',       // Indian Saffron / Gold
          amber: '#E65100',
          bgLight: '#F8FAFC',    // Portal Light Background
          cardLight: '#FFFFFF',
          bgDark: '#080E1A',     // High Contrast / Night Mode
          cardDark: '#0F1A2E'
        }
      },
      fontFamily: {
        sans: ['Fredoka', 'sans-serif'],
        mono: ['Fredoka', 'monospace']
      }
    },
  },
  plugins: [],
}
