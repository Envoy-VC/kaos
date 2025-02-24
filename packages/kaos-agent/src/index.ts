import fs from 'node:fs';
import net from 'node:net';
import path from 'node:path';

import { fileURLToPath } from 'node:url';
import { DirectClient } from '@elizaos/client-direct';
import {
  AgentRuntime,
  type Character,
  type ICacheManager,
  type IDatabaseAdapter,
  elizaLogger,
  stringToUuid,
} from '@elizaos/core';
import { bootstrapPlugin } from '@elizaos/plugin-bootstrap';
import { createNodePlugin } from '@elizaos/plugin-node';
import { initializeDbCache } from './cache/index.ts';
import { character } from './character.ts';
import { initializeClient } from './clients/index.ts';
import { initializeDatabase } from './database/index.ts';

const nodePlugin = createNodePlugin();
const fileName = fileURLToPath(import.meta.url);
const dirname = path.dirname(fileName);

const checkPortAvailable = (port: number): Promise<boolean> => {
  return new Promise((resolve) => {
    const server = net.createServer();

    server.once('error', (err: NodeJS.ErrnoException) => {
      if (err.code === 'EADDRINUSE') {
        resolve(false);
      }
    });

    server.once('listening', () => {
      server.close();
      resolve(true);
    });

    server.listen(port);
  });
};

export function createAgent(
  character: Character,
  db: IDatabaseAdapter,
  cache: ICacheManager,
  token: string
) {
  elizaLogger.success(
    elizaLogger.successesTitle,
    'Creating runtime for character',
    character.name
  );

  return new AgentRuntime({
    databaseAdapter: db,
    token,
    modelProvider: character.modelProvider,
    evaluators: [],
    character,
    plugins: [bootstrapPlugin, nodePlugin],
    providers: [],
    actions: [],
    services: [],
    managers: [],
    cacheManager: cache,
  });
}

async function startAgent(character: Character, directClient: DirectClient) {
  try {
    character.id ??= stringToUuid(character.name);
    const dataDir = path.join(dirname, '../data');

    if (fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const db = initializeDatabase();
    await db.init();

    const cache = initializeDbCache(character, db);
    const runtime = createAgent(
      character,
      db,
      cache,
      process.env.MISTRAL_API_KEY
    );
    await runtime.initialize();
    runtime.clients = await initializeClient(character, runtime);

    directClient.registerAgent(runtime);

    elizaLogger.debug(`Started ${character.name} as ${runtime.agentId}`);

    return runtime;
  } catch (error) {
    elizaLogger.error(
      `Error starting agent for character ${character.name}:`,
      error
    );
    throw error;
  }
}

const startAgents = async () => {
  const directClient = new DirectClient();
  let serverPort = Number.parseInt(process.env.SERVER_PORT);

  const characters = [character];

  for (const character of characters) {
    await startAgent(character, directClient as DirectClient);
  }
  while (!(await checkPortAvailable(serverPort))) {
    elizaLogger.warn(`Port ${serverPort} is in use, trying ${serverPort + 1}`);
    serverPort++;
  }
  directClient.startAgent = async (character: Character) => {
    return await Promise.resolve(startAgent(character, directClient));
  };
  directClient.start(serverPort);
  elizaLogger.info(`Server Started on Port ${serverPort}`);
};

startAgents().catch((error) => {
  elizaLogger.error('Unhandled error in startAgents:', error);
  process.exit(1);
});
