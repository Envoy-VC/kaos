import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { baseSepolia } from '@reown/appkit/networks';
import { cookieStorage, createStorage } from '@wagmi/core';
import { env } from '~/env';

export const projectId = env.NEXT_PUBLIC_REOWN_PROJECT_ID;

export const networks = [baseSepolia];

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks,
});

export const config = wagmiAdapter.wagmiConfig;
