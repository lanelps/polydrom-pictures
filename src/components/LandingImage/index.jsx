import React from "react";
import tw from "twin.macro";

import { Image, Grid } from "~components";

const ImageWrapper = tw.div`relative w-full h-full col-span-full flex items-center justify-center`;
const Figure = tw.figure`relative sm-t:max-w-[70vw] sm-d:max-w-[50vw]`;

const LandingImage = ({ image }) => (
  <Grid css={[tw`h-full`]}>
    <ImageWrapper>
      <Figure>
        <Image image={image} css={[tw`w-full`]} />
      </Figure>
    </ImageWrapper>
  </Grid>
);

export default LandingImage;
