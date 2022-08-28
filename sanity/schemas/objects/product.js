export default {
  name: `product`,
  title: `Product`,
  type: `object`,
  fields: [
    {
      name: `title`,
      title: `Title`,
      type: `string`,
    },
    {
      name: `subtitle`,
      title: `Subtitle`,
      type: `string`,
    },
    {
      name: `price`,
      title: `Price`,
      type: `string`,
    },
    {
      name: `target`,
      title: `Target`,
      type: `string`,
    },
    {
      name: `image`,
      title: `Image`,
      type: `altImage`,
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
};
