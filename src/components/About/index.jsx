import React, { useEffect, useRef, useCallback } from "react";
import tw, { css, styled } from "twin.macro";

import { PortableText } from "~components";
import { useApp, useSize, useZIndex } from "~hooks";

const Container = styled.section(({ active }) => [
  tw`absolute top-0 bottom-0 left-0 right-0 pointer-events-none overflow-hidden opacity-100 transition-opacity delay-[300ms]`,
  active && tw`opacity-100 delay-[0ms]`
]);

const TransformWrapper = styled.div(({ active }) => [
  tw`absolute bottom-0 w-full h-[90%] sm-t:h-[50vh] translate-y-full transition-transform duration-[600ms] overflow-hidden`,
  active && tw`translate-y-0`
]);

const Background = styled.div(() => [
  tw`w-full h-full absolute p-3 sm-t:p-4 pb-24 sm-t:pb-16 sm-d:pb-[4.75rem] bg-green dark:bg-yellow transition-colors z-[1]`,
  css`
    mask: url(#holeMask) no-repeat center;
    mask-size: cover;
  `
]);

const BaseContent = styled.div(() => [
  tw`w-full h-full p-3 sm-t:p-4 pb-24 sm-t:pb-16 sm-d:pb-[4.75rem] overflow-y-scroll overflow-x-hidden transition-colors pointer-events-auto`
]);

const MaskedContent = styled(BaseContent)(() => [
  tw`absolute inset-0 text-offblack dark:text-offwhite`
]);

const MainContent = styled(BaseContent)(() => [
  tw`relative z-10 text-offwhite dark:text-offblack`,
  css`
    mask: url(#holeMask) no-repeat center;
    mask-size: cover;
  `
]);

// Utility: Throttle function
const throttle = (func, limit) => {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

const SvgMask = React.memo(
  React.forwardRef(({ size }, ref) => (
    <svg tw="absolute w-full h-full">
      <defs>
        <mask id="holeMask">
          <rect width="100%" height="100%" fill="white" />
          <circle
            ref={ref}
            cx="0"
            cy="0"
            r={size / 2}
            fill="black"
            tw="hidden sm-t:block"
          />
        </mask>
      </defs>
    </svg>
  ))
);

const About = ({ body }) => {
  const { isWindowActive, activeWindows } = useApp();
  const aboutActive = isWindowActive("about");

  const [backgroundRef, backgroundSize] = useSize();

  // Refs for mutable values
  const positionRef = useRef({ x: 0, y: 0 });
  const offsetRef = useRef({ x: 0, y: 0 });
  const maskCircleRef = useRef(null);
  const containerRef = useRef(null);

  const size = 388;

  const zIndex = useZIndex("about");

  // Function to update z-index directly on the DOM element
  const updateZIndex = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.style.zIndex = zIndex;
    }
  }, [zIndex]);

  // Handle mouse move with throttling and requestAnimationFrame
  const handleMouseMove = useCallback(
    throttle((e) => {
      positionRef.current = { x: e.clientX, y: e.clientY };
      if (backgroundRef.current) {
        const { top, left } = backgroundRef.current.getBoundingClientRect();
        offsetRef.current = { x: left, y: top };
      }

      const { x, y } = positionRef.current;
      const { x: offsetX, y: offsetY } = offsetRef.current;

      const relativeX = x - offsetX;
      const relativeY = y - offsetY;

      if (maskCircleRef.current) {
        requestAnimationFrame(() => {
          maskCircleRef.current.setAttribute("cx", relativeX);
          maskCircleRef.current.setAttribute("cy", relativeY);
        });
      }
    }, 16), // Approximately 60fps, adjust as needed
    [backgroundRef, size]
  );

  useEffect(() => {
    updateZIndex();
  }, [activeWindows, updateZIndex]);

  // Add/remove mousemove event listener
  useEffect(() => {
    if (!aboutActive) return;

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [aboutActive, handleMouseMove]);

  // Update offset when backgroundRef or backgroundSize changes
  useEffect(() => {
    if (backgroundRef.current && aboutActive) {
      const { top, left } = backgroundRef.current.getBoundingClientRect();
      offsetRef.current = { x: left, y: top };
    }
  }, [backgroundRef, backgroundSize, aboutActive]);

  return (
    <Container ref={containerRef} active={aboutActive}>
      <SvgMask ref={maskCircleRef} size={size} />
      <TransformWrapper active={aboutActive}>
        <MaskedContent active={aboutActive} aria-hidden="true">
          <PortableText blocks={body} />
        </MaskedContent>

        <Background ref={backgroundRef} />

        <MainContent active={aboutActive}>
          <PortableText blocks={body} />
        </MainContent>
      </TransformWrapper>
    </Container>
  );
};

export default About;
