export default {
  name: `fontList`,
  title: `Font List`,
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
      description: `Each font must match a defined font-family`,
      of: [{ type: `string` }],
    },
  ],
  preview: {
    prepare() {
      return {
        title: `Font List`,
      };
    },
  },
};
