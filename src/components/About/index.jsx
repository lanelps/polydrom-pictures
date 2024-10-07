import React, { useState, useEffect, useRef, useCallback } from "react";
import tw, { css, styled } from "twin.macro";

import { PortableText } from "~components";
import { useApp, useSize } from "~hooks";

const Container = styled.section(({ active }) => [
  tw`absolute top-0 bottom-0 left-0 right-0 pointer-events-none overflow-hidden opacity-100 transition-opacity delay-[300ms]`,
  active && tw`opacity-100 delay-[0ms]`
]);

const TransformWrapper = styled.div(({ active }) => [
  tw`absolute bottom-0 w-full h-[90%] sm-t:h-[50vh] translate-y-full transition-transform duration-[600ms] overflow-hidden`,
  active && tw`translate-y-0`
]);

const Background = styled.div(() => [
  tw`w-full h-full absolute p-3 sm-t:p-4 pb-24 sm-t:pb-16 sm-d:pb-[4.75rem] bg-yellow dark:bg-yellow transition-colors z-10`,
  css`
    clip-path: url(#holeClip);
    -webkit-clip-path: url(#holeClip);
  `
]);

const BaseContent = styled.div(() => [
  tw`w-full h-full p-3 sm-t:p-4 pb-24 sm-t:pb-16 sm-d:pb-[4.75rem] overflow-y-scroll overflow-x-hidden transition-colors pointer-events-auto`
]);

const MaskedContent = styled(BaseContent)(() => [
  tw`absolute inset-0 text-offwhite z-[-1]`
]);

const MainContent = styled(BaseContent)(() => [
  tw`relative z-10 text-offblack`,
  css`
    clip-path: url(#holeClip);
    -webkit-clip-path: url(#holeClip);
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

const ClipPathSVG = ({ holePosition, holeRadius, size }) => {
  const pathRef = useRef(null);

  useEffect(() => {
    if (pathRef.current && size.width > 0 && size.height > 0) {
      const { x, y } = holePosition; // Absolute coordinates in pixels
      const r = holeRadius; // Radius in pixels

      // Define the path with evenodd
      const newPath = `
        M0,0 H${size.width} V${size.height} H0 Z 
        M${x},${y} 
        m-${r},0 
        a${r},${r} 0 1,0 ${2 * r},0 
        a${r},${r} 0 1,0 -${2 * r},0
      `;
      pathRef.current.setAttribute("d", newPath);
    }
  }, [holePosition, holeRadius, size]);

  return (
    <svg
      width={size.width}
      height={size.height}
      style={{ position: "absolute", width: 0, height: 0 }}
    >
      <defs>
        <clipPath id="holeClip" clipPathUnits="userSpaceOnUse">
          <path
            ref={pathRef}
            d={`M0,0 H${size.width} V${size.height} H0 Z M${holePosition.x},${holePosition.y} m-${holeRadius},0 a${holeRadius},${holeRadius} 0 1,0 ${2 * holeRadius},0 a${holeRadius},${holeRadius} 0 1,0 -${2 * holeRadius},0`}
          />
        </clipPath>
      </defs>
    </svg>
  );
};

const About = ({ body }) => {
  const { isWindowActive } = useApp();
  const aboutActive = isWindowActive("about");

  const backgroundRef = useRef();
  const [backgroundSize, setBackgroundSize] = useState({ width: 0, height: 0 });

  // State for hole position
  const [holePosition, setHolePosition] = useState({ x: 0, y: 0 }); // Will be set to center on mount
  const [holeRadius, setHoleRadius] = useState(194);

  // Handle mouse move with throttling and requestAnimationFrame
  const handleMouseMove = useCallback(
    throttle((e) => {
      if (!backgroundRef.current) return;

      const { top, left } = backgroundRef.current.getBoundingClientRect();

      // Calculate mouse position relative to Background in pixels
      const relativeX = e.clientX - left;
      const relativeY = e.clientY - top;

      setHolePosition({ x: relativeX, y: relativeY });
    }, 16), // Approximately 60fps
    [backgroundRef]
  );

  const handleResize = useCallback(() => {
    const { width, height } = backgroundRef.current.getBoundingClientRect();
    setBackgroundSize({ width, height });
  }, [backgroundRef]);

  // Add/remove mousemove event listener
  useEffect(() => {
    if (!aboutActive) return;

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.addEventListener("resize", handleResize);
    };
  }, [aboutActive, handleMouseMove]);

  useEffect(() => {
    if (!backgroundRef.current) return;

    const { width, height } = backgroundRef.current.getBoundingClientRect();

    setBackgroundSize({ width, height });
  }, [backgroundRef]);

  return (
    <Container active={aboutActive}>
      <ClipPathSVG
        holePosition={holePosition}
        holeRadius={holeRadius}
        size={{ width: backgroundSize.width, height: backgroundSize.height }}
      />

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
