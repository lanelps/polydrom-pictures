import {defineField, defineType} from 'sanity'

export default defineType({
  name: `contact`,
  title: `Contact`,
  type: `document`,
  fields: [
    defineField({
      name: `email`,
      title: `Email`,
      type: `string`,
    }),
    defineField({
      name: `socialLinks`,
      title: `Social Links`,
      type: `array`,
      of: [{type: `socialLink`}],
      hidden: true,
    }),
    defineField({
      name: `mailchimpID`,
      title: `Mailchimp List ID`,
      type: `string`,
    }),
  ],
  preview: {
    prepare() {
      return {
        title: `Contact`,
      }
    },
  },
})
