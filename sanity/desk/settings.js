import React from "react";
import S from "@sanity/desk-tool/structure-builder";

export default S.listItem()
  .title(`Settings`)
  .schemaType(`settings`)
  .icon(() => <span style={{ fontSize: `30px` }}>⚙️</span>)
  .child(
    S.editor().title(`Settings`).schemaType(`settings`).documentId(`settings`)
  );
