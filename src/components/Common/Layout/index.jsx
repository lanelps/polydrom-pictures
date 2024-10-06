import React from "react";
import tw from "twin.macro";

import { Theme, Footer } from "~components";

const Container = tw.div`relative h-screen flex bg-offwhite dark:bg-offblack transition-colors overflow-hidden`;
const Main = tw.main`flex-grow w-full`;

const Layout = ({ children, className, font }) => (
  <>
    <Theme font={font} />
    <Container>
      <Main className={className}>
        {children}
      </Main>
      <Footer />
    </Container>
  </>
);

export default React.memo(Layout);
