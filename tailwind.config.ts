import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ========================================
      // DESKTOP-FIRST BREAKPOINTS
      // ========================================
      screens: {
        // Mobile-first approach for responsive downgrade
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1440px',
        '3xl': '1600px',
        '4xl': '1920px',
      },
      
      // ========================================
      // DESKTOP-FIRST CONTAINER
      // ========================================
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          md: '2rem',
          lg: '2.5rem',
          xl: '3rem',
          '2xl': '4rem',
        },
      },
      
      // ========================================
      // 12-COLUMN GRID SYSTEM
      // ========================================
      gridTemplateColumns: {
        '12': 'repeat(12, minmax(0, 1fr))',
      },
      
      // ========================================
      // THIN BORDER SYSTEM
      // ========================================
      borderWidth: {
        '0.5': '0.5px',
        'hairline': '0.5px',
      },
      
      // ========================================
      // SHADOW ELEVATION SYSTEM (Desktop-First)
      // ========================================
      boxShadow: {
        // Thin shadows for subtle separation
        'thin': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'thin-lg': '0 2px 4px 0 rgb(0 0 0 / 0.06)',
        'thin-xl': '0 4px 8px 0 rgb(0 0 0 / 0.08)',
        
        // Card shadows
        'card-sm': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'card': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'card-md': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'card-lg': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        
        // Sidebar shadows
        'sidebar': '0 0 0 1px rgb(0 0 0 / 0.05), 0 4px 12px 0 rgb(0 0 0 / 0.08)',
        'sidebar-hover': '0 0 0 1px rgb(0 0 0 / 0.08), 0 8px 20px 0 rgb(0 0 0 / 0.12)',
        
        // Panel shadows
        'panel': '0 0 0 1px rgb(0 0 0 / 0.05), 0 8px 16px 0 rgb(0 0 0 / 0.08)',
        'panel-hover': '0 0 0 1px rgb(0 0 0 / 0.08), 0 12px 24px 0 rgb(0 0 0 / 0.12)',
        
        // Header shadows
        'header': '0 1px 0 0 rgb(0 0 0 / 0.05)',
        'header-sticky': '0 1px 0 0 rgb(0 0 0 / 0.08)',
        
        // Table row hover
        'row-hover': '0 0 0 1px rgb(0 0 0 / 0.04)',
        
        // Dark mode shadows
        'dark-card': '0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.3)',
        'dark-panel': '0 0 0 1px rgb(255 255 255 / 0.05), 0 8px 16px 0 rgb(0 0 0 / 0.4)',
      },
      
      // ========================================
      // DESKTOP TYPOGRAPHY SCALE
      // ========================================
      fontSize: {
        // Desktop heading scale
        'heading-xs': ['1.125rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }], // 18px
        'heading-sm': ['1.25rem', { lineHeight: '1.5', letterSpacing: '-0.02em' }], // 20px
        'heading-md': ['1.5rem', { lineHeight: '1.4', letterSpacing: '-0.02em' }], // 24px
        'heading-lg': ['1.875rem', { lineHeight: '1.35', letterSpacing: '-0.02em' }], // 30px
        'heading-xl': ['2.25rem', { lineHeight: '1.3', letterSpacing: '-0.02em' }], // 36px
        'heading-2xl': ['2.625rem', { lineHeight: '1.25', letterSpacing: '-0.02em' }], // 42px
        'heading-3xl': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }], // 48px
        
        // Desktop body scale
        'body-xs': ['0.75rem', { lineHeight: '1.5' }], // 12px - dense for tables
        'body-sm': ['0.875rem', { lineHeight: '1.5' }], // 14px
        'body-md': ['1rem', { lineHeight: '1.6' }], // 16px - medium body for readability
        'body-lg': ['1.125rem', { lineHeight: '1.6' }], // 18px
        'body-xl': ['1.25rem', { lineHeight: '1.6' }], // 20px
        
        // Desktop label scale
        'label-xs': ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.02em', fontWeight: '500' }], // 11px
        'label-sm': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.02em', fontWeight: '500' }], // 12px
        'label-md': ['0.875rem', { lineHeight: '1.4', letterSpacing: '0.01em', fontWeight: '500' }], // 14px
        'label-lg': ['1rem', { lineHeight: '1.4', letterSpacing: '0.01em', fontWeight: '500' }], // 16px
      },
      
      // ========================================
      // DESKTOP SPACING SCALE
      // ========================================
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
        '42': '10.5rem',
        '46': '11.5rem',
        '50': '12.5rem',
      },
      
      // ========================================
      // BORDER RADIUS (Modern SaaS)
      // ========================================
      borderRadius: {
        '4xl': '1.5rem', // 24px
        '5xl': '2rem', // 32px
      },
      
      // ========================================
      // FOCUS RING SYSTEM
      // ========================================
      ringWidth: {
        '0.5': '0.5px',
        'hairline': '0.5px',
      },
      
      ringOffsetWidth: {
        '0.5': '0.5px',
        'hairline': '0.5px',
      },
      
      // ========================================
      // TRANSITION DURATION
      // ========================================
      transitionDuration: {
        '75': '75ms',
        '125': '125ms',
        '175': '175ms',
        '225': '225ms',
        '275': '275ms',
      },
      
      // ========================================
      // TRANSITION TIMING
      // ========================================
      transitionTimingFunction: {
        'ease-out-saas': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'ease-in-saas': 'cubic-bezier(0.4, 0, 1, 1)',
        'ease-saas': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      
      // ========================================
      // BACKDROP BLUR
      // ========================================
      backdropBlur: {
        'xs': '2px',
        '3xl': '32px',
        '4xl': '48px',
      },
      
      // ========================================
      // MAX WIDTHS (Desktop-First)
      // ========================================
      maxWidth: {
        'content': '1440px',
        'content-xl': '1600px',
        'content-2xl': '1920px',
      },
      
      // ========================================
      // MIN WIDTHS
      // ========================================
      minWidth: {
        'sidebar-compact': '72px',
        'sidebar-expanded': '280px',
        'panel': '320px',
        'panel-lg': '400px',
      },
      
      // ========================================
      // Z-INDEX SCALE
      // ========================================
      zIndex: {
        'dropdown': 50,
        'sticky': 40,
        'sidebar': 30,
        'header': 20,
        'modal': 60,
        'tooltip': 70,
      },
      
      // ========================================
      // ANIMATION KEYFRAMES
      // ========================================
      keyframes: {
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-in-left': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'fade-in-up': {
          '0%': { transform: 'translateY(8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      
      animation: {
        'slide-in-right': 'slide-in-right 0.3s ease-out-saas',
        'slide-in-left': 'slide-in-left 0.3s ease-out-saas',
        'fade-in-up': 'fade-in-up 0.2s ease-out-saas',
        'scale-in': 'scale-in 0.2s ease-out-saas',
      },
    },
  },
  plugins: [],
}

export default config
