/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./style/**/*.css"],
  theme: {
    extend: {
      background: {
        "home": "url('/assets/img/horizon2.jpg')",
      }
    },
  },
  plugins: [],
}
