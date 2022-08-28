export default {
  name: `download`,
  title: `Download`,
  type: `object`,
  fields: [
    {
      name: `links`,
      title: `Links`,
      type: `array`,
      of: [{ type: `downloadLink` }],
    },
  ],
  preview: {
    prepare() {
      return {
        title: `Download`,
      };
    },
  },
};
