/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        deep: '#0B1410',      // Nền chính (Deep Moss)
        surface: '#121F18',   // Nền Sidebar
        glass: '#162620',     // Nền Card trong suốt
        glassHover: '#1E332B',
        gold: '#D4AF37',      // Màu điểm nhấn
        goldLight: '#F3E9D2',
        cream: '#F3E9D2',     // Màu chữ chính
        graytext: '#9CA3AF',
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Be Vietnam Pro"', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 20px rgba(212, 175, 55, 0.15)',
        'glow-strong': '0 0 25px rgba(212, 175, 55, 0.3)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        fadeIn: {
          'from': { opacity: '0', transform: 'translateY(10px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
