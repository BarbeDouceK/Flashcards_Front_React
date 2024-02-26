/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto Condensed', 'sans-serif'],
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#ff00d1",
          secondary: "#ff6b00",
          accent: "#0053f0",
          neutral: "#191b17",
          "base-100": "#292929",
          info: "#3b8fff",
          success: "#008300",
          warning: "#e63700",
          error: "#dd002d",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}

