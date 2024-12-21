/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/components/**/*.{js,jsx}",
    "./src/pages/**/*.{js,jsx}",
    "./public/index.html",
  ],
  
  theme: {
    extend: {
      colors:{
        'primary':"#5F6FFF"
      }
    },
  },
  plugins: [],
}