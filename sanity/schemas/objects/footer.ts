import {defineField, defineType} from 'sanity'

export default defineType({
  name: `footer`,
  title: `Footer`,
  type: `object`,
  fields: [
    defineField({
      name: `title`,
      title: `Title`,
      type: `string`,
    }),
  ],
})
