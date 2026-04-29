/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  theme: {
    extend: {
      colors: {
        accent:   '#00FFA3',
        accent2:  '#0EA5E9',
        missing:  '#FF4D6D',
        surface:  '#0F1318',
        surface2: '#161C23',
        border:   '#1E2730',
      }
    }
  }
}
// tailwind.config.js
