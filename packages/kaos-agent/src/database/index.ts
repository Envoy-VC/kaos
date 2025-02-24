import { PostgresDatabaseAdapter } from '@elizaos/adapter-postgres';

export function initializeDatabase() {
  const db = new PostgresDatabaseAdapter({
    connectionString: process.env.POSTGRES_URL,
  });
  return db;
}
