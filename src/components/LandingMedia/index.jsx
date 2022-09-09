import React from "react";
import tw from "twin.macro";

import { Image, Grid, Video } from "~components";

const MediaWrapper = tw.div`relative w-full h-full col-span-full flex items-center justify-center`;
const Figure = tw.figure`relative sm-t:max-w-[70vw] sm-d:max-w-[50vw]`;

const LandingMedia = ({ media }) => (
  <Grid css={[tw`h-auto sm-t:h-full`]}>
    <MediaWrapper>
      <Figure>
        {media?.type === `image` && (
          <Image image={media.image} css={[tw`w-full`]} />
        )}

        {media?.type === `video` && <Video src={media.video} />}
      </Figure>
    </MediaWrapper>
  </Grid>
);

export default LandingMedia;
