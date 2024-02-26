/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],  theme: {
    screens: {
      sm: '700px', //tablet
      md: '1100px', //small desktop or laptop
      lg: '1920px', // bigger desktop
    },
    extend: {
      fontFamily: {
        'gideon': ['"Gideon Roman"', 'serif']
      },
     colors: {
        bg: 'var(--color-bg, #FFFFFF)',
        text: 'var(--color-text, #000000)',
        accent: 'var(--color-accent, #BED1CF)',
        layer: 'var(--color-layer, #FFF7F1)',
      },
      borderRadius: {
        'app': '10px',
      },
      boxShadow: {
        'app': '0 0 10px 0 rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
};
