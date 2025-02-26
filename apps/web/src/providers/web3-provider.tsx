'use client';

import { createAppKit } from '@reown/appkit/react';
import type { ReactNode } from 'react';
import { monadTestnet } from 'viem/chains';
import { type Config, WagmiProvider, cookieToInitialState } from 'wagmi';
import { projectId, wagmiAdapter } from '~/lib/wagmi';

const metadata = {
  name: 'appkit-example',
  description: 'AppKit Example',
  url: 'https://appkitexampleapp.com',
  icons: ['https://avatars.githubusercontent.com/u/179229932'],
};

const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [monadTestnet],
  defaultNetwork: monadTestnet,
  themeMode: 'light',
  themeVariables: {
    '--w3m-font-family': 'Comic',
    '--w3m-accent': '#50C4BA',
  },
  metadata: metadata,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  },
  chainImages: {
    10143: 'https://docs.monad.xyz/img/monad_logo.png',
  },
});

export const Web3Provider = ({
  children,
  cookies,
}: { children: ReactNode; cookies: string | null }) => {
  const initialState = cookieToInitialState(
    wagmiAdapter.wagmiConfig as Config,
    cookies
  );

  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig as Config}
      initialState={initialState}
    >
      {children}
    </WagmiProvider>
  );
};
