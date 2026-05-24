import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#F0F1F3",
        surface: "#FFFFFF",
        ink: {
          DEFAULT: "#1A1A1A",
          muted: "#6B7280",
          subtle: "#9CA3AF",
        },
        brand: {
          start: "#FF4D00",
          end: "#FF8A00",
        },
        nav: {
          dark: "#1A1A1A",
          inactive: "#9CA3AF",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        serif: ["Georgia", "Times New Roman", "Times", "serif"],
      },
      borderRadius: {
        shell: "20px",
        card: "16px",
        pill: "9999px",
      },
      boxShadow: {
        card: "0 4px 20px rgba(0,0,0,0.04)",
        glow: "0 0 0 0.5px rgba(255,77,0,0.22), 0 2px 10px rgba(255,77,0,0.1)",
        fab: "0 4px 16px rgba(0,0,0,0.08)",
      },
      width: {
        sidebar: "248px",
      },
      maxWidth: {
        content: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
