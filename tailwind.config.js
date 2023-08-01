/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primario: "#223B82",
        'primario-dark': "#040e22",
        'secondary-dark': "#0D1F46"
      }
    },
  },
  plugins: [],
}

