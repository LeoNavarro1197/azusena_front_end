/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        work: ['Work Sans', 'sans-serif']
        
      },
      colors: {
        customGreen: '#00B100',
    },
  },
  plugins: [],
}
}
