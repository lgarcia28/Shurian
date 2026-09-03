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
        background: "#060b17", // Deep Dark Navy
        navy: {
          950: "#040813",
          900: "#060b17",
          850: "#091024",
          800: "#0d1836",
          700: "#13234f",
          600: "#1d367a",
          500: "#2748a3",
        },
        surface: {
          DEFAULT: "#0b1329",
          50: "#16254a",
          100: "#0e1a38",
          200: "#0b1329",
          300: "#060b17",
          card: "rgba(11, 19, 41, 0.78)",
          glass: "rgba(9, 16, 36, 0.85)",
        },
        brand: {
          orange: "#ff6b00", // Shurian Circuit Orange
          "orange-hover": "#ff7e1a",
          "orange-light": "#ffa04d",
          "orange-dark": "#e05500",
          navy: "#0b1329",
          "navy-dark": "#060b17",
          blue: "#1e3a8a",
        },
        orange: {
          400: "#fb923c",
          500: "#ff6b00",
          600: "#ea580c",
          700: "#c2410c",
        },
        accent: {
          DEFAULT: "#ff6b00",
          blue: "#3b82f6",
          glow: "rgba(255, 107, 0, 0.4)",
        },
      },
      fontFamily: {
        headline: ["var(--font-jakarta)", "Plus Jakarta Sans", "sans-serif"],
        body: ["var(--font-inter)", "Inter", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      boxShadow: {
        glow: "0 0 25px rgba(255, 107, 0, 0.35)",
        "glow-lg": "0 0 45px rgba(255, 107, 0, 0.5)",
        "glow-sm": "0 0 12px rgba(255, 107, 0, 0.25)",
        "glow-navy": "0 0 35px rgba(30, 58, 138, 0.35)",
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.45)",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
      },
      keyframes: {
        glowPulse: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
