module.exports = {
  mode:'jit',
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      custom: ["Poppins"],
    },
    extend: {
      colors: {
        siena: "#e76f51",
        brown: "#f4a261",
        yellow: "#e9c46a",
        green: "#2a9d8f",
        charcoal: "#264653",
        darkGrey: "#626262",
        grey: "#E2E2E2",
        anothershadeofgrey: "#C4C4C4",
        cardGrey: "#848484",
        white: "#ffffff",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
