import React, { useState, useEffect } from "react";
import tw, { css, styled } from "twin.macro";

import { Grid, PortableText } from "~components";
import { useApp, useSize } from "~hooks";

import { deviceType } from "~utils/helpers";

const Conatiner = styled.section(({ zIndex, active }) => [
  tw`absolute top-0 bottom-0 left-0 right-0 py-4 pointer-events-none overflow-hidden opacity-100 transition-opacity delay-[300ms]`,
  active && tw`opacity-100 delay-[0ms]`,
  css`
    z-index: ${zIndex};
  `
]);
const TransformWrapper = styled.div(({ active }) => [
  tw`relative w-[calc(100% + 1.5rem)] sm-t:w-[calc(100% + 1rem)] h-[90%] sm-t:h-[85%] col-span-full sm-t:col-start-2 sm-t:col-span-3 self-end translate-x-full sm-t:translate-x-[calc(100% + (100%/3))] translate-y-4 transition-transform duration-[600ms] overflow-hidden`,
  active && tw`-translate-x-3 sm-t:translate-x-1/3`
]);
const Background = styled.div(() => [
  tw`w-full h-full absolute p-3 sm-t:p-4 pb-24 sm-t:pb-16 sm-d:pb-[4.75rem] bg-green dark:bg-purple transition-colors z-[1]`,
  css`
    clip-path: inset(0px 0px 0px 0px);
  `
]);
const Content = styled.div(({ active }) => [
  tw`w-full h-full relative p-3 sm-t:p-4 pb-24 sm-t:pb-16 sm-d:pb-[4.75rem] overflow-y-scroll overflow-x-hidden z-10 pointer-events-none text-offblack dark:text-offwhite transition-colors`,
  active && tw`pointer-events-auto`
]);

const Circle = styled.div(({ offSet, position, size, show }) => [
  tw`fixed hidden bg-babyblue dark:bg-orange rounded-full z-[5]`,
  show && tw`block`,
  css`
    width: ${size}px;
    height: ${size}px;
  `,
  css`
    top: -${offSet.y}px;
    left: -${offSet.x}px;

    transform: translate3d(
      calc(${position.x}px - (${size / 2}px)),
      calc(${position.y}px - (${size / 2}px)),
      0
    );
  `
]);

const About = ({ body }) => {
  const { aboutActive, activeWindows } = useApp();
  const [backgroundRef, backgroundSize] = useSize();

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [offSet, setOffSet] = useState({ x: 0, y: 0 });
  const [show, setShow] = useState(false);
  const [zIndex, setZIndex] = useState();

  const size = 718;

  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });

    const { top, left } = backgroundRef.current.getBoundingClientRect();
    setOffSet({ x: left, y: top });
  };

  useEffect(() => {
    if (typeof window === `undefined` || !aboutActive)
      return () => {
        window.removeEventListener(`mousemove`, handleMouseMove);
      };

    window.addEventListener(`mousemove`, handleMouseMove);

    return () => {
      window.removeEventListener(`mousemove`, handleMouseMove);
    };
  }, [aboutActive]);

  useEffect(() => {
    if (deviceType() !== `desktop`) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, []);

  useEffect(() => {
    if (!backgroundRef?.current || !aboutActive) return;

    const { top, left } = backgroundRef.current.getBoundingClientRect();

    setOffSet({ x: left, y: top });
  }, [backgroundRef, backgroundSize, aboutActive]);

  useEffect(() => {
    const windowIndex = activeWindows.findIndex((el) => el === `about`);

    switch (windowIndex) {
      case 0:
        setZIndex(`30`);
        break;

      case 1:
        setZIndex(`40`);
        break;

      case 2:
        setZIndex(`50`);
        break;

      default:
        break;
    }
  }, [activeWindows]);

  return (
    <Conatiner active={aboutActive} zIndex={zIndex}>
      <Grid css={[tw`h-full`]}>
        <TransformWrapper active={aboutActive}>
          <Background ref={backgroundRef}>
            <Circle
              offSet={offSet}
              position={position}
              size={size}
              show={show}
            />
          </Background>

          <Content active={aboutActive}>
            <PortableText blocks={body} css={[tw`z-10`]} />
          </Content>
        </TransformWrapper>
      </Grid>
    </Conatiner>
  );
};

export default About;
