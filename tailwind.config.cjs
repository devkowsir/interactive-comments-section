/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,svg}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors: {
        'light-grayish-blue': 'hsl(239, 57%, 85%)',
        'grayish-blue': 'hsl(211, 10%, 45%)',
        'moderate-blue': 'hsl(238, 40%, 52%)',
        'dark-blue': 'hsl(212, 24%, 26%)',
        'soft-red': 'hsl(358, 79%, 66%)',
        'pale-red': 'hsl(357, 100%, 86%)',
        'very-light-gray': 'hsl(228, 33%, 97%)',
        'light-gray': 'hsl(223, 19%, 93%)',
        white: 'hsl(0, 0%, 100%)',
      },
    },
    fontFamily: {
      sans: ['Rubik', 'sans-serif'],
    },
  },
  plugins: [],
};
