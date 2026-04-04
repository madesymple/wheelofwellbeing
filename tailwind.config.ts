import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        "9xl": "100rem",
      },
      fontFamily: {
        heading: ["var(--font-quicksand)", "sans-serif"],
        body: ["var(--font-poppins)", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          DEFAULT: "#2A9D8F",
          light: "#5BB5A9",
          dark: "#1F7A6F",
        },
        accent: {
          DEFAULT: "#E9A23B",
          light: "#F0C06E",
          dark: "#C4832A",
        },
        cream: "#FDF8F0",
        warm: {
          50: "#FDF8F0",
          100: "#FAF0E1",
          200: "#F5E1C3",
        },
        spoke: {
          physical: "#E57373",
          mental: "#64B5F6",
          emotional: "#FFB74D",
          relational: "#F06292",
          financial: "#81C784",
          professional: "#9575CD",
          spiritual: "#4DB6AC",
          environmental: "#A1887F",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
} satisfies Config;
