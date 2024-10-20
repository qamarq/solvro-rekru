import type { Config } from "tailwindcss";
import tailwindAnimate from 'tailwindcss-animate';

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			},
  			'color-1': 'hsl(var(--color-1))',
  			'color-2': 'hsl(var(--color-2))',
  			'color-3': 'hsl(var(--color-3))',
  			'color-4': 'hsl(var(--color-4))',
  			'color-5': 'hsl(var(--color-5))'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		transition: {
  			'transform-opacity': 'transform, opacity'
  		},
  		fontFamily: {
  			cal: ['"Cal Sans"', '"sans-serif"']
  		},
  		animation: {
            'fade-in': 'fade-in 1s var(--animation-delay, 0ms) ease forwards',
            "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
            "fade-up": "fade-up 1s var(--animation-delay, 0ms) ease forwards",
            "image-glow": "image-glow 4.1s ease-out .6s forwards",
            "pulse2": 'pulse2 2s infinite',
  			rainbow: 'rainbow var(--speed, 2s) infinite linear'
  		},
  		keyframes: {
            "fade-in": {
                from: { opacity: '0' },
                to: { opacity: '1' },
            },
            "border-beam": {
                "100%": {
                    "offset-distance": "100%",
                },
            },
            "fade-up": {
                from: { opacity: '0', transform: 'translateY(20px)' },
                to: { opacity: '1', transform: 'translateY(0)' },
            },
            "image-glow": {
                "0%": {
                    opacity: "0", animationTimingFunction: "cubic-bezier(.74,.25,.76,1)",
                },
                "10%": {
                    opacity: "0.7", animationTimingFunction: "cubic-bezier(.12,.01,.08,.99)",
                },
                "100%": {
                    opacity: "0.4",
                },
            },
            pulse2: {
                '0%': {
                    transform: 'scale(0.8)',
                    boxShadow: '0 0 0 0 rgba(16, 185, 129, 1)',
                },
            
                '70%': {
                    transform: 'scale(1)',
                    boxShadow: '0 0 0 10px rgba(16, 185, 129, 0)',
                },
            
                '100%': {
                    transform: 'scale(0.8)',
                },
            },
  			rainbow: {
  				'0%': {
  					'background-position': '0%'
  				},
  				'100%': {
  					'background-position': '200%'
  				}
  			}
  		}
  	}
  },
  plugins: [tailwindAnimate],
};
export default config;
