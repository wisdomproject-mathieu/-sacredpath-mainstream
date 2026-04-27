// tailwind.config.cjs
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--color-bg)",
        card: "var(--color-card)",
        accent: "var(--color-accent)",
        "accent-soft": "var(--color-accent-soft)",
        muted: "var(--color-muted)",
      },
      fontFamily: {
        serif: ["Georgia", "Times New Roman", "serif"],
        sans: ["system-ui", "-apple-system", "sans-serif"], // Maps to your CSS var
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
      }
    },
  },
  plugins: [],
};