/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#7200ff",
          secondary: "#ff2b00",
          accent: "#da0000",
          neutral: "#000b14",
          "base-100": "#e1ffef",
          info: "#0069fa",
          success: "#00b63e",
          warning: "#fa9d00",
          error: "#e2000b",
        },
      },
    ],
  },
  plugins: [require("tailwind-scrollbar-hide"), require("daisyui"), require("flowbite/plugin")],
};
