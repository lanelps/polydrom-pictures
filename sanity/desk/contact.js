import React from "react";
import S from "@sanity/desk-tool/structure-builder";

export default S.listItem()
  .title(`Contact`)
  .schemaType(`contact`)
  .icon(() => <span style={{ fontSize: `30px` }}>📞</span>)
  .child(
    S.editor().title(`Contact`).schemaType(`contact`).documentId(`contact`)
  );
