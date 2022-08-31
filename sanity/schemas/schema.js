// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

// Documents
import job from "./documents/job";

// Singletons
import settings from "./singletons/settings";
import globals from "./singletons/globals";
import about from "./singletons/about";
import contact from "./singletons/contact";

// Objects
import altImage from "./objects/altImage";
import blockContent from "./objects/blockContent";
import dvd from "./objects/dvd";
import link from "./objects/link";
import linkGroup from "./objects/linkGroup";
import seo from "./objects/seo";
import socialLink from "./objects/socialLink";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: `default`,
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    settings,
    globals,
    about,
    contact,

    //
    job,

    //
    altImage,
    blockContent,
    dvd,
    link,
    linkGroup,
    seo,
    socialLink
  ])
});
