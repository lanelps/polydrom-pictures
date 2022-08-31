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
    // Landing Image
    {
      name: `landingImage`,
      title: `Landing Image`,
      type: `altImage`
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
