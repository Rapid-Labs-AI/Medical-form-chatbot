/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        'xs': '365px',
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}