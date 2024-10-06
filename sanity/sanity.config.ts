import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {cloudinarySchemaPlugin} from 'sanity-plugin-cloudinary'

import {schemaTypes} from './schemas'
import deskStructure from './deskStructure'

export default defineConfig({
  name: 'polydrom-pictures',
  title: 'Polydrom Pictures',
  projectId: 'bwj0xhgb',
  dataset: 'production',
  plugins: [structureTool({structure: deskStructure}), cloudinarySchemaPlugin()],
  schema: {
    types: schemaTypes,
  },
})
