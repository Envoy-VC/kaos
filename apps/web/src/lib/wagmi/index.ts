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
  address: '0x6d2a67d21997EBa0905655F6d605c68aDeD66696',
  abi: KAOS_ABI,
} as const;

export const kaosTokenConfig = {
  // biome-ignore lint/nursery/noSecrets: ca
  address: '0x98661c737dDcfFf5E7F5606439b5F46bA2Cf1e64',
  abi: KAOS_TOKEN_ABI,
} as const;
