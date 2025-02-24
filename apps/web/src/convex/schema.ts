import { defineSchema } from 'convex/server';
import { coreTables } from './tables';

const schema = defineSchema({
  ...coreTables,
});

// biome-ignore lint/style/noDefaultExport: needed for convex
export default schema;
