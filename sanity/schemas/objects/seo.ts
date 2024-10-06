import {defineField, defineType} from 'sanity'

export default defineType({
  name: `seo`,
  title: `SEO`,
  type: `object`,
  options: {
    collapsed: false,
    collapsible: true,
  },
  fields: [
    defineField({
      name: `title`,
      title: `Title`,
      type: `string`,
      validation: (Rule) =>
        Rule.max(50).warning(`Longer titles may be truncated by search engines`),
    }),
    defineField({
      name: `domain`,
      title: `Website Domain`,
      type: `url`,
    }),
    defineField({
      name: `description`,
      title: `Description`,
      type: `text`,
      rows: 2,
      validation: (Rule) =>
        Rule.max(150).warning(`Longer descriptions may be truncated by search engines`),
    }),
    defineField({
      name: `keywords`,
      title: `Keywords`,
      type: `array`,
      of: [{type: `string`}],
      options: {layout: `tags`},
    }),
    defineField({
      name: `image`,
      title: `Share Image`,
      type: `image`,
      description: `Used for both search engine results and social cards. 16:9 aspect ratio. No larger than 1MB.`,
    }),
    defineField({
      name: `favicon`,
      title: `Favicon`,
      type: `image`,
    }),
  ],
})
