import S from "@sanity/desk-tool/structure-builder";
import { pages } from "./desk/pages";
import { settings } from "./desk/settings";

const DOCUMENT_TYPES_IN_STRUCTURE = [
  `article.editorial`,
  `article.info`,
  `collection`,
  `home`,
  `media.tag`,
  `page`,
  `product`,
  `productVariant`,
  `settings`
];

export default () =>
  // prettier-ignore

  S.list()
    .title(`Content`)
    .items([
      pages,
      S.divider(),
      settings,
      S.divider(),
      ...S.documentTypeListItems().filter(listItem => !DOCUMENT_TYPES_IN_STRUCTURE.includes(listItem.getId()))
    ]
    );
