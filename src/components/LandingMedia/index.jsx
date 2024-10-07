import React from "react";
import tw from "twin.macro";

import { Image, Grid, Video } from "~components";

import { generateCloudinaryVideoURL } from "~utils/cloudinary";

const MediaWrapper = tw.div`fixed inset-0 w-screen h-screen flex items-center justify-center opacity-0 animate-appear animation-delay-1000`;
// const Figure = tw.figure`relative w-full h-full sm-t:(max-w-[70vw] max-h-[339px]) sm-d:(max-w-[45vw] max-h-[648px])`;
const Figure = tw.figure`w-full h-full`;

const LandingMedia = ({ media }) => {
  const videoSources = [];

  if (media?.type === `video`) {
    // safari source needs to be first
    if (media?.video?.safariSource) {
      videoSources.push({
        url: generateCloudinaryVideoURL(media?.video?.safariSource?.public_id),
        type: `mp4; codecs=hvc1`
      });
    }

    if (media?.video?.source) {
      console.log(`media?.video?.source`, media?.video?.source);
      videoSources.push({
        url: generateCloudinaryVideoURL(media?.video?.source?.public_id, {
          quality: `auto`,
          width: 1440
        }),
        // type: `webm; codecs=vp9`
        type: `mp4`
      });
    }
  }

  return (
    <Grid css={[tw`h-auto sm-t:h-full`]}>
      <MediaWrapper>
        <Figure>
          {media?.type === `image` && media?.image && (
            <Image image={media.image} tw="w-full h-full" />
          )}

          {media?.type === `video` && videoSources?.length > 0 && (
            <Video sources={videoSources} />
          )}
        </Figure>
      </MediaWrapper>
    </Grid>
  );
};

export default LandingMedia;
