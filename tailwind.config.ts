import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        resume: {
          10: '#F3F8FF',
          50: '#E7EEFA',
          100: '#C7D6E4',
          200: '#A8B9CC',
          300: '#889DB3',
          400: '#7188A1',
          500: '#59748F',
          600: '#4C667E',
          700: '#3C5268',
          800: '#2E4052',
          900: '#1C2C3A',
        },
        custom: {
          grey: '#E2E7ED',
          grey100: '#E5E5E5',
        },
      },
      borderRadius: {
        md: '4px',
      },
      boxShadow: {
        'level-4px-0.25': '0px 4px 4px rgba(0, 0, 0, 0.25)',
        'level-8dp':
          '0px 8px 10px rgba(0, 0, 0, 0.14), 0px 3px 14px rgba(0, 0, 0, 0.12), 0px 5px 5px rgba(0, 0, 0, 0.2)',
        'level-4dp':
          '0px 4px 5px rgba(0, 0, 0, 0.14), 0px 1px 10px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.2)',
        'level-hard': 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      screens: {
        'max-md': { max: '767px' },
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInTop: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        bounce: {
          '0%, 100%': {
            transform: 'translateY(-5%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in',
        slideInRight: 'slideInRight 0.5s ease-out',
        slideInTop: 'slideInTop 0.5s ease-out',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        bounce: 'bounce 1s infinite',
        wiggle: 'wiggle 1s ease-in-out infinite',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;
