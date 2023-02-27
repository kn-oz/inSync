/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      "white": "#f8fbff",
      "primary": "#e24f50",
      "accent": "#53ffd5",
      "gray": "#d6d4d1",
      "gray-2": "#463e3e",
      "black": "#000000",
    },
    fontFamily: {
      "sans": ["Titillium Web", "sans-serif"],
      "serif": ["Lora", "serif"],
      "mono": ['Nova Mono', "monospace"], 
    },
    extend: {},
  },
  plugins: [],
}