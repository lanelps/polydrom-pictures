import React, { useState, useEffect } from "react";
import tw, { css, styled } from "twin.macro";

import { Grid, PortableText } from "~components";
import { useApp, useSize } from "~hooks";

import { deviceType } from "~utils/helpers";

const Conatiner = styled.secton(({ active }) => [
  tw`absolute top-0 bottom-0 left-0 right-0 z-30 py-4 opacity-0 pointer-events-none overflow-hidden transition-opacity`,
  active && tw`opacity-100 pointer-events-auto`
]);
const Position = tw.div`w-[calc(100% + 1.5rem)] sm-t:w-[calc(100% + 1rem)] h-[90%] sm-t:h-[85%] col-span-full sm-t:col-start-2 col-span-3 translate-x--3 sm-t:translate-x-0 translate-y-4 self-end p-3 sm-t:p-4 pb-24 sm-t:pb-16 sm-d:pb-[4.75rem]`;
const Background = styled(Position)(() => [
  tw`absolute bg-green z-[1]`,
  css`
    clip-path: inset(0px 0px 0px 0px);
  `
]);
const Content = tw(Position)`relative overflow-y-scroll overflow-x-hidden z-10`;
const Circle = styled.div(({ offSet, position, size, show }) => [
  tw`fixed hidden bg-babyblue rounded-full z-[5]`,
  show && tw`block`,
  css`
    width: ${size}px;
    height: ${size}px;

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
  const { aboutActive } = useApp();
  const [backgroundRef, backgroundSize] = useSize();

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [offSet, setOffSet] = useState({ x: 0, y: 0 });
  const [show, setShow] = useState(false);

  const size = 718;

  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    if (typeof window === `undefined`) return null;

    window.addEventListener(`mousemove`, handleMouseMove);

    return () => {
      window.removeEventListener(`mousemove`, handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (deviceType() !== `desktop`) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, []);

  useEffect(() => {
    if (!backgroundRef?.current) return;

    const { top, left } = backgroundRef.current.getBoundingClientRect();

    setOffSet({ x: left, y: top });
  }, [backgroundRef, backgroundSize]);

  return (
    <Conatiner active={aboutActive}>
      <Grid css={[tw`h-full`]}>
        <Background ref={backgroundRef}>
          <Circle offSet={offSet} position={position} size={size} show={show} />
        </Background>

        <Content>
          <PortableText blocks={body} css={[tw`z-10`]} />
        </Content>
      </Grid>
    </Conatiner>
  );
};

export default About;
