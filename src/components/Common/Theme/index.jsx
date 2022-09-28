import React from "react";
import { Global } from "@emotion/react";
import { GlobalStyles as BaseStyles, css } from "twin.macro";

import "~node_modules/modern-normalize/modern-normalize.css";

const Theme = ({ font }) => {
  console.log(`font`, font?.asset?.url);
  return (
    <>
      <BaseStyles />
      <Global
        styles={css`
          html {
            font-size: 16px;
          }

          a {
            text-decoration: none;
            color: inherit;
            cursor: pointer;
          }

          button {
            background-color: transparent;
            color: inherit;
            border-width: 0;
            padding: 0;
            cursor: pointer;
          }

          a:focus,
          button:focus,
          input:focus,
          textarea:focus {
            outline: none;
          }

          input:not[type="checkbox"],
          textarea {
            appearance: none;
            border-radius: 0;
          }

          figure {
            margin: 0;
          }

          input::-moz-focus-inner {
            border: 0;
            padding: 0;
            margin: 0;
          }

          ul,
          ol,
          dd {
            margin: 0;
            padding: 0;
            list-style: none;
          }

          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            margin: 0;
            font-size: inherit;
            font-weight: inherit;
          }

          p {
            margin: 0;
          }

          fieldset {
            border-width: 0;
            padding: 0;
            margin: 0;
          }

          // font
          @font-face {
            font-family: "Custome";
            src: url("${font?.asset?.url}") format("woff2");
          }
        `}
      />
    </>
  );
};

export default Theme;
