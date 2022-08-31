import React from "react";
import S from "@sanity/desk-tool/structure-builder";

export default S.listItem()
  .title(`About`)
  .schemaType(`about`)
  .icon(() => <span style={{ fontSize: `30px` }}>📖</span>)
  .child(S.editor().title(`About`).schemaType(`about`).documentId(`about`));
