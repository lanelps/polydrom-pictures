const defaultTheme = require(`tailwindcss/defaultTheme`);

const createTailWindGrid = (size = 12) => {
  const gridSpan = { "span-full": `1 / -1` };
  const gridColumns = { full: `-1` };

  Array(size)
    .fill(null)
    .forEach((_, index) => {
      const itemIndex = index + 1;
      gridSpan[`span-${itemIndex}`] = `span ${itemIndex} / span ${itemIndex}`;
      gridColumns[itemIndex] = itemIndex;
    });

  return { gridSpan, gridColumns };
};

const { gridSpan, gridColumns } = createTailWindGrid();

module.exports = {
  content: [
    `./components/**/*.{js,ts,jsx,tsx}`,
    `./pages/**/*.{js,ts,jsx,tsx}`,
    `./templates/**/*.{js,ts,jsx,tsx}`
  ],
  theme: {
    colors: {
      transparent: `transparent`,
      black: `#000000`,
      white: `#FFFFFF`,
      //
      "grey-70": `#1E1E1E`,
      "grey-60": `#323232`,
      "grey-50": `#4F4F4F`,
      "grey-40": `#969696`,
      "grey-30": `#BEBEBE`,
      "grey-20": `#DDDEE2`,
      "grey-10": `#F0F0F0`
    },
    fontFamily: {
      main: [`FK Grotesk`, ...defaultTheme.fontFamily.sans]
    },
    fontSize: {
      desktop: [
        `62px`,
        {
          lineHeight: `68.2px`,
          letterSpacing: `0em`
        }
      ],
      mobile: [
        `30px`,
        {
          lineHeight: `33px`,
          letterSpacing: `0em`
        }
      ]
    },
    screens: {
      "xl-d": `2200px`,
      "lg-d": `1600px`,
      "md-d": `1440px`,
      "sm-d": `1260px`,
      //
      "lg-t": `1025px`,
      "md-t": `769px`,
      "sm-t": `660px`,
      //
      "lg-m": `500px`,
      "md-m": `400px`,
      "sm-m": `375px`
    },
    transitionTimingFunction: {
      DEFAULT: `cubic-bezier(0.215, 0.61, 0.355, 1)`
    },
    transitionDuration: {
      DEFAULT: `300ms`
      // 1000: `1000ms`
    },
    keyframes: {
      appear: {
        "0%": { opacity: `0`, transform: `translate3d(0, 1rem, 0)` },
        "100%": { opacity: `1`, transform: `translate3d(0, 0, 0)` }
      }
    },
    animation: {
      appear: `appear 1s ease-in-out infinite`
    },
    gridColumn: gridSpan,
    gridColumnStart: gridColumns,
    gridColumnEnd: gridColumns
  },
  variants: {},
  plugins: []
};
