/* eslint-disable import/prefer-default-export */

import { Cloudinary } from "@cloudinary/url-gen";
import {
  quality,
  format
} from "@cloudinary/transformation-builder-sdk/actions/delivery";
import { limitFit } from "@cloudinary/transformation-builder-sdk/actions/resize";

const cld = new Cloudinary({
  cloud: {
    cloudName: process?.env?.GATSBY_CLOUDINARY_NAME
  },
  url: {
    secure: true
  }
});

export const generateCloudinaryVideoURL = (publicId, options) => {
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
