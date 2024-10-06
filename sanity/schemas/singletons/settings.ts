import {defineField, defineType} from 'sanity'

export default defineType({
  name: `settings`,
  title: `Settings`,
  type: `document`,
  fields: [
    defineField({
      name: `seo`,
      title: `SEO`,
      type: `seo`,
    }),
  ],
  preview: {
    prepare() {
      return {
        title: `Settings`,
      }
    },
  },
})
