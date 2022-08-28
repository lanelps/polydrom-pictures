// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator';

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type';

// Rich text annotations used in the block content editor
import annotationLinkEmail from './annotations/linkEmail';
import annotationLinkExternal from './annotations/linkExternal';
import annotationLinkInternal from './annotations/linkInternal';

// Documents
import colour from './documents/colour';
import page from './documents/page';

// Singletons
import settings from './singletons/settings';

// Objects
import altImage from './objects/altImage';
import blockContent from './objects/blockContent';
import colourGridItem from './objects/colourGridItem';
import download from './objects/download';
import downloadLink from './objects/downloadLink';
import fontStyle from './objects/fontStyle';
import fontVariant from './objects/fontVariant';
import footer from './objects/footer';
import linkExternal from './objects/linkExternal';
import linkGroup from './objects/linkGroup';
import linkInternal from './objects/linkInternal';
import placeholderString from './objects/placeholderString';
import menu from './objects/menu';
import newsletter from './objects/newsletter';
import product from './objects/product';
import seoSingleton from './objects/seo/singleton';
import seoStandard from './objects/seo/standard';
import textContent from './objects/textContent';

// Slices
import anchorPoint from './slices/anchorPoint';
import banner from './slices/banner';
import buttonBar from './slices/buttonBar';
import colourGrid from './slices/colourGrid';
import featuredProducts from './slices/featuredProducts';
import fontInspector from './slices/fontInspector';
import fontList from './slices/fontList';
import imageBanner from './slices/imageBanner';
import media from './slices/media';
import twoColsText from './slices/twoColsText';

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    //
    annotationLinkEmail,
    annotationLinkExternal,
    annotationLinkInternal,

    //

    colour,
    page,

    //
    settings,

    //

    altImage,
    blockContent,
    colourGridItem,
    download,
    downloadLink,
    fontStyle,
    fontVariant,
    footer,
    linkExternal,
    linkGroup,
    linkInternal,
    placeholderString,
    menu,
    newsletter,
    product,
    seoSingleton,
    seoStandard,
    textContent,

    //

    anchorPoint,
    banner,
    colourGrid,
    featuredProducts,
    fontInspector,
    fontList,
    imageBanner,
    buttonBar,
    media,
    twoColsText,
  ]),
});
