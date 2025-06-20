/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Poppins"', 'sans-serif'],
      },
      colors: {
        brand: {
          primary: '#3ABF6C',  // Lime-green
          dark: '#1B4332',     // Dark green
          light: '#ECFDF5'     // Soft background
        }
      }
    },
  },
  plugins: [],
}
