import React from "react";
import tw from "twin.macro";

import { Image, Grid, Video } from "~components";

const MediaWrapper = tw.div`relative w-full h-full col-span-full flex items-center justify-center opacity-0 animate-appear animation-delay-1000`;
const Figure = tw.figure`relative w-full h-full sm-t:(max-w-[70vw] max-h-[339px]) sm-d:(max-w-[45vw] max-h-[648px])`;

const LandingMedia = ({ media }) => (
  <Grid css={[tw`h-auto sm-t:h-full`]}>
    <MediaWrapper>
      <Figure>
        {media?.type === `image` && (
          <Image image={media.image} css={[tw`w-auto`]} />
        )}

        {media?.type === `video` && (
          <Video src={media.video} css={[tw`w-auto`]} contain />
        )}
      </Figure>
    </MediaWrapper>
  </Grid>
);

export default LandingMedia;
