import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        blink: {
          '0%, 100%': { backgroundColor: 'rgba(255, 255, 255, 0.2)' },
          '50%': { backgroundColor: 'rgba(255, 255, 255, 0.5)' },
        },
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        blink: 'blink 1s ease-in-out',
      },
    },
  },
  plugins: [],
} satisfies Config;
