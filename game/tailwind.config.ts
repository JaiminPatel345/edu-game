import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}", "../packages/shared/**/*.{ts,tsx,mdx,json}"] ,
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#5A4BFF",
          secondary: "#FF8A65",
          accent: "#00C4B3",
          muted: "#F2F5FF",
        },
        surface: {
          DEFAULT: "#0F172A",
          light: "#F8FAFC",
        },
        text: {
          primary: "#0F172A",
          inverted: "#F8FAFC",
          muted: "#475569",
        },
      },
      fontFamily: {
        display: ["'Baloo 2'", "cursive"],
        body: ["'Inter'", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 10px 30px rgba(90, 75, 255, 0.2)",
      },
    },
  },
  plugins: [],
};

export default config;
