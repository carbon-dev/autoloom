/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        display: ['Cal Sans', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      animation: {
        'border-glow': 'border-glow 3s linear infinite',
      },
      keyframes: {
        'border-glow': {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '200% 0%' },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#374151',
            h1: {
              color: '#111827',
              fontFamily: 'Cal Sans, Plus Jakarta Sans, system-ui, sans-serif',
            },
            h2: {
              color: '#111827',
              fontFamily: 'Cal Sans, Plus Jakarta Sans, system-ui, sans-serif',
            },
            h3: {
              color: '#111827',
              fontFamily: 'Cal Sans, Plus Jakarta Sans, system-ui, sans-serif',
            },
            strong: {
              color: '#111827',
            },
            a: {
              color: '#3B82F6',
              '&:hover': {
                color: '#2563EB',
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};