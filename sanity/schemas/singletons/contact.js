export default {
  name: `contact`,
  title: `Contact`,
  type: `document`,
  fields: [
    {
      name: `email`,
      title: `Email`,
      type: `string`
    },
    {
      name: `socialLinks`,
      title: `Social Links`,
      type: `array`,
      of: [{ type: `socialLink` }]
    },
    {
      name: `mailchimpID`,
      title: `Mailchimp List ID`,
      type: `string`
    }
  ],
  preview: {
    prepare() {
      return {
        title: `Contact`
      };
    }
  }
};
