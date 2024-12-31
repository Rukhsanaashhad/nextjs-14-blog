import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'nextjs-blog',

  projectId: 'qp2r5s9x',
  dataset: 'blog',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
