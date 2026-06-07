import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Wired from next/font via CSS variables in app/layout.tsx
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      colors: {
        // Design tokens — backed by CSS variables defined in globals.css
        dark: "var(--dark)",
        "dark-2": "var(--dark-2)",
        green: {
          DEFAULT: "var(--green)",
          bright: "var(--green-bright)",
          deep: "var(--green-deep)",
        },
        orange: "var(--orange)",
        ink: "var(--ink)",
        body: "var(--body)",
        faint: "var(--faint-d)",
        cream: "var(--cream)",
        "line-l": "var(--line-l)",
        "line-d": "var(--line-d)",
      },
      maxWidth: {
        wrap: "1180px",
      },
      borderRadius: {
        card: "18px",
        "card-lg": "26px",
      },
    },
  },
  plugins: [],
};

export default config;
