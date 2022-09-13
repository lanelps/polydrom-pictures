/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import tw, { css, styled } from "twin.macro";

import { Grid, Go, ThemeToggle } from "~components";

const Container = styled.nav(() => [
  tw`relative sm-t:absolute flex flex-col gap-y-4 top-0 sm-t:top-4 w-full mt-3 mb-10 sm-t:m-0 z-10 animate-appear-down animation-delay-1000 opacity-0`,
  css`
    transform: translateY(calc(-100% - 1rem));
  `
]);
const NavLink = tw.li`relative w-full col-span-full sm-t:first:col-span-full sm-t:col-span-2 sm-d:first:col-span-1 sm-d:col-span-1`;
const NavTitle = tw.h3`relative font-main text-m-h4 sm-t:text-d-h4 text-grey`;
const Links = tw.ul`relative w-full`;
const Link = tw.li`font-main font-main text-m-h4 sm-t:text-d-h4 text-offblack dark:text-offwhite transition-colors`;

const Nav = ({ navLinks }) => (
  <Container>
    <ThemeToggle />
    <Grid node="ul">
      {navLinks.map((navLink) => (
        <NavLink key={navLink?._key}>
          <NavTitle>{navLink?.title}</NavTitle>
          <Links>
            {navLink?.links.map((link) => (
              <Link key={link?._key}>
                <Go
                  to={link?.url}
                  css={[link?.url && tw`underline hover:no-underline`]}
                >
                  {link?.name}
                </Go>
              </Link>
            ))}
          </Links>
        </NavLink>
      ))}
    </Grid>
  </Container>
);

export default Nav;
