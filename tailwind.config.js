/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "425px",
      },
      colors: {
        "body color": "#D1D7E3",
        vibrant: "#0F123F",
        smooth: "#F4F7FC",
      },
    },
  },
  plugins: [],
};
