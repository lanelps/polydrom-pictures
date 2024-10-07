import React from "react";
import tw, { css, styled } from "twin.macro";

import { Grid, Button } from "~components";

const Container = styled.footer(() => [
  tw`fixed bottom-6 sm-t:bottom-4 w-full z-50 mix-blend-difference opacity-0 animate-appear-up animation-delay-1000 text-offblack dark:text-offwhite`,
  css`
    transform: translateY(calc(100% + 1rem));
  `
]);
const Wrapper = tw.div`relative w-full col-span-full flex flex-col sm-t:flex-row gap-y-2 justify-end`;
const Enquiries = tw.div`flex items-center gap-x-3`;

const Footer = ({ footer: { contact } }) => {
  return (
    <Container>
      <Grid>
        <Wrapper>
          {contact?.email && (
            <Enquiries>
              <h3 className="b1-serif">Enquiries</h3>
              <Button kind={2} to={`mailto:${contact?.email}`}>
                {contact?.email}
              </Button>
            </Enquiries>
          )}
        </Wrapper>
      </Grid>
    </Container>
  );
};

export default Footer;
