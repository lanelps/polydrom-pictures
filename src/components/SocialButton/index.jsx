import React from "react";
import tw, { css, styled } from "twin.macro";

import { Go } from "~components";

import { ReactComponent as Facebook } from "~assets/svg/icons/social/facebook.svg";
import { ReactComponent as Instagram } from "~assets/svg/icons/social/instagram.svg";
import { ReactComponent as Twitter } from "~assets/svg/icons/social/twitter.svg";
import { ReactComponent as Vimeo } from "~assets/svg/icons/social/vimeo.svg";
import { ReactComponent as Youtube } from "~assets/svg/icons/social/youtube.svg";

const Container = tw.button`relative flex items-center justify-center p-[0.84rem] sm-t:p-[1.125rem] bg-transparent hover:bg-offblack dark:hover:bg-offwhite active:bg-transparent rounded-full border border-offblack dark:border-offwhite active:border-grey transition-colors`;

const SocialButton = ({ type, to }) => {
  let iconJSX = <></>;

  switch (type) {
    case `facebook`:
      iconJSX = (
        <Facebook
          css={[
            tw`w-4 sm-t:w-5 text-offblack dark:text-offwhite group-hover:text-offwhite dark:group-hover:text-offblack group-active:text-offblack group-active:text-grey transition-colors`
          ]}
        />
      );
      break;

    case `instagram`:
      iconJSX = (
        <Instagram
          css={[
            tw`w-4 sm-t:w-5 text-offblack dark:text-offwhite group-hover:text-offwhite dark:group-hover:text-offblack group-active:text-grey transition-colors`
          ]}
        />
      );
      break;

    case `twitter`:
      iconJSX = (
        <Twitter
          css={[
            tw`w-4 sm-t:w-5 text-offblack dark:text-offwhite group-hover:text-offwhite dark:group-hover:text-offblack group-active:text-grey transition-colors`
          ]}
        />
      );
      break;

    case `vimeo`:
      iconJSX = (
        <Vimeo
          css={[
            tw`w-4 sm-t:w-5 text-offblack dark:text-offwhite group-hover:text-offwhite dark:group-hover:text-offblack group-active:text-grey transition-colors`
          ]}
        />
      );
      break;

    case `youtube`:
      iconJSX = (
        <Youtube
          css={[
            tw`w-4 sm-t:w-5 text-offblack dark:text-offwhite group-hover:text-offwhite dark:group-hover:text-offblack group-active:text-grey transition-colors`
          ]}
        />
      );
      break;

    default:
      break;
  }

  if (to) {
    return (
      <Go to={to}>
        <Container className="group" type="button">
          {iconJSX}
        </Container>
      </Go>
    );
  }

  return (
    <Container className="group" type="button">
      {iconJSX}
    </Container>
  );
};

export default SocialButton;
