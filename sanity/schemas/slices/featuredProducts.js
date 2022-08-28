export default {
  name: `featuredProducts`,
  title: `Featured Products`,
  type: `object`,
  fields: [
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
      name: `products`,
      title: `Products`,
      type: `array`,
      of: [{ type: `product` }],
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
        title: `Featured Products`,
      };
    },
  },
};
