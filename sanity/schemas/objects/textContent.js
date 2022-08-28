export default {
  name: `textContent`,
  title: `Text Content`,
  type: `object`,
  fields: [
    {
      name: `contentStyle`,
      title: `Content Style`,
      type: `string`,
      options: {
        list: [`h1`, `h3`],
      },
    },
    {
      name: `content`,
      title: `Content`,
      type: `text`,
    },
  ],
  preview: {
    select: {
      title: 'content',
    },
  },
};
