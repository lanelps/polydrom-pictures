import React, { forwardRef } from "react";
import tw, { css } from "twin.macro";

import { breakpoint } from "~utils/css";

const Grid = forwardRef((props, ref) => {
  const {
    className,
    children,
    node = `div`,
    columns = [`2`, `4`],
    gap = [`1rem`, `1rem`],
    padding = [`0 0.75rem`, `0 1rem`],
    margin = [`auto`, `auto`],
    maxWidth = `1440px`
  } = props;

  const G = `${node}`;

  return (
    <G
      ref={ref}
      css={[
        css`
          grid-template-columns: repeat(${columns[0]}, minmax(0, 1fr));
          grid-gap: ${gap[0]};
          margin: ${margin[0]};
          padding: ${padding[0]};
          max-width: ${maxWidth};

          ${breakpoint(`sm-t`)} {
            grid-template-columns: repeat(${columns[1]}, minmax(0, 1fr));
            grid-gap: ${gap[1]};
            margin: ${margin[1]};
            padding: ${padding[1]};
          }
        `,
        tw`w-full relative grid`
      ]}
      className={className}
    >
      {children}
    </G>
  );
});

export default Grid;
