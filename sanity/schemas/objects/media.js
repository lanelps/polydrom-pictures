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
      title: `Cloudinary Video`,
      type: `cloudinary.asset`,
      description: `Accepted video formats are mp4, mov, wmv, avi, avchd, mkv, webm and hevc.`,
      hidden: ({ parent }) => parent?.type !== `video`,
      validation: (Rule) =>
        Rule.custom((asset) => {
          if (typeof asset === `undefined`) {
            return `Cloudinary Video cannot be undefined`;
          }

          if (
            asset?.format?.match(
              /\b(?:mp4|mov|wmv|avi|avchd|mkv|webm|hevc)\b/gi
            )?.[0]
          ) {
            return true;
          }

          return `Please use a valid video format`;
        })
    }
  ]
};
