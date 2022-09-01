import React from "react";
import tw, { css } from "twin.macro";

import { Theme, Footer } from "~components";

const Container = tw.div`relative h-screen flex`;

const Layout = ({ children, className }) => (
  <>
    <Theme />
    <Container>
      <main className={className}>{children}</main>
      <Footer />
    </Container>
  </>
);

export default Layout;
