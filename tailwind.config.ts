import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "custom-hover-gradient":
          "linear-gradient(70deg, #1951C3, #25ACEB, #2E82EE)",
        "custom-hover-gradient-wallet":
          "linear-gradient(70deg, #0F1A92, #25ACEB, #3968E3)",
        "gradient-for-wallet":
          "linear-gradient(90deg, #1D4B41, #16a085, #2980b9)",
      },

      // screens: {
      //   xs: { max: "500px" },
      //   xss: { max: "600px" },
      // },
      screens: {
        xs: "500px", // Custom breakpoint for 400px
        es: "300px",
      },
    },
  },
  plugins: [nextui()],
};
export default config;
