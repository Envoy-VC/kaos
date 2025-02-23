// biome-ignore lint/correctness/noNodejsModules: <explanation>
import path from 'node:path';
import { PostgresDatabaseAdapter } from '@elizaos/adapter-postgres';
import { SqliteDatabaseAdapter } from '@elizaos/adapter-sqlite';
import Database from 'better-sqlite3';

export function initializeDatabase(dataDir: string) {
  if (process.env.POSTGRES_URL) {
    const db = new PostgresDatabaseAdapter({
      connectionString: process.env.POSTGRES_URL,
    });
    return db;
  }
  const filePath =
    process.env.SQLITE_FILE ?? path.resolve(dataDir, 'db.sqlite');
  const db = new SqliteDatabaseAdapter(new Database(filePath));
  return db;
}
