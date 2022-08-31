import React from "react";

export default {
  name: `link`,
  title: `Link`,
  type: `object`,
  fields: [
    {
      name: `name`,
      title: `Name`,
      type: `string`
    },
    {
      name: `url`,
      title: `Url`,
      type: `url`
    }
  ],
  preview: {
    select: {
      name: `name`,
      url: `url`
    },
    prepare: ({ name, url }) => ({
      title: name,
      subtitle: url,
      media: <span style={{ fontSize: `30px` }}>🔗</span>
    })
  }
};
