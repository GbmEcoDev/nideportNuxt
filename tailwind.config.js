/** @type {import('tailwindcss').Config} */

  module.exports = {
  
  content: [
    "./components/**/*.{js,vue,ts}",
    "./middleware/**/*.{js,vue,ts}",
    "./composables/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
 /*  darkMode: 'class', */
  theme: {
    extend: {
      colors: {
        body: "rgb(var(--color-bg))",
        "box-bg": "rgb(var(--color-box))",
        "box-shadow": "rgb(var(--box-sd))",
        "box-border": "rgb(var(--box-border))",
        primary: "#0FAEA9",
        secondary: "#007A77",
        thirdy: "#007A77",
        fourty: "#02A327",
        fivety: "#016A81",
        sixty: "#0F5F60",
        hovery: "#058849",
        cta: "#08C168",
        "body-color": "#462C64",
        "gray-color": "",
        green: {
          50: '#EFFDF5',
          100: '#D9FBE8',
          200: '#B3F5D1',
          300: '#75EDAE',
          400: '#00DC82',
          500: '#00C16A',
          600: '#00A155',
          700: '#007F45',
          800: '#016538',
          900: '#0A5331',
          950: '#052e16'
        }
      },
      zIndex: {
        60: "60",
        70: "70",
      },
      screens: {
        xs: "400px",
        sm: '640px',       
        md: '768px',  
        lg: '1024px',  
        xl: '1280px'
      },
    },

  },
};
