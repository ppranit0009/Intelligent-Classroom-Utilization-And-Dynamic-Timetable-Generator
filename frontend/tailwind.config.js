/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        theme: {
          bg: '#0b1220',
          text: '#eaf0ff',
          muted: 'rgba(234,240,255,0.72)',
          line: 'rgba(234,240,255,0.14)',
          panel: 'rgba(255,255,255,0.06)',
        },
        brand: {
          cyan: '#6ee7ff',
          purple: '#a78bfa',
          green: '#34d399',
        }
      },
      borderRadius: {
        'theme': '18px',
      },
      boxShadow: {
        'theme': '0 18px 60px rgba(0,0,0,0.45)',
      }
    },
  },
  plugins: [],
}
