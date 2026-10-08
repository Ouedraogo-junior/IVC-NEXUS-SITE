/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        nexus: {
          DEFAULT: '#1D3557',
          dark: '#0D1F33',
          mid: '#152844',
        },
        impact: {
          DEFAULT: '#FF6B00',
          light: '#FF8C33',
        },
        slateText: '#4A5568',
        sectionbg: '#F5F5F7',
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
