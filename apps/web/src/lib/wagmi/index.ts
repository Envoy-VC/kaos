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
  address: '0x193c5b4A4E40D0556e9Ce98b6De9c4b51875A038',
  abi: KAOS_ABI,
} as const;

export const kaosTokenConfig = {
  // biome-ignore lint/nursery/noSecrets: ca
  address: '0xBF1c281008161c948563fA687fF2b8b44fA4a05e',
  abi: KAOS_TOKEN_ABI,
} as const;
