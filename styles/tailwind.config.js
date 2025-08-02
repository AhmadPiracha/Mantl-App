/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Mantl brand colors
        primary: "#00ff88",
        background: "#000000",
        surface: "#1a1a1a",
        border: "#333333",

        // Mode colors
        vent: "#EF4444",
        unload: "#F59E0B",
        mantl: "#3B82F6",
        locker: "#10B981",

        // Text colors
        text: {
          primary: "#ffffff",
          secondary: "#999999",
          tertiary: "#666666",
        },
      },
      fontFamily: {
        sans: ["System"],
        bold: ["System-Bold"],
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "20px",
        xl: "24px",
        xxl: "32px",
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
    },
  },
  plugins: [],
}
