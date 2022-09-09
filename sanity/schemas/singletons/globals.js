export default {
  name: `globals`,
  title: `Globals`,
  type: `document`,
  fields: [
    // Nav Links
    {
      name: `navLinks`,
      title: `Nav Links`,
      type: `array`,
      of: [{ type: `linkGroup` }]
    },
    // Landing Media
    {
      name: `landingMedia`,
      title: `Landing Media`,
      type: `media`,
      initialValue: {
        type: `image`
      }
    },
    //  DVD Icon
    {
      name: `dvd`,
      title: `DVD Icon`,
      type: `dvd`
    }
  ],
  preview: {
    prepare() {
      return {
        title: `Globals`
      };
    }
  }
};
