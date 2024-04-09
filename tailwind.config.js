/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        epilogue: ['Epilogue', 'sans-serif'],
      },
      boxShadow: {
        secondary: '10px 10px 20px rgba(2, 2, 2, 0.25)',
      },
      colors:{
        'light-gray' : "#1c1c24",
        green: "#4acd8d",
      },
      backgroundImage:{
        'contact':"linear-gradient(93.3deg, #13ADB7 0.97%, #7EEDF4 100%);"
      }
    },
  },
  plugins: [],
}

