import React from "react";

export default {
  name: `linkGroup`,
  title: `Link group`,
  type: `object`,
  fields: [
    {
      name: `title`,
      title: `Title`,
      type: `string`
    },
    {
      name: `links`,
      title: `Links`,
      type: `array`,
      of: [{ type: `link` }]
    }
  ],
  preview: {
    select: {
      title: `title`
    },
    prepare: ({ title }) => ({
      title,
      media: <span style={{ fontSize: `30px` }}>⛓</span>
    })
  }
};
