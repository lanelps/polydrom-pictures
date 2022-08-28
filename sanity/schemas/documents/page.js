export default {
  name: `page`,
  title: `Page`,
  type: `document`,
  fields: [
    {
      name: `title`,
      title: `Title`,
      type: `string`
    },
    {
      name: `subtitle`,
      title: `Subtitle`,
      type: `string`
    },
    {
      name: `slug`,
      title: `URL`,
      type: `slug`,
      options: {
        source: `title`
      }
    },
    {
      name: `slices`,
      title: `Slices`,
      type: `array`,
      of: [
        { type: `anchorPoint` },
        { type: `banner` },
        { type: `buttonBar` },
        { type: `colourGrid` },
        { type: `featuredProducts` },
        { type: `fontInspector` },
        { type: `fontList` },
        { type: `imageBanner` },
        { type: `media` },
        { type: `twoColsText` }
      ]
    },
    {
      name: `seo`,
      title: `SEO`,
      type: `seo.singleton`
    }
  ]
};
