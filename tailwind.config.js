/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}', './public/index.html'],
  // antd brings its own reset; Tailwind's preflight would override antd buttons/inputs
  corePlugins: { preflight: false },
  theme: {
    extend: {
      // Urbane Living logo colors - change here, whole site follows
      colors: {
        brand: {
          red: '#E40B12',
          'red-dark': '#C2090F',
          blue: '#4167B3',
          navy: '#1F2A44',
          ink: '#0F1628',
          soft: '#F7F8FB',
          gold: '#FFB800',
        },
      },
      fontFamily: {
        sans: ['Poppins', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        card: '0 10px 30px rgba(31, 42, 68, 0.08)',
        'card-hover': '0 24px 50px rgba(31, 42, 68, 0.14)',
        cta: '0 10px 24px rgba(228, 11, 18, 0.30)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-down': {
          from: { transform: 'translateY(-100%)' },
          to: { transform: 'translateY(0)' },
        },
        'slow-zoom': {
          from: { transform: 'scale(1.04)' },
          to: { transform: 'scale(1.12)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s ease both',
        'slide-down': 'slide-down 0.35s ease',
        'slow-zoom': 'slow-zoom 18s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
};
