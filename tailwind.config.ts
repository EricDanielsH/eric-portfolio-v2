const svgToDataUri = require("mini-svg-data-uri");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    { pattern: /col-span-(1|2|3|4|5|6)/ },
    { pattern: /row-span-(1|2|3|4)/ },
  ],
  darkMode: "class",
  theme: {
  	container: {
  		center: true
  	},
  	a: {
  		color: '#ff1717'
  	},
  	extend: {
  		typography: '(theme: any) => ({\\n        DEFAULT: {\\n          css: {\\n            h1: {\\n              fontSize: "2.027rem", // Below md\\n              lineHeight: "1.15",\\n              fontWeight: "700",\\n              "@screen md": {\\n                fontSize: "2.986rem", // md and above\\n              },\\n            },\\n            h2: {\\n              fontSize: "1.802rem",\\n              lineHeight: "1.15",\\n              fontWeight: "700",\\n            },\\n            h3: {\\n              fontSize: "1.602rem",\\n              lineHeight: "1.15",\\n              fontWeight: "700",\\n            },\\n            h4: {\\n              fontSize: "1.424rem",\\n              lineHeight: "1.15",\\n              fontWeight: "700",\\n            },\\n            h5: {\\n              fontSize: "1.266rem",\\n              lineHeight: "1.15",\\n              fontWeight: "700",\\n            },\\n            h6: {\\n              fontSize: "1.125rem",\\n              lineHeight: "1.15",\\n              fontWeight: "700",\\n            },\\n            p: {\\n              fontSize: "1rem",\\n              lineHeight: "1.6",\\n            },\\n            small: {\\n              fontSize: "0.889rem",\\n              lineHeight: "1.4",\\n            },\\n          },\\n        },\\n      })',
  		fontFamily: {
  			'overused-grotesk': [
  				'OverusedGrotesk',
  				'sans-serif'
  			]
  		},
  		animation: {
  			aurora: 'aurora 60s linear infinite',
  			fadeInSlideUp: 'fadeInSlideUp 0.9s ease-out',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
  		keyframes: {
  			aurora: {
  				from: {
  					backgroundPosition: '50% 50%, 50% 50%'
  				},
  				to: {
  					backgroundPosition: '350% 50%, 350% 50%'
  				}
  			},
  			fadeInSlideUp: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(10px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animationDelay: {
  			short: '0.3s',
  			medium: '0.6s',
  			long: '1s'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
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
  			}
  		}
  	}
  },
  plugins: [
    require("@tailwindcss/typography"),
    addVariablesForColors,
    function({ matchUtilities, theme }: any) {
      matchUtilities(
        {
          "bg-dot-thick": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="2.5"></circle></svg>`,
            )}")`,
          }),
        },
        {
          values: flattenColorPalette(theme("backgroundColor")),
          type: "color",
        },
      );
    },
    function({ addUtilities, theme }: any) {
      const delays = theme("animationDelay");
      const utilities: { [key: string]: { "animation-delay": string } } =
        Object.keys(delays).reduce((acc: any, key: any) => {
          acc[`.delay-${key}`] = { "animation-delay": delays[key] };
          return acc;
        }, {});
      addUtilities(utilities, ["responsive", "hover"]);
    },
    require("tailwindcss-animate"),
  ],
};

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val]),
  );

  addBase({
    ":root": newVars,
  });
}
