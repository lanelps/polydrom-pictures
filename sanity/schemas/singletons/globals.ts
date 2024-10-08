import {defineField, defineType} from 'sanity'

export default defineType({
  name: `globals`,
  title: `Globals`,
  type: `document`,
  fields: [
    // Landing Media
    defineField({
      name: `landingMedia`,
      title: `Landing Media`,
      type: `media`,
      initialValue: {
        type: `image`,
      },
    }),
    //  DVD Icon
    defineField({
      name: `dvd`,
      title: `DVD Icon`,
      type: `dvd`,
    }),
    // Nav Links
    defineField({
      name: `navLinks`,
      title: `Nav Links`,
      type: `array`,
      of: [{type: `linkGroup`}],
      hidden: true,
    }),
  ],
  preview: {
    prepare() {
      return {
        title: `Globals`,
      }
    },
  },
})
