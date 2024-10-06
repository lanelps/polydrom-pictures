import React, { useEffect, useRef, useCallback } from "react";
import tw, { styled } from "twin.macro";

import { Button, Go, Image } from "~components";
import { useApp } from "~hooks";

const Container = styled.div(() => [
  tw`fixed w-auto max-w-[5.25rem] sm-t:max-w-[10.25rem] flex items-end justify-center z-[100] opacity-0 animate-appear animation-delay-1000 will-change-transform mix-blend-difference`
]);
const DVDButton = tw(
  Button
)`bg-offwhite border-offblack text-offblack hover:(bg-offblack text-offwhite) dark:(bg-transparent text-offwhite border-offwhite) uppercase`;

const DVD = ({ dvd }) => {
  const { image, linkText, linkUrl } = dvd || {
    image: null,
    linkText: "Newsletter",
    linkUrl: ""
  };
  const { toggleWindow } = useApp();

  const toggleContactActive = () => toggleWindow("contact");

  const dvdRef = useRef(null);
  const positionRef = useRef({ x: 0, y: 100 });
  const speedRef = useRef({ x: 3, y: 2 });
  const animationFrameRef = useRef(null);

  const checkHitbox = () => {
    const { x, y } = positionRef.current;
    const dvdElement = dvdRef.current;

    if (!dvdElement) return;

    const { clientWidth, clientHeight } = dvdElement;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Check X boundaries
    if (x + clientWidth >= windowWidth || x <= 0) {
      speedRef.current.x *= -1;
    }

    // Check Y boundaries
    if (y + clientHeight >= windowHeight || y <= 0) {
      speedRef.current.y *= -1;
    }
  };

  const animate = useCallback(() => {
    const { x, y } = positionRef.current;
    const { x: speedX, y: speedY } = speedRef.current;
    const speedScale = 0.5;

    // Update position
    positionRef.current = {
      x: x + speedX * speedScale,
      y: y + speedY * speedScale
    };

    checkHitbox();

    // Apply transform directly to the DOM element to bypass React's render cycle
    if (dvdRef.current) {
      dvdRef.current.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0)`;
    }

    // Request the next frame
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [checkHitbox]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Start the animation
    animationFrameRef.current = requestAnimationFrame(animate);

    // Cleanup on unmount
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animate]);

  return (
    <Container ref={dvdRef}>
      {image && <Image image={image} />}
      {linkUrl ? (
        <Go to={linkUrl} css={[!image ? tw`relative` : tw`absolute`]}>
          <DVDButton>{linkText}</DVDButton>
        </Go>
      ) : (
        <DVDButton
          kind={2}
          css={[!image ? tw`relative` : tw`absolute`]}
          onClick={toggleContactActive}
        >
          {linkText}
        </DVDButton>
      )}
    </Container>
  );
};

export default React.memo(DVD);
