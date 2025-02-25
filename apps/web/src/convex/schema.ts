import { defineSchema } from 'convex/server';
import { conversationTables, coreTables, realitiesTables } from './tables';

const schema = defineSchema({
  ...coreTables,
  ...realitiesTables,
  ...conversationTables,
});

// biome-ignore lint/style/noDefaultExport: needed for convex
export default schema;
