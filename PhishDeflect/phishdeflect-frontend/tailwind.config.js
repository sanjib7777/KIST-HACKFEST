/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        header: ["Archivo Black", "sans-serif"],
        subheader: ["Archivo", "sans-serif"],
        body: ["Archivo Narrow ", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
};
