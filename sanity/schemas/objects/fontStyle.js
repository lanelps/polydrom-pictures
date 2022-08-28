export default {
  name: `fontStyle`,
  title: `Font Style`,
  type: `object`,
  fields: [
    {
      name: `key`,
      title: `Key`,
      type: `string`,
      description: `Used to select this font style in the header menu`,
    },
    {
      name: `name`,
      title: `Name`,
      type: `string`,
    },
    {
      name: `fontVariants`,
      title: `Font Variants`,
      type: `array`,
      of: [{ type: `fontVariant` }],
    },
  ],
};
