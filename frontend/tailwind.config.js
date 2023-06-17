/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
      colors: {
        black: colors.black,
        white: colors.white,
        green: colors.green,
        indigo: colors.indigo,
        transparent: 'transparent',
        current: 'currentColor',
        'gray-line': '#D9D9D9',
        'blue-text-button': '#2B78E4',
        'hover-color-button': '#C1D7F6',
        'click-color-button': '#72ABFA',
        'purple-text': '#2C2738',
        'hover-color-button-back': '#256CD0',
        'click-color-button-back': '#205DB2',
        'sky-blue': '#7A96BD',
        'suspend-session-button-color': '#EC7373',
        'hover-suspend-session-color':'#D64141',
        'click-suspend-session-color':'#AF1F1F',
        'rest-button-color': '#4ACD50',
        'hover-rest-color': '#25AD2A',
        'click-rest-color':'#108D15'
      },
  },
  plugins: [],
}
