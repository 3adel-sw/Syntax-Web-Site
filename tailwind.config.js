export default {
  content: ["./**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        '3xl': '2100px',
      },
      colors: {
        primary: "#323896",
        secondary: "#00ACEF",
        pageBackground: "#F9FBFC",
        cardBackground: "#FFFFFF",
        borderLight: "#F1F5F7",
        dark: "#1F2937",
        light: "#F9FAFB",
        text: "#333",
        primaryHover: "#2a2f7d",
        greyTertiary: "#9CA3AF",
      },
      boxShadow: {
        card: "0 4px 10px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
// export default