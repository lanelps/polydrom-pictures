/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import tw, { css, styled } from "twin.macro";

import { useApp } from "~hooks";
import { Grid, Button } from "~components";

const Container = styled.header(() => [
  tw`relative sm-t:absolute flex flex-col gap-y-4 top-0 sm-t:top-4 w-full mt-3 mb-10 sm-t:m-0 z-[100] opacity-0 mix-blend-difference`,
  css`
    transform: translateY(calc(-100% - 1rem));
  `
]);

const Title = tw.h1`text-offwhite transition-colors uppercase`;

const Nav = ({ title }) => {
  const { toggleWindow, showText } = useApp();
  const toggleAboutActive = () => toggleWindow("about");

  return (
    <Container css={showText && tw`animate-appear-down`}>
      <Grid tw="items-center">
        <Title className="b1-sans">{title}</Title>
        <nav tw="col-start-[2] sm-t:col-start-[4] flex justify-end">
          <Button
            type="button"
            name="Toggle About"
            onClick={toggleAboutActive}
            kind={2}
            invert
          >
            About
          </Button>
        </nav>
      </Grid>
    </Container>
  );
};

export default Nav;
