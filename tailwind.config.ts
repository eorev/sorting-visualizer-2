import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4deda1",
        "primary-content": "#05361f",
        "primary-dark": "#1fe889",
        "primary-light": "#7bf2b9",

        secondary: "#514ded",
        "secondary-content": "#ffffff",
        "secondary-dark": "#241fe8",
        "secondary-light": "#7e7bf2",

        background: "#181b1a",
        foreground: "#232926",
        border: "#3b4540",

        copy: "#fbfbfb",
        "copy-light": "#d6dcd9",
        "copy-lighter": "#9faca6",

        success: "#4ded4d",
        warning: "#eded4d",
        error: "#ed4d4d",

        "success-content": "#053605",
        "warning-content": "#363605",
        "error-content": "#ffffff"
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

export default config