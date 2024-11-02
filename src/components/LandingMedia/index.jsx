import React from "react";
import tw from "twin.macro";

import { Image, Grid, Video, VimeoVideo } from "~components";

const MediaWrapper = tw.div`fixed inset-0 w-screen h-[100dvh] flex items-center justify-center opacity-0 animate-appear animation-delay-1000`;
const Figure = tw.figure`w-full h-full`;

const LandingMedia = ({ media }) => {
  return (
    <Grid css={[tw`h-auto sm-t:h-full`]}>
      <MediaWrapper>
        <Figure>
          {/* {media?.type === `image` && media?.image && (
            <Image image={media.image} tw="w-full h-full" />
          )}

          {media?.type === `video` && media?.video?.source > 0 && (
            <VimeoVideo source={media.video.source} />
          )} */}
          <VimeoVideo source="https://vimeo.com/1024571569" />
        </Figure>
      </MediaWrapper>
    </Grid>
  );
};

export default LandingMedia;
