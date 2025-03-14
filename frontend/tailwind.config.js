/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        softGray: "#f5f5f5",
        softTeal: "#a0d9d9",
        softRose: "#f7c6c6",
      },
    },
  },
  plugins: [],
}