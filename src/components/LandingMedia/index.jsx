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

const LandingMedia = ({ media }) => {
  const myVideo = cld
    ?.video(media?.video?.public_id)
    .resize(limitFit().width(1440))
    .delivery(quality(`auto`))
    .delivery(format(`auto`));

  // console.log(`myVideo`, myVideo);

  const videoURL = myVideo?.toURL();

  // console.log(`videoURL`, videoURL);

  return (
    <Grid css={[tw`h-auto sm-t:h-full`]}>
      <MediaWrapper>
        <Figure>
          {media?.image && media?.type === `image` && (
            <Image image={media.image} css={[tw`w-auto`]} />
          )}

          {videoURL && media?.type === `video` && (
            <Video
              src="https://res.cloudinary.com/dd408uhc4/video/upload/f_auto/q_auto/3D_RGBA-WEB0001-0120_eefy1f.webm"
              css={[tw`w-auto`]}
              type={media.video.format}
              contain
            />
          )}
        </Figure>
      </MediaWrapper>
    </Grid>
  );
};

export default LandingMedia;
