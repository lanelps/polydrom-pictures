import S from '@sanity/desk-tool/structure-builder';
import { DocumentIcon } from '@sanity/icons';

// prettier-ignore
export const pages = S.listItem()
  .title('Pages')
  .icon(DocumentIcon)
  .schemaType('page')
  .child(
    S.documentTypeList('page')
      .defaultOrdering([{ field: 'title', direction: 'asc'}])
  )
