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
      center: true,
    },
    a: {
      color: "#ff1717",
    },
    extend: {
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            h1: {
              fontSize: "2.027rem", // Below md
              lineHeight: "1.15",
              fontWeight: "700",
              "@screen md": {
                fontSize: "2.986rem", // md and above
              },
            },
            h2: {
              fontSize: "1.802rem",
              lineHeight: "1.15",
              fontWeight: "700",
            },
            h3: {
              fontSize: "1.602rem",
              lineHeight: "1.15",
              fontWeight: "700",
            },
            h4: {
              fontSize: "1.424rem",
              lineHeight: "1.15",
              fontWeight: "700",
            },
            h5: {
              fontSize: "1.266rem",
              lineHeight: "1.15",
              fontWeight: "700",
            },
            h6: {
              fontSize: "1.125rem",
              lineHeight: "1.15",
              fontWeight: "700",
            },
            p: {
              fontSize: "1rem",
              lineHeight: "1.6",
            },
            small: {
              fontSize: "0.889rem",
              lineHeight: "1.4",
            },
          },
        },
      }),
      fontFamily: {
        "overused-grotesk": ["OverusedGrotesk", "sans-serif"],
      },
      animation: {
        aurora: "aurora 60s linear infinite",
        fadeInSlideUp: "fadeInSlideUp 0.9s ease-out",
      },
      keyframes: {
        aurora: {
          from: {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          to: {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },
        fadeInSlideUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animationDelay: {
        short: "0.3s",
        medium: "0.6s",
        long: "1s",
      },
    },
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
