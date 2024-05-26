/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html", "dist/script.js"],
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
