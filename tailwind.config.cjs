/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sp: {
          bg: "#050409",
          card: "#111018",
          card2: "#17131f",
          text: "#f6f1e9",
          muted: "#b8a892",
          gold: "#e6b980",
          gold2: "#eacda3",
          darkGold: "#130f08",
          blue: "#111a33",
          rose: "#29121f",
          purple: "#1b1730",
        },
      },
      fontFamily: {
        display: ["Georgia", "Times New Roman", "serif"],
        serif: ["Georgia", "Times New Roman", "serif"],
        sans: [
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Text",
          "sans-serif",
        ],
      },
      borderRadius: {
        sp: "32px",
        "sp-sm": "18px",
        pill: "999px",
      },
      boxShadow: {
        "sp-soft": "0 18px 45px rgba(0, 0, 0, 0.65)",
        "sp-gold": "0 20px 60px rgba(230, 185, 128, 0.22)",
      },
      maxWidth: {
        "sp-page": "1880px",
        "sp-readable": "980px",
        "sp-narrow": "1320px",
      },
    },
  },
  plugins: [],
};