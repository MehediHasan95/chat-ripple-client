/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        signika: ["Signika Negative", "sans-serif"],
      },
      colors: {
        frenchPlum: "#851A50",
        platinum: "#E5E4E9",
        desire: "#F52D3A",
        pastelGreen: "#00DD73",
      },
      backgroundColor: {
        frenchPlum: "#851A50",
        platinum: "#E5E4E9",
        desire: "#F52D3A",
        pastelGreen: "#00DD73",
      },
    },
  },
  daisyui: {
    themes: ["light"],
  },
  plugins: [require("daisyui")],
};
