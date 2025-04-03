/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        gmarketBold: ["GmarketSansBold", "sans-serif"],
        gmarketLight: ["GmarketSansLight", "sans-serif"],
        gmarketMedium: ["GmarketSansMedium", "sans-serif"],
        koPubWoldLight: ["KoPubWoldLight", "sans-serif"],
        koPubWoldMedium: ["KoPubWoldMedium", "sans-serif"],
        koPubWoldBold: ["KoPubWoldBold", "sans-serif"],
      },
    },
  },
  plugins: [],
};
