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
      screens: {
        xs: "430px", // Custom breakpoint for small mobile devices
      },
    },
  },
  variants: {},
  plugins: [],
};
