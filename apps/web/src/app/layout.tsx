import type { Metadata } from 'next';

import { TRPCReactProvider } from '~/trpc/react';

import '@kaos/ui/globals.css';

import { Toaster } from '@kaos/ui/components/sonner';
import { headers } from 'next/headers';
import type { ReactNode } from 'react';
import { Navbar } from '~/components';
import { ConvexClientProvider, Web3Provider } from '~/providers';

export const metadata: Metadata = {
  title: 'Kaos: Multiverse Debates & AI Chaos',
  description:
    'Turn hot takes into parallel realities! Debate pineapple pizza, superheroes & AI chaos. Earn $KAOS, roast rivals, fork universes. Warning: Side effects may include existential laughter.',
  keywords: [
    'Kaos',
    'Multiverse',
    'Debates',
    'AI Chaos',
    'Monad',
    'fork',
    'parallel realities',
    'hot takes',
    'pineapple pizza',
    'superheroes',
    'earn $KAOS',
    'roast rivals',
    'fork universes',
    'existential laughter',
  ],
  applicationName: 'Kaos',
  authors: [{ name: 'Vedant Chainani', url: 'https://envoy1084.xyz' }],
  referrer: 'origin',
  creator: 'Kaos Team',
  openGraph: {
    title: 'Kaos: Multiverse Debates & AI Chaos',
    description:
      'Turn hot takes into parallel realities! Debate pineapple pizza, superheroes & AI chaos. Earn $KAOS, roast rivals, fork universes. Warning: Side effects may include existential laughter.',
    siteName: 'Kaos',
    locale: 'en_US',
    type: 'website',
    url: 'https://kaos-app.vercel.app',
    images: [
      {
        url: 'https://kaos-app.vercel.app/og.png',
        alt: 'Kaos Cover',
        type: 'image/png',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@Envoy_1084',
    title: 'Kaos: Multiverse Debates & AI Chaos',
    description:
      'Turn hot takes into parallel realities! Debate pineapple pizza, superheroes & AI chaos. Earn $KAOS, roast rivals, fork universes. Warning: Side effects may include existential laughter.',
    images: [
      {
        url: 'https://kaos-app.vercel.app/og.png',
        alt: 'Kaos Cover',
        type: 'image/png',
        width: 1200,
        height: 630,
      },
    ],
  },
};
const RootLayout = async ({ children }: Readonly<{ children: ReactNode }>) => {
  const headersObj = await headers();
  const cookies = headersObj.get('cookie');
  return (
    <html lang='en'>
      <body>
        <TRPCReactProvider>
          <Web3Provider cookies={cookies}>
            <ConvexClientProvider>
              <Navbar />
              {children}
              <Toaster />
            </ConvexClientProvider>
          </Web3Provider>
        </TRPCReactProvider>
      </body>
    </html>
  );
};

export default RootLayout;
