import {defineField, defineType} from 'sanity'
import React from 'react'

export default defineType({
  name: `link`,
  title: `Link`,
  type: `object`,
  fields: [
    defineField({
      name: `name`,
      title: `Name`,
      type: `string`,
    }),
    defineField({
      name: `url`,
      title: `Url`,
      type: `url`,
    }),
  ],
  preview: {
    select: {
      name: `name`,
      url: `url`,
    },
    prepare: ({name, url}) => ({
      title: name,
      subtitle: url,
      media: <span style={{fontSize: `30px`}}>🔗</span>,
    }),
  },
})
