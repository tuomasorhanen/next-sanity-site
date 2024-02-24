/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],  theme: {
   
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
    },
  },
  plugins: [],
};
