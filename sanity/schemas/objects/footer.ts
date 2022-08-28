export default {
  name: 'footer',
  title: 'Footer',
  type: 'object',
  options: {
    collapsed: false,
    collapsible: true,
  },
  fields: [
    // Links
    {
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [{ type: 'linkInternal' }, { type: 'linkExternal' }],
    },
    // Text
    {
      name: 'text',
      title: 'Text',
      type: 'array',
      of: [
        {
          lists: [],
          marks: {
            annotations: [
              // Email
              {
                title: 'Email',
                name: 'annotationLinkEmail',
                type: 'annotationLinkEmail',
              },
              // Internal link
              {
                title: 'Internal page',
                name: 'annotationLinkInternal',
                type: 'annotationLinkInternal',
              },
              // URL
              {
                title: 'URL',
                name: 'annotationLinkExternal',
                type: 'annotationLinkExternal',
              },
            ],
            decorators: [],
          },
          // Block styles
          styles: [{ title: 'Normal', value: 'normal' }],
          type: 'block',
        },
      ],
    },
  ],
};
