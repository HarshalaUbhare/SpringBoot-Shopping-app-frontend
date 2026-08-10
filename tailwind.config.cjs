/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        border:      "hsl(var(--border))",
        input:       "hsl(var(--input))",
        ring:        "hsl(var(--ring))",
        background:  "hsl(var(--background))",
        foreground:  "hsl(var(--foreground))",
        primary: {
          DEFAULT:    "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT:    "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT:    "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT:    "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT:    "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT:    "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT:    "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        accent2: "hsl(var(--accent-2))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        glow: "0 0 0 1px hsl(var(--primary) / 0.25), 0 8px 30px -8px hsl(var(--primary) / 0.55)",
        "glow-lg": "0 0 0 1px hsl(var(--primary) / 0.3), 0 20px 60px -12px hsl(var(--primary) / 0.65)",
        "glow-sm": "0 4px 16px -4px hsl(var(--primary) / 0.45)",
        card: "0 1px 0 0 hsl(0 0% 100% / 0.04) inset, 0 8px 24px -12px hsl(240 60% 2% / 0.6)",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, transparent, hsl(var(--background))), linear-gradient(hsl(var(--border) / 0.6) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border) / 0.6) 1px, transparent 1px)",
      },
      keyframes: {
        "fade-in-up": {
          "0%":   { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition:  "400px 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-12px)" },
        },
        "spin-slow": {
          "0%":   { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%":      { opacity: "1", transform: "scale(1.06)" },
        },
        aurora: {
          "0%, 100%": { transform: "translate(0%, 0%) rotate(0deg) scale(1)" },
          "33%":      { transform: "translate(6%, -8%) rotate(8deg) scale(1.08)" },
          "66%":      { transform: "translate(-6%, 6%) rotate(-6deg) scale(0.96)" },
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%":      { backgroundPosition: "100% 50%" },
        },
        shine: {
          "0%":   { transform: "translateX(-150%) skewX(-20deg)" },
          "100%": { transform: "translateX(150%) skewX(-20deg)" },
        },
        "bounce-in": {
          "0%":   { transform: "scale(0.4)", opacity: "0" },
          "60%":  { transform: "scale(1.15)", opacity: "1" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.35s ease both",
        shimmer: "shimmer 1.4s infinite",
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin-slow 12s linear infinite",
        "pulse-glow": "pulse-glow 2.5s ease-in-out infinite",
        aurora: "aurora 18s ease-in-out infinite",
        "gradient-x": "gradient-x 6s ease infinite",
        shine: "shine 1.2s ease",
        "bounce-in": "bounce-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
