/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'shippiyo-orange': '#FFA500', // You can replace this hex code with the exact orange from your logo
      },
    },
  },
  plugins: [],
}