/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fff1f2",
          100: "#ffe4e6",
          200: "#fecdd3",
          300: "#fda4af",
          400: "#fb7185",
          500: "#f43f5e",
          600: "#e11d48",
          700: "#be123c",
          800: "#9f1239",
          900: "#881337",
          950: "#4c0519",
        },
        velora: {
          50: "#fef7f7",
          100: "#ffe3ec",
          200: "#ffcdd8",
          300: "#ffa8bc",
          400: "#ff7396",
          500: "#f04871",
          600: "#d291bc", // Brand primary
          700: "#a6467a",
          800: "#8b3e68",
          900: "#77385a",
          950: "#451c30",
        },
        "velora-light": "#FFE3EC", // Brand light pink
        "velora-primary": "#D291BC", // Brand primary pink
      },
      animation: {
        marquee: "marquee var(--duration, 40s) linear infinite",
        "marquee-reverse":
          "marquee-reverse var(--duration, 40s) linear infinite",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-50% - var(--gap, 1rem)))" },
        },
        "marquee-reverse": {
          from: { transform: "translateX(calc(-50% - var(--gap, 1rem)))" },
          to: { transform: "translateX(0)" },
        },
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
