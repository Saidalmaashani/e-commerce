/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        slate: {
          '900/50': 'rgba(15, 23, 42, 0.5)',
          '800/50': 'rgba(30, 41, 59, 0.5)',
          '700/50': 'rgba(51, 65, 85, 0.5)',
          '600/50': 'rgba(71, 85, 105, 0.5)',
        },
      },
      backdropBlur: {
        md: '12px',
      },
    },
  },
  plugins: [],
};
