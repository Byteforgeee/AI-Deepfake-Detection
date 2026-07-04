/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        base: {
          950: "#080B10",
          900: "#0B0F16",
          800: "#131822",
          700: "#1B222F",
          600: "#2A3342",
        },
        verify: {
          400: "#5FE8B8",
          500: "#3DDC97",
          600: "#2CB87D",
        },
        alert: {
          400: "#FF7A90",
          500: "#FF5470",
        },
        ink: {
          100: "#E7ECF3",
          300: "#B7C0CC",
          500: "#8B96A5",
          700: "#5A6472",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      keyframes: {
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: 0.6 },
          "50%": { opacity: 1 },
        },
      },
      animation: {
        scan: "scan 3s linear infinite",
        pulseGlow: "pulseGlow 2.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
