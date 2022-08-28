import { CogIcon, FolderIcon } from '@sanity/icons';

const TITLE = 'Settings';

export default {
  name: 'settings',
  title: TITLE,
  type: 'document',
  icon: CogIcon,
  fields: [
    {
      name: 'menu',
      title: 'Menu',
      type: 'menu',
    },
    {
      name: 'footer',
      title: 'Footer',
      type: 'footer',
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo.standard',
    },
  ],
  preview: {
    prepare() {
      return {
        title: TITLE,
      };
    },
  },
};
