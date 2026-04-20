import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brown: { dark: "#5C4033", mid: "#8D6E63", light: "#A1887F" },
        cream: "#F5EDE1",
        "cream-dark": "#EBD9C5",
        olive: "#6B705C",
        charcoal: "#1a1a1a",
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["DM Sans", "system-ui", "sans-serif"],
      },
      keyframes: {
        "fade-up": { "0%": { opacity: "0", transform: "translateY(20px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        "fade-in": { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        "img-swap": { "0%": { opacity: "0", transform: "scale(1.03)" }, "100%": { opacity: "1", transform: "scale(1)" } },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out forwards",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "img-swap": "img-swap 0.4s ease-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
