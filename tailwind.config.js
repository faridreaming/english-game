/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html", "dist/js/script.js"],
  theme: {
    extend: {
      colors: {
        primary: "#14b8a6",
        secondary: "#f59e0b",
        gray: "#64748b",
        dark: "#0f172a",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
