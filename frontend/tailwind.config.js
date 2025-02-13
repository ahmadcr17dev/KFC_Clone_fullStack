/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['"Poppins"', "sans-serif"],
        montserrat: ['"Montserrat"', "sans-serif"],
        prompt: ['"Prompt"', "sans-serif"],
      },
    },
  },
  variants: {},
  plugins: [],
};
