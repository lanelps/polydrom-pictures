import {defineField, defineType} from 'sanity'

export default defineType({
  name: `dvd`,
  title: `Dvd`,
  type: `object`,
  fields: [
    defineField({
      name: `image`,
      title: `Image`,
      type: `altImage`,
    }),
    defineField({
      name: `linkText`,
      title: `Link Text`,
      type: `string`,
    }),
    defineField({
      name: `linkUrl`,
      title: `Link URL`,
      type: `string`,
    }),
  ],
})
