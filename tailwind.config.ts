import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        garage: {
          bg: "#0a0a0f",
          card: "rgba(255,255,255,0.04)",
          border: "rgba(255,255,255,0.08)",
          purple: "#667eea",
          teal: "#00C0A6",
          muted: "#8b8b9e",
        },
      },
      fontFamily: {
        sans: ["Outfit", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        "garage-gradient":
          "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #00C0A6 100%)",
        "garage-mesh":
          "radial-gradient(ellipse at 20% 50%, rgba(102,126,234,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(0,192,166,0.1) 0%, transparent 40%), radial-gradient(ellipse at 50% 80%, rgba(118,75,162,0.1) 0%, transparent 40%)",
      },
      animation: {
        pulseGlow: "pulseGlow 2s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 8px rgba(0,192,166,0.4)" },
          "50%": { boxShadow: "0 0 20px rgba(0,192,166,0.7)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
