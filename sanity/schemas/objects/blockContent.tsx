import {defineArrayMember, defineType} from 'sanity'
import React from 'react'

export default defineType({
  title: `Block Content`,
  name: `blockContent`,
  type: `array`,
  description: `Use Strong for sans-serif text.`,
  of: [
    defineArrayMember({
      title: `Block`,
      type: `block`,
      // Styles let you set what your user can mark up blocks with. These
      // correspond with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [{title: `Normal`, value: `normal`}],
      lists: [],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [{title: `Strong`, value: `strong`}],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            title: `URL`,
            name: `link`,
            type: `object`,
            fields: [
              {
                title: `URL`,
                name: `href`,
                type: `url`,
              },
            ],
          },
        ],
      },
    }),
  ],
})
