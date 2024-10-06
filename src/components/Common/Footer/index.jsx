import React from "react";
import tw, { css, styled } from "twin.macro";

import { Grid } from "~components";

const Container = styled.footer(() => [
  tw`fixed bottom-6 sm-t:bottom-4 w-full z-50 mix-blend-difference opacity-0 animate-appear-up animation-delay-1000`,
  css`
    transform: translateY(calc(100% + 1rem));
  `
]);
const Wrapper = tw.div`relative w-full col-span-full flex flex-col sm-t:flex-row gap-y-2 justify-end`;
const Footnote = tw.p`font-main text-m-b3 text-offwhite uppercase`;

const Footer = () => {
  return (
    <Container>
      <Grid>
        <Wrapper>
          <Footnote>Full site in development</Footnote>
        </Wrapper>
      </Grid>
    </Container>
  );
};

export default Footer;
