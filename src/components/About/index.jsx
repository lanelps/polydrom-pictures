import React from "react";
import tw, { styled } from "twin.macro";

import { Grid, PortableText } from "~components";
import { useApp } from "~hooks";

const Conatiner = styled.secton(({ active }) => [
  tw`absolute top-0 bottom-0 left-0 right-0 z-30 py-4 opacity-0 pointer-events-none overflow-hidden transition-opacity`,
  active && tw`opacity-100 pointer-events-auto`
]);
const Wrapper = tw.div`relative w-[calc(100% + 1.5rem)] sm-t:w-[calc(100% + 1rem)] h-[90%] sm-t:h-[85%] col-span-full sm-t:col-start-2 col-span-3 translate-x--3 sm-t:translate-x-0 translate-y-4 self-end p-3 sm-t:p-4 pb-24 sm-t:pb-16 sm-d:pb-[4.75rem] bg-green overflow-y-scroll`;

const About = ({ body }) => {
  const { aboutActive } = useApp();
  return (
    <Conatiner active={aboutActive}>
      <Grid css={[tw`h-full`]}>
        <Wrapper>
          <PortableText blocks={body} />
        </Wrapper>
      </Grid>
    </Conatiner>
  );
};

export default About;
