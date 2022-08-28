export default {
  name: `fontInspector`,
  title: `Font Inspector`,
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
      name: `fonts`,
      title: `Fonts`,
      type: `array`,
      of: [{ type: `fontStyle` }],
    },
  ],
  preview: {
    prepare() {
      return {
        title: `Font Inspector`,
      };
    },
  },
};
