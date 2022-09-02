import React from "react";
import tw from "twin.macro";

import { Theme, Footer } from "~components";

const Container = tw.div`relative h-screen flex`;

const Layout = ({ children, className }) => (
  <>
    <Theme />
    <Container>
      <main tw="relative w-full" className={className}>
        {children}
      </main>
      <Footer />
    </Container>
  </>
);

export default Layout;
