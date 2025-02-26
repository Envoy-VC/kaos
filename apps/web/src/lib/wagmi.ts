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
  address: '0x84CAc4c0E79670F97bB01A662Df93F457a53E4CB',
  abi: KAOS_ABI,
} as const;

export const kaosTokenConfig = {
  // biome-ignore lint/nursery/noSecrets: ca
  address: '0xe50A93440c506Da80ffa5BA02705590e3b3fb78b',
  abi: KAOS_TOKEN_ABI,
} as const;
