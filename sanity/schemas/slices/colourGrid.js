export default {
  name: `colourGrid`,
  title: `Colour Grid`,
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
      name: `colours`,
      title: `Colours`,
      type: `array`,
      of: [{ type: `colourGridItem` }],
    },
  ],
  preview: {
    prepare() {
      return {
        title: `Colour Grid`,
      };
    },
  },
};
