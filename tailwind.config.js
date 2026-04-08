/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './components/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        border: '#E4E7EB',
        input: '#E4E7EB',
        ring: '#0A68FF',
        background: '#FFFFFF',
        foreground: '#0F1729',
        primary: {
          DEFAULT: '#0A68FF',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#F3F4F6',
          foreground: '#0F1729',
        },
        destructive: {
          DEFAULT: '#EF4444',
          foreground: '#FFFFFF',
        },
        muted: {
          DEFAULT: '#F3F4F6',
          foreground: '#6B7280',
        },
        accent: {
          DEFAULT: '#0A68FF',
          foreground: '#FFFFFF',
        },
        popover: {
          DEFAULT: '#FFFFFF',
          foreground: '#0F1729',
        },
        card: {
          DEFAULT: '#FFFFFF',
          foreground: '#0F1729',
        },
        success: {
          DEFAULT: '#22C55E',
          foreground: '#FFFFFF',
        },
        warning: {
          DEFAULT: '#F59E0B',
          foreground: '#FFFFFF',
        },
        info: {
          DEFAULT: '#0EA5E9',
          foreground: '#FFFFFF',
        },
        highlight: '#EF3E50',
        verified: '#0A68FF',
        star: '#EAB308',
        sidebar: {
          DEFAULT: '#FFFFFF',
          foreground: '#0F1729',
          primary: '#0A68FF',
          'primary-foreground': '#FFFFFF',
          accent: '#F3F4F6',
          'accent-foreground': '#0F1729',
          border: '#E4E7EB',
          ring: '#0A68FF',
        },
      },
      borderRadius: {
        lg: '8px',
        md: '6px',
        sm: '4px',
      },
      fontFamily: {
        light: ['SpaceGrotesk_300Light'],
        normal: ['SpaceGrotesk_400Regular'],
        sans: ['SpaceGrotesk_400Regular'],
        medium: ['SpaceGrotesk_500Medium'],
        semibold: ['SpaceGrotesk_600SemiBold'],
        bold: ['SpaceGrotesk_700Bold'],
      },
      fontSize: {
        xs: ['13px', { lineHeight: '18px' }],
        sm: ['15px', { lineHeight: '21px' }],
        base: ['17px', { lineHeight: '24px' }],
        lg: ['19px', { lineHeight: '26px' }],
        xl: ['21px', { lineHeight: '28px' }],
        '2xl': ['24px', { lineHeight: '32px' }],
        '3xl': ['30px', { lineHeight: '38px' }],
        '4xl': ['36px', { lineHeight: '44px' }],
      },
      boxShadow: {
        card: '0 1px 3px rgba(15, 23, 41, 0.06)',
        'card-hover': '0 4px 6px rgba(15, 23, 41, 0.08)',
      },
    },
  },
  plugins: [],
};
