import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'hsr-black': '#0a0a0a',
        'hsr-red': '#e6192e',    // Merah Crimson Sparkle
        'hsr-white': '#f5f5f5',
        'hsr-gray': '#1a1a1a',
      },
      backgroundImage: {
        'sparkle-gradient': 'linear-gradient(to bottom right, #0a0a0a, #e6192e, #0a0a0a)',
      },
    },
  },
  plugins: [],
};
export default config;