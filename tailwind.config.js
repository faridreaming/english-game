/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "index.html",
    "game-0.html",
    "game-1.html",
    "game-2.html",
    "game-3.html",
    "dist/js/script.js",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#0f172a",
        midnight: "#334155",
        charcoal: "#64748b",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
