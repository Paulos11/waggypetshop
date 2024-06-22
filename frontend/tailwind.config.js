/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Chilanka: ['Chilanka', 'cursive'],
      },colors: {
        'custom-black': '#4a4a4a',
      },
    },
  },variants: {
    extend: {
      backgroundColor: ['active'],
    },
  },
  plugins: [],
};