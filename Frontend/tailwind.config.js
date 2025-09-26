/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand:    "#ff9c00",
        headline: "#154056",
        canvas:   "#f7f7f7",
      },
    },
  },
  plugins: [],
}
