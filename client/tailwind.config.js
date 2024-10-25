/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./public/index.html"],
  theme: {
    extend: {
      width: {
        main: "1220px",
      },
      backgroundColor: {
        main: "#ee3131",
      },
      colors: {
        main: "#ee3131",
      },
      flex: {
        1: "1 1 0%",
        2: "2 2 0%",
        3: "3 3 0%",
        4: "4 4 0%",
        5: "5 5 0%",
        6: "6 6 0%",
        7: "7 7 0%",
        8: "8 8 0%",
        9: "9 9 0%",
        10: "10 10 0%",
        11: "11 11 0%",
      },
      keyframes: {
        "side-top-sm": {
          "0%": {
            "--webkit-transform": "translateY(8px);",
            transform: "translateY(8px);",
          },
          "100%": {
            "--webkit-transform": "translateY(0px);",
            transform: "translateY(0px);",
          },
        },
        "side-top": {
          "0%": {
            "--webkit-transform": "translateY(40px);",
            transform: "translateY(40px);",
          },
          "100%": {
            "--webkit-transform": "translateY(0px);",
            transform: "translateY(0px);",
          },
        },
      },
      animation: {
        "side-top-sm": "side-top-sm 1s linear both",
        "side-top": "side-top-sm 1s linear both",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp"), require("@tailwindcss/forms")],
};
