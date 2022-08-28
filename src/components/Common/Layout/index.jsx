import React from "react";
import { css } from "@emotion/react";

import { Theme } from "~components";

const Layout = ({ children, className }) => (
  <>
    <Theme />
    <div
      css={css`
        display: flex;
      `}
    >
      <main className={className}>{children}</main>
    </div>
  </>
);

export default Layout;
