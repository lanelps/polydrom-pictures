export default {
  name: `media`,
  title: `Media`,
  type: `object`,
  fields: [
    {
      name: `backgroundColor`,
      title: `Background Color`,
      type: `reference`,
      to: [{ type: `colour` }],
    },
    {
      name: `fontColor`,
      title: `Font Color`,
      type: `reference`,
      to: [{ type: `colour` }],
    },
    {
      name: `title`,
      title: `Title`,
      type: `string`,
    },
    {
      name: `image`,
      title: `Image`,
      type: `altImage`,
    },
    {
      name: `videoURL`,
      title: `Video URL`,
      description: `Overrides the image when set.`,
      type: `string`,
    },
  ],
  preview: {
    prepare() {
      return {
        title: `Media`,
      };
    },
  },
};
