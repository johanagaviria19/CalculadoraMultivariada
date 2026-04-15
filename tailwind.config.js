/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./public/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0d1117',
        panel: '#161b22',
        text: '#e6edf3',
        muted: '#8b949e',
        accent: '#2f81f7',
        danger: '#f85149'
      }
    },
  },
  plugins: [],
}