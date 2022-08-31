export default {
  name: `about`,
  title: `About`,
  type: `document`,
  fields: [
    {
      name: `body`,
      title: `Body`,
      type: `blockContent`
    }
  ],
  preview: {
    prepare() {
      return {
        title: `About`
      };
    }
  }
};
