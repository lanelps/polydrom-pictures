import S from "@sanity/desk-tool/structure-builder";

import job from "./desk/job";

import settings from "./desk/settings";
import globals from "./desk/globals";
import about from "./desk/about";
import contact from "./desk/contact";

const DOCUMENT_TYPES_IN_STRUCTURE = [
  `job`,
  `settings`,
  `globals`,
  `about`,
  `contact`
];

export default () =>
  // prettier-ignore

  S.list()
    .title(`Content`)
    .items([
      globals,
      about,
      job,
      contact,
      S.divider(),
      settings,
      S.divider(),
      ...S.documentTypeListItems().filter(listItem => !DOCUMENT_TYPES_IN_STRUCTURE.includes(listItem.getId()))
    ]
    );
