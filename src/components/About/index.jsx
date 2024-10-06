import React, { useEffect, useRef, useCallback } from "react";
import tw, { css, styled } from "twin.macro";

import { Grid, PortableText } from "~components";
import { useApp, useSize, useZIndex } from "~hooks";

import { deviceType } from "~utils/helpers";

const Container = styled.section(({ active }) => [
  tw`absolute top-0 bottom-0 left-0 right-0 py-4 pointer-events-none overflow-hidden opacity-100 transition-opacity delay-[300ms]`,
  active && tw`opacity-100 delay-[0ms]`,
]);

const TransformWrapper = styled.div(({ active }) => [
  tw`relative w-[calc(100% + 1.5rem)] sm-t:w-[calc(100% + 1rem)] h-[90%] sm-t:h-[85%] col-span-full sm-t:col-start-2 sm-t:col-span-3 self-end translate-x-full sm-t:translate-x-[calc(100% + (100%/3))] translate-y-4 transition-transform duration-[600ms] overflow-hidden`,
  active && tw`-translate-x-3 sm-t:translate-x-1/3`
]);

const Background = styled.div(() => [
  tw`w-full h-full absolute p-3 sm-t:p-4 pb-24 sm-t:pb-16 sm-d:pb-[4.75rem] bg-green dark:bg-red transition-colors z-[1]`,
  css`
    clip-path: inset(0px 0px 0px 0px);
  `
]);

const Content = styled.div(({ active }) => [
  tw`w-full h-full relative p-3 sm-t:p-4 pb-24 sm-t:pb-16 sm-d:pb-[4.75rem] overflow-y-scroll overflow-x-hidden z-10 pointer-events-none text-offblack dark:text-offwhite transition-colors`,
  active && tw`pointer-events-auto`
]);

const Circle = React.memo(
  styled.div(({ size }) => [
    tw`hidden sm-t:block fixed bg-babyblue dark:bg-offblack rounded-full z-[5] -translate-x-full -translate-y-full`,
    css`
      width: ${size}px;
      height: ${size}px;
    `
  ])
);

// Utility: Throttle function
const throttle = (func) => {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      requestAnimationFrame(() => (inThrottle = false));
    }
  };
};

const About = ({ body }) => {
  const { isWindowActive, activeWindows } = useApp();
  const aboutActive = isWindowActive('about');

  const [backgroundRef, backgroundSize] = useSize();

  // Refs for mutable values
  const positionRef = useRef({ x: 0, y: 0 });
  const offsetRef = useRef({ x: 0, y: 0 });
  const circleRef = useRef(null);
  const containerRef = useRef(null);

  const size = 718;
  const showRef = useRef(deviceType() === "desktop");

  const zIndex = useZIndex("about");

 // Function to update z-index directly on the DOM element
 const updateZIndex = useCallback(() => {
  if (containerRef.current) {
    containerRef.current.style.zIndex = zIndex;
  }
}, [zIndex]);

  // Handle mouse move with throttling
  const handleMouseMove = useCallback(
    throttle((e) => {
      positionRef.current = { x: e.clientX, y: e.clientY };
      if (backgroundRef.current) {
        const { top, left } = backgroundRef.current.getBoundingClientRect();
        offsetRef.current = { x: left, y: top };
      }

      // Update Circle position directly
      if (circleRef.current) {
        const { x, y } = positionRef.current;
        const { x: offsetX, y: offsetY } = offsetRef.current;
        circleRef.current.style.transform = `translate3d(${x - offsetX - size / 2}px, ${
          y - offsetY - size / 2
        }px, 0)`;
      }
    }, 16), // Approximately 60fps
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
    <Grid css={[tw`h-full`]}>
        <TransformWrapper active={aboutActive}>
          <Background ref={backgroundRef}>
            {showRef.current && (
              <Circle
                ref={circleRef}
                size={size}
              />
            )}
          </Background>

          <Content active={aboutActive}>
            <PortableText blocks={body} css={[tw`z-10`]} />
          </Content>
        </TransformWrapper>
      </Grid>
    </Container>
  );
};

export default About;
