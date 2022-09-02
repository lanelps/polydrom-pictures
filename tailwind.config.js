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
      //
      offblack: `#101010`,
      grey: `#8F8F8F`,
      offwhite: `#FBFBFB`,
      //
      babyblue: `#0674E5`,
      cobalt: `#1E189E`,
      green: `#84D673`,
      lime: `#C7CD47`,
      orange: `#DF7100`,
      purple: `#610F72`
    },
    fontFamily: {
      main: [`Helvetica Neue`, ...defaultTheme.fontFamily.sans]
    },
    fontSize: {
      "d-h1": [
        `106px`,
        {
          lineHeight: `95.4px`,
          letterSpacing: `-4%`
        }
      ],
      "d-h2": [
        `76px`,
        {
          lineHeight: `68.4px`,
          letterSpacing: `-2%`
        }
      ],
      "d-h3": [
        `40px`,
        {
          lineHeight: `37.6px`,
          letterSpacing: `-2%`
        }
      ],
      "d-h4": [
        `28px`,
        {
          lineHeight: `26.32px`,
          letterSpacing: `-2%`
        }
      ],
      "d-b1": [
        `22px`,
        {
          lineHeight: `24.2px`,
          letterSpacing: `-2%`
        }
      ],
      "d-b2": [
        `14px`,
        {
          lineHeight: `16.8px`,
          letterSpacing: `1%`
        }
      ],
      "d-b3": [
        `14px`,
        {
          lineHeight: `16px`,
          letterSpacing: ``
        }
      ],
      //
      "m-h1": [
        `66px`,
        {
          lineHeight: `59.4px`,
          letterSpacing: `-4%`
        }
      ],
      "m-h2": [
        `32px`,
        {
          lineHeight: `31.36px`,
          letterSpacing: `-2%`
        }
      ],
      "m-h3": [
        `24px`,
        {
          lineHeight: `22.56px`,
          letterSpacing: `-2%`
        }
      ],
      "m-h4": [
        `18px`,
        {
          lineHeight: `18.36px`,
          letterSpacing: `-2%`
        }
      ],
      "m-b1": [
        `20px`,
        {
          lineHeight: `22px`,
          letterSpacing: `-2%`
        }
      ],
      "m-b2": [
        `14px`,
        {
          lineHeight: `16.8px`,
          letterSpacing: `1%`
        }
      ],
      "m-b3": [
        `12px`,
        {
          lineHeight: `14.4px`,
          letterSpacing: ``
        }
      ],
      caption: [
        `10px`,
        {
          lineHeight: `12px`,
          letterSpacing: ``
        }
      ]
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
      "lg-d": `1600px`,
      "xl-d": `2200px`
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
