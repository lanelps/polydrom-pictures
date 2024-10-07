import {defineField, defineType} from 'sanity'

export default defineType({
  name: `altImage`,
  title: `Image`,
  type: `image`,
  fields: [
    defineField({
      name: `altText`,
      title: `Alternative Text`,
      type: `string`,
      description: `Used for SEO and Accesability purposes. Written copy appears in place of an image on a webpage if the image fails to load.`,
    }),
    defineField({
      name: 'mobileImage',
      title: 'Mobile Image',
      type: 'image',
      description: 'Image to show only on mobile devices',
      options: {
        collapsed: true,
        collapsible: true,
      },
    }),
  ],
})
