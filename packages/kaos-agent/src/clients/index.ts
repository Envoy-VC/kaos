import { DirectClientInterface } from '@elizaos/client-direct';
import type { Character, Client, IAgentRuntime } from '@elizaos/core';

export async function initializeClient(
  character: Character,
  runtime: IAgentRuntime
) {
  const clients: Client[] = [];
  const client = (await DirectClientInterface.start(runtime)) as Client;
  clients.push(client);

  for (const plugin of character.plugins) {
    if (plugin.clients) {
      for (const client of plugin.clients) {
        const pluginClient = (await client.start(runtime)) as Client;
        clients.push(pluginClient);
      }
    }
  }

  return clients;
}
