/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#0D0D0D',
        surface: '#1A1A1A',
        border: '#2A2A2A',
        light: '#F0F0F0',
        accent: {
          primary: '#3B82F6',
          hover: '#2563EB',
        },
      },
      fontFamily: {
        geist: ['Geist', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
