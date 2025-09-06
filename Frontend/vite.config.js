
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss({
      config: {
        content: [
          "./index.html",
          "./src/**/*.{js,ts,jsx,tsx}",
        ],
        theme: {
          extend: {
            // MMP Brand Colors
            colors: {
              'mmp': {
                'orange': '#FF9C00',
                'slate': '#607988', 
                'light': '#F7F7F7',
                'dark': '#2D3748',
                'success': '#48BB78',
                'warning': '#ED8936',
                'error': '#F56565',
              }
            },
            
            // Real Estate Optimized Fonts
            fontFamily: {
              // Primary font for headings and important text
              'heading': ['Montserrat', 'system-ui', 'sans-serif'],
              
              // Body text font for readability  
              'body': ['Inter', 'system-ui', 'sans-serif'],
              
              // Luxury/accent font for premium properties
              'luxury': ['Playfair Display', 'Georgia', 'serif'],
            },
            
            // Property-focused Font Sizes
            fontSize: {
              // Real estate optimized font sizes
              'property-title': ['2.5rem', { lineHeight: '1.2', fontWeight: '700' }],
              'price-display': ['2rem', { lineHeight: '1.3', fontWeight: '600' }],
              'section-heading': ['1.875rem', { lineHeight: '1.3', fontWeight: '600' }],
              'card-title': ['1.25rem', { lineHeight: '1.4', fontWeight: '500' }],
              'body-large': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],
              'body-regular': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
              'caption': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
            },

            // Custom Animations
            animation: {
              'slide-in': 'slideIn 0.3s ease-out',
              'slide-up': 'slideUp 0.3s ease-out',
              'fade-in': 'fadeIn 0.2s ease-in',
              'bounce-subtle': 'bounceSubtle 2s infinite',
              'pulse-orange': 'pulseOrange 2s infinite',
            },
            
            keyframes: {
              slideIn: {
                '0%': { transform: 'translateX(-100%)', opacity: '0' },
                '100%': { transform: 'translateX(0)', opacity: '1' }
              },
              slideUp: {
                '0%': { transform: 'translateY(10px)', opacity: '0' },
                '100%': { transform: 'translateY(0)', opacity: '1' }
              },
              fadeIn: {
                '0%': { opacity: '0' },
                '100%': { opacity: '1' }
              },
              bounceSubtle: {
                '0%, 100%': { transform: 'translateY(0)' },
                '50%': { transform: 'translateY(-2px)' }
              },
              pulseOrange: {
                '0%, 100%': { boxShadow: '0 0 0 0 rgba(255, 156, 0, 0.4)' },
                '50%': { boxShadow: '0 0 0 8px rgba(255, 156, 0, 0)' }
              }
            },

            // Custom Spacing for Real Estate Layouts
            spacing: {
              '18': '4.5rem',
              '88': '22rem',
              '128': '32rem',
            },

            // Property Card Specific Styles
            aspectRatio: {
              'property': '4/3',
              'property-wide': '16/9',
            },

            // Custom Shadows
            boxShadow: {
              'property-card': '0 4px 20px rgba(255, 156, 0, 0.1)',
              'navbar': '0 2px 20px rgba(96, 121, 136, 0.1)',
              'dropdown': '0 10px 40px rgba(96, 121, 136, 0.15)',
            }
          },
        },
        plugins: [],
      }
    })
  ],
  
  // Development server configuration
  server: {
    port: 3000,
    open: true
  },
  
  // Build optimization
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          tailwind: ['@tailwindcss/vite']
        }
      }
    }
  }
})
