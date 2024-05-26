/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html", "dist/script.js"],
  theme: {
    extend: {
      colors: {
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
