/**  @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "custom-blue-dark": "#06308e",
        "custom-blue-light": "#A5EEF0",
        'color1': '#50cec9',
        'color2': '#167bdc',
        'color3': '#a164e8'
      },
    },
  },
  plugins: [],
};
