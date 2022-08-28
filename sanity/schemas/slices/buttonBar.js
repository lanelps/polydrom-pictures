export default {
  name: `buttonBar`,
  title: `Button Bar`,
  type: `object`,
  fields: [
    {
      name: `previousText`,
      title: `Previous Text`,
      type: `string`,
    },
    {
      name: `previousTitle`,
      title: `Previous Title`,
      type: `string`,
    },
    {
      name: `previousTarget`,
      title: `Previous Target`,
      type: `string`,
    },
    {
      name: `forwardsText`,
      title: `Fowards Text`,
      type: `string`,
    },
    {
      name: `forwardsTitle`,
      title: `Forwards Title`,
      type: `string`,
    },
    {
      name: `forwardsTarget`,
      title: `Forwards Target`,
      type: `string`,
    },
  ],
  preview: {
    prepare() {
      return {
        title: `Button Bar`,
      };
    },
  },
};
