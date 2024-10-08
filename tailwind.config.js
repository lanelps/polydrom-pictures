const defaultTheme = require(`tailwindcss/defaultTheme`);
const twAnimation = require(`tailwindcss-animation`);

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
  darkMode: `class`,
  content: [
    `./components/**/*.{js,ts,jsx,tsx}`,
    `./pages/**/*.{js,ts,jsx,tsx}`,
    `./templates/**/*.{js,ts,jsx,tsx}`
  ],
  plugins: [twAnimation],
  theme: {
    colors: {
      transparent: `transparent`,
      black: `#000000`,
      white: `#FFFFFF`,
      //
      offblack: `#101010`,
      grey: `#8F8F8F`,
      offgrey: `#1F1F1F`,
      offwhite: `#FBFBFB`,
      //
      babyblue: `#0674E5`,
      cobalt: `#1E189E`,
      green: `#84D673`,
      lime: `#C7CD47`,
      orange: `#DF7100`,
      purple: `#610F72`,
      red: `#84212B`,
      yellow: `#FFFF00`
    },
    screens: {
      "sm-m": `375px`,
      "md-m": `400px`,
      "lg-m": `500px`,
      //
      "sm-t": `660px`,
      "md-t": `769px`,
      "lg-t": `1025px`,
      //
      "sm-d": `1260px`,
      "md-d": `1440px`,
      "lg-d": `1920px`,
      "xl-d": `2200px`
    },
    transitionTimingFunction: {
      DEFAULT: `cubic-bezier(0.215, 0.61, 0.355, 1)`
    },
    transitionDuration: {
      DEFAULT: `300ms`,
      1000: `1000ms`
    },
    keyframes: {
      appear: {
        "0%": { opacity: `0` },
        "100%": { opacity: `1` }
      },
      "appear-up": {
        "0%": { opacity: `0`, transform: `translateY(calc(100% + 1rem))` },
        "100%": { opacity: `1`, transform: `translateY(0%)` }
      },
      "appear-down": {
        "0%": { opacity: `0`, transform: `translateY(calc(-100% - 1rem))` },
        "100%": { opacity: `1`, transform: `translateY(0%)` }
      }
    },
    animation: {
      appear: `appear 0.6s cubic-bezier(0.215, 0.61, 0.355, 1) forwards`,
      "appear-up": `appear-up 0.6s cubic-bezier(0.215, 0.61, 0.355, 1) forwards`,
      "appear-down": `appear-down 0.6s cubic-bezier(0.215, 0.61, 0.355, 1) forwards`
    },
    animationDelay: {
      300: `300ms`,
      1000: `1000ms`
    },
    // animationDuration: {
    //   // 300: `300ms`,
    //   // 1000: `1000ms`
    // },
    // animationIteration: {
    //   // 2: `2`
    // },
    // animationTiming: {
    //   // cubic: `cubic-bezier(0.215, 0.61, 0.355, 1)`
    // },
    gridColumn: gridSpan,
    gridColumnStart: gridColumns,
    gridColumnEnd: gridColumns
  },
  variants: {}
};
