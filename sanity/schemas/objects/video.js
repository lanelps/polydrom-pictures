const videoValidation = (asset, options) => {
  if (options?.required && typeof asset === `undefined`) {
    return `Cloudinary Video cannot be undefined`;
  }

  if (
    typeof asset !== `undefined` &&
    !asset?.format?.match(/\b(?:mp4|mov|wmv|avi|avchd|mkv|webm|hevc)\b/gi)?.[0]
  ) {
    return `Please use a valid video format`;
  }

  return true;
};

export default {
  name: `video`,
  title: `Video`,
  type: `document`,
  fieldsets: [
    {
      name: `safari`,
      title: `Safari`,
      options: {
        collapsible: true,
        collapsed: true
      }
    }
  ],
  fields: [
    {
      name: `source`,
      title: `Source`,
      type: `cloudinary.asset`,
      description: `Accepted video formats are mp4, mov, wmv, avi, avchd, mkv, webm and hevc.`,
      validation: (Rule) =>
        Rule.custom((asset) => videoValidation(asset, { required: true }))
    },
    {
      name: `safariSource`,
      title: `Source`,
      type: `cloudinary.asset`,
      description: `Fallback option for Safari browsers (Optional).`,
      fieldset: `safari`,
      validation: (Rule) =>
        Rule.custom((asset) => videoValidation(asset, { required: false }))
    }
  ]
};
