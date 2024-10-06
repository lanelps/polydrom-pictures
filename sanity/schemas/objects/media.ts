import {defineField, defineType} from 'sanity'

export default defineType({
  name: `media`,
  title: `Media`,
  type: `object`,
  fields: [
    defineField({
      name: `type`,
      title: `Media Type`,
      type: `string`,
      options: {
        list: [
          {title: `Image`, value: `image`},
          {title: `Video`, value: `video`},
        ],
        layout: `dropdown`,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: `image`,
      title: `Image`,
      type: `altImage`,
      hidden: ({parent}) => parent?.type !== `image`,
    }),
    defineField({
      name: `video`,
      title: `Video`,
      type: `video`,
      hidden: ({parent}) => parent?.type !== `video`,
    }),
  ],
})
