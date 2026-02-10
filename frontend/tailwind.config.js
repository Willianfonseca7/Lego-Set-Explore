/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'lego-red': '#D01012',
        'lego-yellow': '#FFD500',
        'lego-blue': '#0055BF',
      },
    },
  },
  plugins: [],
}
