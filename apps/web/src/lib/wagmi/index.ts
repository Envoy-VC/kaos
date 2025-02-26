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
  address: '0x32f8d7d1db7F8D68015F23fE1E906FC34345b450',
  abi: KAOS_ABI,
} as const;

export const kaosTokenConfig = {
  // biome-ignore lint/nursery/noSecrets: ca
  address: '0x980ed65e368438cDc8771E22676487B54497EC1A',
  abi: KAOS_TOKEN_ABI,
} as const;
