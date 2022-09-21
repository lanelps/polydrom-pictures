import React from "react";
import tw, { css, styled } from "twin.macro";

import { Grid } from "~components";
import { useApp } from "~hooks";

const Container = styled.footer(() => [
  tw`fixed bottom-6 sm-t:bottom-4 w-full z-50 mix-blend-difference opacity-0 animate-appear-up animation-delay-1000`,
  css`
    transform: translateY(calc(100% + 1rem));
  `
]);
const Wrapper = tw.div`relative w-full col-span-full flex flex-col sm-t:flex-row gap-y-2 justify-between`;
const NavList = tw.ul`relative w-auto flex gap-x-2`;
const Button = styled.button(({ active }) => [
  tw`font-main text-m-h3 sm-t:text-d-h3 text-offwhite transition-all`,
  css`
    &:hover {
      -webkit-text-stroke: 2px white;
    }

    ${active && `-webkit-text-stroke: 2px white;`}
  `
]);
const Title = styled.h1(({ font }) => [
  tw`font-main text-m-h3 sm-t:text-d-h3 text-offwhite`,
  font &&
    css`
      @font-face {
        font-family: "Custom";
        src: url("${font}") format("woff2");
      }

      font-family: "Custom", Helvetica Neue, Helvetica, Arial, sans-serif;
    `
]);

const Footer = ({ data: { title, font } }) => {
  // state
  const {
    aboutActive,
    setAboutActive,
    jobsActive,
    setJobsActive,
    contactActive,
    setContactActive
  } = useApp();

  return (
    <Container>
      <Grid>
        <Wrapper>
          <nav>
            <NavList>
              <li>
                <Button
                  type="button"
                  onClick={() => setAboutActive(!aboutActive)}
                  active={aboutActive}
                >
                  About Us,
                </Button>
              </li>
              <li>
                <Button
                  type="button"
                  onClick={() => setJobsActive(!jobsActive)}
                  active={jobsActive}
                >
                  Jobs,
                </Button>
              </li>
              <li>
                <Button
                  type="button"
                  onClick={() => setContactActive(!contactActive)}
                  active={contactActive}
                >
                  Contact
                </Button>
              </li>
            </NavList>
          </nav>
          <Title font={font?.asset?.url}>{title}</Title>
        </Wrapper>
      </Grid>
    </Container>
  );
};

export default Footer;
