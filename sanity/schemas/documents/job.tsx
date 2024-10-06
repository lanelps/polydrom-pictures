import {defineField, defineType} from 'sanity'
import React from 'react'

export default defineType({
  name: `job`,
  title: `Jobs`,
  type: `document`,
  fields: [
    defineField({
      name: `title`,
      title: `Title`,
      type: `string`,
    }),
    defineField({
      name: `timeline`,
      title: `Timeline`,
      type: `string`,
    }),
    defineField({
      name: `location`,
      title: `Location`,
      type: `string`,
    }),
    defineField({
      name: `pay`,
      title: `Pay`,
      type: `string`,
    }),
    defineField({
      name: `description`,
      title: `Description`,
      type: `text`,
    }),
    defineField({
      name: `jobFile`,
      title: `PDF/ Full description`,
      type: `file`,
    }),
  ],
  preview: {
    select: {
      title: `title`,
      timeline: `timeline`,
      location: `location`,
      pay: `pay`,
    },
    prepare: ({title, timeline, location, pay}) => ({
      title,
      subtitle: `${timeline}; ${location}; ${pay}`,
      media: <span style={{fontSize: `30px`}}>📄</span>,
    }),
  },
})
