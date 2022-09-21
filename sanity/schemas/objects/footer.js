export default {
  name: `footer`,
  title: `Footer`,
  type: `object`,
  fields: [
    {
      name: `title`,
      title: `Title`,
      type: `string`
    },
    {
      name: `font`,
      title: `Font`,
      type: `file`,
      accept: `font/woff, font/woff2`,
      description: `Upload a woff2 or woff file. Default to Helvetica Neue.`
    }
  ]
};
