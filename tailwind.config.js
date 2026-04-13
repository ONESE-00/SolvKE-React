/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
  	extend: {
  		colors: {
  			primary: '#1e3a8a',
  			secondary: '#ff661d',
  			ink: '#0f172a',
  			mist: '#e2e8f0',
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		fontFamily: {
  			display: [
  				'Space Grotesk',
  				'ui-sans-serif',
  				'system-ui'
  			],
  			body: [
  				'Manrope',
  				'ui-sans-serif',
  				'system-ui'
  			]
  		},
  		boxShadow: {
  			panel: '0 24px 80px rgba(15, 23, 42, 0.14)'
  		},
  		backgroundImage: {
  			grid: 'linear-gradient(rgba(148,163,184,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.15) 1px, transparent 1px)'
  		}
  	}
  },
  plugins: [],
};
