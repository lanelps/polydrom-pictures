import React from "react";
import { css, Global } from "@emotion/react";

import FK_GROTESK_REGULAR_WOFF from "~assets/fonts/FKGrotesk-Regular.woff";
import FK_GROTESK_REGULAR_WOFF2 from "~assets/fonts/FKGrotesk-Regular.woff2";

const Fonts = () => (
  <Global
    styles={css`
      @font-face {
        font-family: "FK Grotesk";
        src: url(${FK_GROTESK_REGULAR_WOFF2}) format("woff2"),
          url(${FK_GROTESK_REGULAR_WOFF}) format("woff");
        font-display: block;
        font-weight: normal;
        font-style: normal;
      }
    `}
  />
);
export default Fonts;
