import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#050a14",
          900: "#0a0f1e",
          800: "#0d1117",
          700: "#111827",
          600: "#1a2235",
          500: "#1e293b",
        },
        violet: {
          950: "#2e1065",
          900: "#4c1d95",
          800: "#5b21b6",
          700: "#6d28d9",
          600: "#7c3aed",
          500: "#8b5cf6",
          400: "#a78bfa",
          300: "#c4b5fd",
        },
        emerald: {
          950: "#022c22",
          900: "#064e3b",
          800: "#065f46",
          700: "#047857",
          600: "#059669",
          500: "#10b981",
          400: "#34d399",
          300: "#6ee7b7",
        },
        amber: {
          600: "#d97706",
          500: "#f59e0b",
          400: "#fbbf24",
          300: "#fcd34d",
        },
        sky: {
          600: "#0284c7",
          500: "#0ea5e9",
          400: "#38bdf8",
          300: "#7dd3fc",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-gradient": "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(124, 58, 237, 0.3) 0%, transparent 60%)",
        "grid-pattern": "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid": "40px 40px",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "gradient-x": "gradient-x 8s ease infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "shimmer": "shimmer 2.5s linear infinite",
        "typing": "typing 3.5s steps(40, end)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        glow: {
          from: { boxShadow: "0 0 20px rgba(124, 58, 237, 0.3)" },
          to: { boxShadow: "0 0 40px rgba(124, 58, 237, 0.7), 0 0 80px rgba(124, 58, 237, 0.3)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        typing: {
          from: { width: "0" },
          to: { width: "100%" },
        },
      },
      boxShadow: {
        "glow-violet": "0 0 20px rgba(124, 58, 237, 0.4), 0 0 60px rgba(124, 58, 237, 0.15)",
        "glow-emerald": "0 0 20px rgba(16, 185, 129, 0.4), 0 0 60px rgba(16, 185, 129, 0.15)",
        "glow-amber": "0 0 20px rgba(245, 158, 11, 0.4), 0 0 60px rgba(245, 158, 11, 0.15)",
        "glow-sky": "0 0 20px rgba(14, 165, 233, 0.4), 0 0 60px rgba(14, 165, 233, 0.15)",
        "card": "0 4px 24px rgba(0, 0, 0, 0.4), 0 1px 0 rgba(255, 255, 255, 0.05) inset",
        "card-hover": "0 8px 40px rgba(0, 0, 0, 0.6), 0 1px 0 rgba(255, 255, 255, 0.08) inset",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
};

export default config;
