import {defineField, defineType} from 'sanity'
import React from 'react'

export default defineType({
  name: `linkGroup`,
  title: `Link group`,
  type: `object`,
  fields: [
    defineField({
      name: `title`,
      title: `Title`,
      type: `string`,
    }),
    defineField({
      name: `links`,
      title: `Links`,
      type: `array`,
      of: [{type: `link`}],
    }),
  ],
  preview: {
    select: {
      title: `title`,
    },
    prepare: ({title}) => ({
      title,
      media: <span style={{fontSize: `30px`}}>⛓</span>,
    }),
  },
})
