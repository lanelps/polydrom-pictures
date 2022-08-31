import React from "react";
import S from "@sanity/desk-tool/structure-builder";

export default S.listItem()
  .title(`Globals`)
  .schemaType(`globals`)
  .icon(() => <span style={{ fontSize: `30px` }}>🌍</span>)
  .child(
    S.editor().title(`Globals`).schemaType(`globals`).documentId(`globals`)
  );
