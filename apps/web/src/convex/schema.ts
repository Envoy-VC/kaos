import { defineSchema } from 'convex/server';
import { conversationTables, coreTables, realitiesTables } from './tables';
import { transactionTables } from './tables/transactions';

const schema = defineSchema({
  ...coreTables,
  ...realitiesTables,
  ...conversationTables,
  ...transactionTables,
});

// biome-ignore lint/style/noDefaultExport: needed for convex
export default schema;
