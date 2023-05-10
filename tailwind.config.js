/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/desktop/**/*.njk',
    './views/desktop/*.njk',
    './views/mobile/*.njk',
    './views/mobile/**/*.njk',
    './utils/*.js,',
    './utils/**/*.js,'
  ],
  theme: {
    // fontFamily
    extend: {
      
      fontFamily:{
        nunito: ["nunito", "sans-serif"]
      }
    },
    screens:{
      'sm':'550px',
      // => @media (min-width: 550px) { ... }
      'md':'850px',
      // => @media (min-width: 850px) { ... }
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}

