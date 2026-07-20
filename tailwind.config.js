/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          deep: '#0d1b12',
          overlay: 'rgba(13, 27, 18, 0.72)',
        },
        wood: '#a97842',
        cream: '#f6f1e8',
        ink: '#101010',
        sage: 'rgba(72, 88, 68, 0.82)',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        script: ['"Pinyon Script"', 'cursive'],
      },
    },
  },
  plugins: [],
}
