const DOCUMENT_TYPES_IN_STRUCTURE = [
  `job`,
  `settings`,
  `globals`,
  `about`,
  `contact`,
  `media.tag`,
  `video`,
] as string[]

export default (S) =>
  S.list()
    .title(`Content`)
    .items([
      S.listItem()
        .title(`Globals`)
        .schemaType(`globals`)
        .icon(() => '🌍')
        .child(S.editor().title(`Globals`).schemaType(`globals`).documentId(`globals`)),
      S.listItem()
        .title(`About`)
        .schemaType(`about`)
        .icon(() => '📖')
        .child(S.editor().title(`About`).schemaType(`about`).documentId(`about`)),
      S.listItem()
        .title(`Jobs`)
        .schemaType(`job`)
        .icon(() => '💼')
        .child(S.documentTypeList(`job`).defaultOrdering([{field: `title`, direction: `asc`}])),
      S.listItem()
        .title(`Contact`)
        .schemaType(`contact`)
        .icon(() => '📞')
        .child(S.editor().title(`Contact`).schemaType(`contact`).documentId(`contact`)),
      S.divider(),
      S.listItem()
        .title(`Settings`)
        .schemaType(`settings`)
        .icon(() => '⚙️')
        .child(S.editor().title(`Settings`).schemaType(`settings`).documentId(`settings`)),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => !DOCUMENT_TYPES_IN_STRUCTURE.includes(listItem.getId()),
      ),
    ])
