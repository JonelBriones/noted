import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neutral: {
          950: "#0E1218",
          900: "#191B25",
          800: "#232530",
          700: "#2B303B",
          600: "#525866",
          500: "#717784",
          400: "#99ADAE",
          300: "#CACFD8",
          200: "#E0E4EA",
          100: "#F3F5F8",
          50: "#F5F7FA",
          0: "#FFFFFF",
        },
        blue: {
          700: "#2547D0",
          500: "#335CFF",
          50: "#EBF1FF",
        },
        green: {
          500: "#21C168",
          100: "#D1FEBE9",
        },
        red: {
          500: "#FB3748",
          100: "#FFD5DF",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
