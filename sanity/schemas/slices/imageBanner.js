export default {
  name: `imageBanner`,
  title: `Image Banner`,
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
      name: `preheading`,
      title: `Preheading`,
      type: `string`,
    },
    {
      name: `heading`,
      title: `Heading`,
      type: `string`,
    },
    {
      name: `image`,
      title: `Image`,
      type: `altImage`,
    },
  ],
  preview: {
    prepare() {
      return {
        title: `Image Banner`,
      };
    },
  },
};
