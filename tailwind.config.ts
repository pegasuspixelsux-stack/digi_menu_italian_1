import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'surface': '#ffffff',
        'surface-dark': '#0f0f0f',
        'surface-secondary': '#f5f5f5',
        'surface-secondary-dark': '#1a1a1a',
        'border': '#e5e5e5',
        'border-dark': '#2a2a2a',
        'text-primary': '#000000',
        'text-primary-dark': '#ffffff',
        'text-secondary': '#666666',
        'text-secondary-dark': '#999999',
        'accent': '#0066cc',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      spacing: {
        'safe': 'max(1rem, env(safe-area-inset-left))',
      },
      borderRadius: {
        'lg': '12px',
        'xl': '16px',
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'elevated': '0 4px 12px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
}
export default config
