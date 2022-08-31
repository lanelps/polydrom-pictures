export default {
  name: `settings`,
  title: `Settings`,
  type: `document`,
  fields: [
    {
      name: `seo`,
      title: `SEO`,
      type: `seo`
    }
  ],
  preview: {
    prepare() {
      return {
        title: `Settings`
      };
    }
  }
};
