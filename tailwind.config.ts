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
        accent: 'var(--color-accent, #5C949C)',
        layer: 'var(--color-layer, #F5F5F5)',
      },
      borderRadius: {
        'app': '10px',
      },
      boxShadow: {
        'app': 'rgba(0, 0, 0, 0.15) 0px 3px 3px 0px',
      },
    },
  },
  plugins: [],
};
