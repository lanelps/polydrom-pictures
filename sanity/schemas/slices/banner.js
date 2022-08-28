export default {
  name: `banner`,
  title: `Banner`,
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
      name: `heading`,
      title: `Heading`,
      type: `string`,
    },
    {
      name: `ctaText`,
      title: `CTA Text`,
      type: `string`,
    },
    {
      name: `ctaTarget`,
      title: `CTA Target`,
      type: `string`,
    },
  ],
  preview: {
    prepare() {
      return {
        title: `Banner`,
      };
    },
  },
};
