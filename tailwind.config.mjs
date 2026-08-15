/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0b2f5b',
          dark: '#072040',
          gold: '#c8961a',
          light: '#f7f4ec',
        },
      },
      boxShadow: {
        card: '0 12px 40px -14px rgba(7, 32, 64, 0.25)',
      },
    },
  },
  plugins: [],
};
