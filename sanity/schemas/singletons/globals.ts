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
    }),
    // Footer
    defineField({
      name: `footer`,
      title: `Footer`,
      type: `footer`,
    }),
    defineField({
      name: `font`,
      title: `Font`,
      type: `file`,
      description: `Global font for the website. Ideally upload a woff2 or woff file. Defaults to Helvetica Neue.`,
      options: {
        accept: `font/woff, font/woff2`,
      },
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
