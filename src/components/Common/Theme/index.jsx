import React from "react";
import { Global } from "@emotion/react";
import { GlobalStyles as BaseStyles, css } from "twin.macro";

import "~node_modules/modern-normalize/modern-normalize.css";

const Theme = ({ font }) => (
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

        .h1-serif,
        .b1-serif {
          font-family: "Times New Roman", Times, serif;
        }

        .h1-sans,
        .b1-sans,
        .button {
          font-family: "Helvetica", "Arial", sans-serif;
        }

        .h1-serif {
          font-size: 1.5rem;
          line-height: 1.1;
          letter-spacing: 0.05em;
        }

        .h1-sans {
          font-size: 1.5rem;
          line-height: 1.1;
          letter-spacing: 0.05em;
        }

        .b1-serif,
        .b1-sans {
          font-size: 1rem;
          line-height: 0.94;
        }

        .b1-serif {
          letter-spacing: -0.02em;
        }

        .b1-sans {
          letter-spacing: 0.02em;
        }

        .button {
          font-size: 0.75rem;
          line-height: 0.94;
          letter-spacing: 0.02em;
        }

        @media (min-width: 768px) {
          .h1-serif,
          .h1-sans {
            font-size: 1.125rem;
          }

          .b1-serif,
          .b1-sans {
            font-size: 0.875rem;
          }

          .button {
            font-size: 0.625rem;
          }
        }
      `}
    />
  </>
);

export default Theme;
