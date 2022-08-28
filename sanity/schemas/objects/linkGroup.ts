import { CogIcon, FolderIcon } from '@sanity/icons';

export default {
  title: 'Group',
  name: 'linkGroup',
  type: 'object',
  icon: FolderIcon,
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Links',
      name: 'links',
      type: 'array',
      of: [{ type: 'linkInternal' }, { type: 'linkExternal' }],
    },
  ],
};
