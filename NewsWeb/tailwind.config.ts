
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: 'hsl(var(--primary))',
				"primary-foreground": 'hsl(var(--primary-foreground))',
				secondary: 'hsl(var(--secondary))',
				"secondary-foreground": 'hsl(var(--secondary-foreground))',
				destructive: 'hsl(var(--destructive))',
				"destructive-foreground": 'hsl(var(--destructive-foreground))',
				muted: 'hsl(var(--muted))',
				"muted-foreground": 'hsl(var(--muted-foreground))',
				accent: 'hsl(var(--accent))',
				"accent-foreground": 'hsl(var(--accent-foreground))',
				popover: 'hsl(var(--popover))',
				"popover-foreground": 'hsl(var(--popover-foreground))',
				card: 'hsl(var(--card))',
				"card-foreground": 'hsl(var(--card-foreground))',
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
				// Custom colors for our Turkish news site
				"news-red": "#e63946",
				"news-dark": "#1d3557",
				"news-light": "#f1faee",
				"news-blue": "#457b9d",
				"news-sky": "#a8dadc",
				"news-green": "#35a32a",
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				"accordion-down": {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				"accordion-up": {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				"ticker": {
					"0%": { transform: "translateX(0)" },
					"100%": { transform: "translateX(-100%)" }
				},
				"fade-in": {
					"0%": {
						opacity: "0",
						transform: "translateY(10px)"
					},
					"100%": {
						opacity: "1",
						transform: "translateY(0)"
					}
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"ticker": "ticker 30s linear infinite",
				"fade-in": "fade-in 0.3s ease-out",
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
