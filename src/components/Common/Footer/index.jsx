import React from "react";
import tw, { css } from "twin.macro";

import { Grid } from "~components";

const Container = tw.footer`absolute bottom-6 sm-t:bottom-4 w-full`;
const Wrapper = tw.div`relative w-full col-span-full flex flex-col sm-t:flex-row gap-y-2 justify-between`;
const NavList = tw.ul`relative w-auto flex gap-x-2`;
const Button = tw.button`font-main text-m-h3 sm-t:text-d-h3`;

const Footer = () => (
  <Container>
    <Grid>
      <Wrapper>
        <nav>
          <NavList>
            <li>
              <Button type="button">About Us,</Button>
            </li>
            <li>
              <Button type="button">Jobs,</Button>
            </li>
            <li>
              <Button type="button">Contact</Button>
            </li>
          </NavList>
        </nav>
        <h1 tw="font-main text-m-h3 sm-t:text-d-h3 text-offblack">
          Polydrom Pictures
        </h1>
      </Wrapper>
    </Grid>
  </Container>
);

export default Footer;
