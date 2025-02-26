import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { cookieStorage, createStorage } from '@wagmi/core';
import { monadTestnet } from 'viem/chains';
import { KAOS_ABI, KAOS_TOKEN_ABI } from '~/data/abi';
import { env } from '~/env';

export const projectId = env.NEXT_PUBLIC_REOWN_PROJECT_ID;

export const networks = [monadTestnet];

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks,
});

export const config = wagmiAdapter.wagmiConfig;

export const kaosConfig = {
  // biome-ignore lint/nursery/noSecrets: ca
  address: '0x8dBE8Fe8600D0A0a4267a3afE8360C5d6d94424A',
  abi: KAOS_ABI,
} as const;

export const kaosTokenConfig = {
  // biome-ignore lint/nursery/noSecrets: ca
  address: '0x262db8107886E96f3277b8189265669710Da27b3',
  abi: KAOS_TOKEN_ABI,
} as const;
