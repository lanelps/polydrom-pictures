import React from "react";
import tw from "twin.macro";
import { Cloudinary } from "@cloudinary/url-gen";
import {
  quality,
  format
} from "@cloudinary/transformation-builder-sdk/actions/delivery";
import { limitFit } from "@cloudinary/transformation-builder-sdk/actions/resize";

import { Image, Grid, Video } from "~components";

const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.GATSBY_CLOUDINARY_NAME
  },
  url: {
    secure: true
  }
});

const MediaWrapper = tw.div`relative w-full h-full col-span-full flex items-center justify-center opacity-0 animate-appear animation-delay-1000`;
const Figure = tw.figure`relative w-full h-full sm-t:(max-w-[70vw] max-h-[339px]) sm-d:(max-w-[45vw] max-h-[648px])`;

const generateCloudinaryVideoURL = (publicId, options) => {
  let myVideo = cld?.video(publicId);

  if (options?.width) {
    myVideo = myVideo.resize(limitFit().width(options.width));
  }
  if (options?.quality) {
    myVideo = myVideo.delivery(quality(options.quality));
  }
  if (options?.format) {
    myVideo = myVideo.delivery(format(options.format));
  }

  return myVideo?.toURL();
};

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
      videoSources.push({
        url: generateCloudinaryVideoURL(media?.video?.source?.public_id, {
          quality: `auto`,
          width: 1440
        }),
        type: `webm; codecs=vp9`
      });
    }
  }

  return (
    <Grid css={[tw`h-auto sm-t:h-full`]}>
      <MediaWrapper>
        <Figure>
          {media?.type === `image` && media?.image && (
            <Image image={media.image} css={[tw`w-auto`]} />
          )}

          {media?.type === `video` && videoSources?.length > 0 && (
            <Video sources={videoSources} css={[tw`w-auto`]} contain />
          )}
        </Figure>
      </MediaWrapper>
    </Grid>
  );
};

export default LandingMedia;
