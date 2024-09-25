/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "side-nav": "0px 4px 4px 0px #00000040 , 0px 4px 4px 0px #00000040",
        "order-detail-shadow": "0px 9.13px 54.75px 0px #E2ECF980",
        "product-card-shadow": "0px 2.1px 4.21px 0px #00000005 , 0px 0px 6.31px 0px #00000005",
        "input-shadow":"0px 2px 4px 0px #00000005 , 0px 0px 6px 0px #00000005",
        "vendor-card-shadow":"0px 10.29px 61.73px 0px #E2ECF980",
        "popover-shadow":"0px 2px 4px 0px #0000000D"
      },
      backgroundImage: {
        "header-search-gradient":
          "linear-gradient(90.38deg, #FFFFFF 0.09%, #DFFFFD 99.66%)",
        "dashboard-card-gradient":
          "linear-gradient(270.41deg, #8BFFF9 0.35%, rgba(255, 233, 223, 0.76) 99.65%)",
        "pagination-gradient":"linear-gradient(0deg, #FFFFFF 75.34%, rgba(255, 255, 255, 0) 100%)"
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },

      screens: {
        xs: "450px",
      },
    },
  },
  plugins: [],
};
