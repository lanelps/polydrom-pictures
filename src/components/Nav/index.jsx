/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import tw, { css, styled } from "twin.macro";

import { Grid, ThemeToggle } from "~components";
import { useApp } from "~hooks";

const Container = styled.header(() => [
  tw`relative sm-t:absolute flex flex-col gap-y-4 top-0 sm-t:top-4 w-full mt-3 mb-10 sm-t:m-0 z-[100] animate-appear-down animation-delay-1000 opacity-0 mix-blend-difference`,
  css`
    transform: translateY(calc(-100% - 1rem));
  `
]);

const Title = tw.h1`font-main text-m-h3 text-offblack dark:text-offwhite transition-colors`;

const NavList = tw.ul`relative w-auto flex gap-x-2 justify-end`;
const Button = styled.button(({ active }) => [
  tw`font-main text-m-h3 text-offblack dark:text-offwhite transition-all`,
  css`
    &:hover {
      -webkit-text-stroke: 2px black;
    }

    @media (prefers-color-scheme: dark) {
      &:hover {
        -webkit-text-stroke: 2px white;
      }
    }

    ${active && `
      -webkit-text-stroke: 2px black;

      @media (prefers-color-scheme: dark) {
        -webkit-text-stroke: 2px white;
      }
      `}
  `
]);

const Nav = ({ title }) => {
  const { isWindowActive, toggleWindow } = useApp();

  const aboutActive = isWindowActive('about');
  const contactActive = isWindowActive('contact');

  const toggleAboutActive = () => toggleWindow('about');
  const toggleContactActive = () => toggleWindow('contact');

  return (
    <Container>
      <ThemeToggle />
      <Grid>
        <Title>{title}</Title>
          <nav css={css`grid-column-start: 4;`}>
            <NavList>
              <li>
                <Button
                  type="button"
                  name="Toggle About"
                  onClick={toggleAboutActive}
                  active={aboutActive}
                >
                  About,
                </Button>
              </li>
              <li>
                <Button
                  type="button"
                  name="Toggle Contact Form"
                  onClick={toggleContactActive}
                  active={contactActive}
                >
                  Contact
                </Button>
              </li>
            </NavList>
          </nav>
      </Grid>
    </Container>
)};

export default Nav;
