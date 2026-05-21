/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        up: "#ef4444",
        down: "#22c55e",
        cyan: "#00d4ff",
        dark: "#0f0f1a",
        card: "#1a1a2e",
        border: "#2a2a4e"
      }
    }
  },
  plugins: []
}
