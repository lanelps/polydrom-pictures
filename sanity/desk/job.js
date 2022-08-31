import React from "react";
import S from "@sanity/desk-tool/structure-builder";

export default S.listItem()
  .title(`Jobs`)
  .schemaType(`job`)
  .icon(() => <span style={{ fontSize: `30px` }}>💼</span>)
  .child(
    S.documentTypeList(`job`).defaultOrdering([
      { field: `title`, direction: `asc` }
    ])
  );
