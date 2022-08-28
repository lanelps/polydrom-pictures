import React, { forwardRef } from "react";
import tw, { css } from "twin.macro";

const Grid = forwardRef((props, ref) => {
  const {
    className,
    children,
    node = `div`,
    columns = `12`,
    gap = `1rem`,
    padding = `0`,
    margin = `0`
  } = props;

  const G = `${node}`;

  return (
    <G
      ref={ref}
      css={[
        css`
          grid-template-columns: repeat(${columns}, minmax(0, 1fr));
          grid-gap: ${gap};
          margin: ${margin};
          padding: ${padding};
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
