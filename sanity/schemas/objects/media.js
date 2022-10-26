export default {
  name: `media`,
  title: `Media`,
  type: `object`,
  fields: [
    {
      name: `type`,
      title: `Media Type`,
      type: `string`,
      options: {
        list: [
          { title: `Image`, value: `image` },
          { title: `Video`, value: `video` }
        ],
        layout: `dropdown`
      },
      validation: (Rule) => Rule.required()
    },
    {
      name: `image`,
      title: `Image`,
      type: `altImage`,
      hidden: ({ parent }) => parent?.type !== `image`
    },
    {
      name: `video`,
      title: `Video`,
      type: `video`,
      hidden: ({ parent }) => parent?.type !== `video`
    }
  ]
};
