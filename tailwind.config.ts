import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        surface: {
          DEFAULT: "#ffffff",
          50: "#fafafa",
          100: "#f4f4f5",
          200: "#e4e4e7",
          300: "#d4d4d8",
          card: "#ffffff",
        },
        brand: {
          orange: "#ff6b00", // Shurian Official Orange
          "orange-hover": "#ea580c",
          "orange-light": "#fff7ed",
          "orange-border": "#fed7aa",
          black: "#09090b",
          dark: "#18181b",
        },
        orange: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#ff6b00",
          600: "#ea580c",
          700: "#c2410c",
        },
        zinc: {
          850: "#1f1f23",
          950: "#09090b",
        },
      },
      fontFamily: {
        headline: ["var(--font-jakarta)", "Plus Jakarta Sans", "sans-serif"],
        body: ["var(--font-inter)", "Inter", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      boxShadow: {
        soft: "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        "soft-lg": "0 10px 25px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)",
        "glow-orange": "0 0 25px rgba(255, 107, 0, 0.25)",
        "glow-orange-sm": "0 0 12px rgba(255, 107, 0, 0.18)",
      },
    },
  },
  plugins: [],
};

export default config;
