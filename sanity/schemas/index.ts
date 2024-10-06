// Documents
import job from './documents/job'

const documents = [job]

// Singletons
import settings from './singletons/settings'
import globals from './singletons/globals'
import about from './singletons/about'
import contact from './singletons/contact'

const singletons = [settings, globals, about, contact]

// Objects
import altImage from './objects/altImage'
import blockContent from './objects/blockContent'
import dvd from './objects/dvd'
import footer from './objects/footer'
import link from './objects/link'
import linkGroup from './objects/linkGroup'
import media from './objects/media'
import seo from './objects/seo'
import socialLink from './objects/socialLink'
import video from './objects/video'

const objects = [
  altImage,
  blockContent,
  dvd,
  footer,
  link,
  linkGroup,
  media,
  seo,
  socialLink,
  video,
]

export const schemaTypes = [...documents, ...singletons, ...objects]
