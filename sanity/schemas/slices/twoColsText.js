export default {
  name: `twoColsText`,
  title: `Two Columns Of Text`,
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
      name: `subtitle`,
      title: `Subtitle`,
      type: `string`,
    },
    {
      name: `caption`,
      title: `Caption`,
      type: `string`,
    },
    {
      name: `content`,
      title: `Content`,
      type: `array`,
      of: [{ type: `download` }, { type: `newsletter` }, { type: `textContent` }],
    },
  ],
  preview: {
    prepare() {
      return {
        title: `Two Columns Of Text`,
      };
    },
  },
};
