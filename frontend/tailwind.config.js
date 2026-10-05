/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        blogger: {
          orange: '#FF5722',
          'orange-dark': '#E64A19',
          'orange-light': '#FF8A65',
          'orange-bg': '#FBE9E7',
        },
      },
      fontFamily: {
        sans: ['Google Sans', 'Roboto', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
