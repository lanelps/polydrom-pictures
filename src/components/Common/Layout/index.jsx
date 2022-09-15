import React from "react";
import tw from "twin.macro";

import { Theme, Footer } from "~components";

const Container = tw.div`relative h-screen flex bg-offwhite dark:bg-offblack transition-colors overflow-x-hidden overflow-y-scroll`;

const Layout = ({ children, className }) => (
  <>
    <Theme />
    <Container>
      <main
        tw="relative w-full min-h-[667px] overflow-y-scroll"
        className={className}
      >
        {children}
      </main>
      <Footer />
    </Container>
  </>
);

export default Layout;
