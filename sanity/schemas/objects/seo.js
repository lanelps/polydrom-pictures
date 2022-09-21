export default {
  name: `seo`,
  title: `SEO`,
  type: `object`,
  options: {
    collapsed: false,
    collapsible: true
  },
  fields: [
    {
      name: `title`,
      title: `Title`,
      type: `string`,
      validation: (Rule) =>
        Rule.max(50).warning(`Longer titles may be truncated by search engines`)
    },
    {
      name: `domain`,
      title: `Website Domain`,
      type: `url`
    },
    {
      name: `description`,
      title: `Description`,
      type: `text`,
      rows: 2,
      validation: (Rule) =>
        Rule.max(150).warning(
          `Longer descriptions may be truncated by search engines`
        )
    },
    {
      name: `keywords`,
      title: `Keywords`,
      type: `array`,
      of: [{ type: `string` }],
      options: { layout: `tags` }
    },
    {
      name: `image`,
      title: `Share Image`,
      type: `image`,
      description: `Used for both search engine results and social cards. 16:9 aspect ratio. No larger than 1MB.`
    },
    {
      name: `favicon`,
      title: `Favicon`,
      type: `image`
    }
  ]
};
