import React from "react";
import tw, { css, styled } from "twin.macro";

import { Button, Go, Image } from "~components";
import { useApp } from "~hooks";

const Container = tw.div`fixed top-[60%] left-[10%] w-[10vw] max-w-[10.25rem] flex items-center justify-center z-30 mix-blend-difference`;
const DVDButton = tw(
  Button
)`bg-offblack backdrop-blur-[10rem] border-white text-white hover:(bg-offwhite border-offwhite text-offblack) dark:(bg-offwhite border-white text-offblack hover:(bg-offblack text-offwhite))`;

const DVD = ({ dvd }) => {
  const { image, linkText, linkUrl } = dvd;
  const { contactActive, setContactActive } = useApp();

  return (
    <Container>
      <Image image={image} />
      {linkUrl ? (
        <Go to={linkUrl} css={[tw`absolute`]}>
          <DVDButton>{linkText}</DVDButton>
        </Go>
      ) : (
        <DVDButton
          css={[tw`absolute`]}
          onClick={() => setContactActive(!contactActive)}
        >
          {linkText}
        </DVDButton>
      )}
    </Container>
  );
};

export default DVD;
