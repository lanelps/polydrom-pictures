import React, { useState, useEffect, useRef } from "react";
import tw, { css, styled } from "twin.macro";

import { Button, Go, Image } from "~components";
import { useApp } from "~hooks";

const Container = styled.div(({ position }) => [
  tw`fixed w-[10vw] max-w-[10.25rem] flex items-center justify-center z-30 mix-blend-difference`,
  css`
    will-change: transform;
    transform: translate3d(${position.x}px, ${position.y}px, 0);
  `
]);
const DVDButton = tw(
  Button
)`bg-offblack backdrop-blur-[10rem] border-white text-white hover:(bg-offwhite border-offwhite text-offblack) dark:(bg-offwhite border-white text-offblack hover:(bg-offblack text-offwhite))`;

const DVD = ({ dvd }) => {
  const { image, linkText, linkUrl } = dvd;
  const { contactActive, setContactActive } = useApp();

  const dvdRef = useRef();
  const [position, setPosition] = useState({ x: 0, y: 100 });
  const speedRef = useRef({ x: 3, y: 2 });
  const speedScale = 1;

  const requestRef = useRef();
  const previousTimeRef = useRef();

  const checkHitbox = (pos) => {
    // x
    if (pos.x + dvdRef.current.clientWidth >= window.innerWidth || pos.x < 0) {
      speedRef.current.x *= -1;
    }

    // y
    if (
      pos.y + dvdRef.current.clientHeight >= window.innerHeight ||
      pos.y < 0
    ) {
      speedRef.current.y *= -1;
    }
  };

  const animate = (time) => {
    if (previousTimeRef.current !== undefined) {
      setPosition((prevPosition) => {
        checkHitbox(prevPosition);

        return {
          x: prevPosition.x + speedRef.current.x * speedScale,
          y: prevPosition.y + speedRef.current.y * speedScale
        };
      });
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (typeof window === `undefined`) return () => {};

    const animationID = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(animationID);
    };
  }, []);

  return (
    <Container ref={dvdRef} position={position}>
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
