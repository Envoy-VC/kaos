'use client';

import { baseSepolia } from '@reown/appkit/networks';
import { createAppKit } from '@reown/appkit/react';
import type { ReactNode } from 'react';
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
  networks: [baseSepolia],
  defaultNetwork: baseSepolia,
  themeMode: 'light',
  themeVariables: {
    '--w3m-font-family': 'Comic',
    '--w3m-accent': '#50C4BA',
  },
  metadata: metadata,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
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
