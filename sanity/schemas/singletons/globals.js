export default {
  name: `globals`,
  title: `Globals`,
  type: `document`,
  fields: [
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
    },
    // Nav Links
    {
      name: `navLinks`,
      title: `Nav Links`,
      type: `array`,
      of: [{ type: `linkGroup` }]
    },
    // Footer
    {
      name: `footer`,
      title: `Footer`,
      type: `footer`
    },
    {
      name: `font`,
      title: `Font`,
      type: `file`,
      accept: `font/woff, font/woff2`,
      description: `Global font for the website. Ideally upload a woff2 or woff file. Defaults to Helvetica Neue.`
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
