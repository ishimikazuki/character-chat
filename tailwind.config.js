/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // IkigAI Labs style colors
        primary: {
          DEFAULT: '#1A2B3C',
          light: '#2C4E6F',
          dark: '#0F1A24',
        },
        secondary: {
          DEFAULT: '#FF6B9D',
          light: '#FF8FB9',
          dark: '#E54D7F',
        },
        teal: {
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#0D9488',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #14B8A6 0%, #FF6B9D 100%)',
        'gradient-card': 'linear-gradient(135deg, #2DD4BF 0%, #FF8FB9 100%)',
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      animation: {
        'blink': 'blink 3s infinite',
        'sway': 'sway 2s ease-in-out infinite',
        'talk': 'talk 0.3s ease-in-out infinite',
      },
      keyframes: {
        blink: {
          '0%, 90%, 100%': { opacity: '1' },
          '95%': { opacity: '0.3' },
        },
        sway: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-3px)' },
        },
        talk: {
          '0%, 100%': { transform: 'scaleY(1)' },
          '50%': { transform: 'scaleY(0.95)' },
        },
      },
    },
  },
  plugins: [],
}
