/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        opacity: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        translateTitle: {
          '0%': { transform: 'translateX(-8rem)' },
          '100%': { transform: 'translateX(0rem)' },
        },
        translateParagraph : {
           '0%': { transform: 'translateX(-8rem)' , opacity:0 },
          '100%': { transform: 'translateX(0rem)', opacity:1 },
        }
      },
      animation: {
        opacity: "opacity 0.3s ease-in-out",
        translateTitle: "translateTitle 0.6s ease-in-out",
        translateParagraph: "translateParagraph 0.9s linear",
      },
    },
  },
  plugins: [],
};
