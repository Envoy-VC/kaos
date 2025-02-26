'use client';

import { ConvexClient } from 'convex/browser';
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import type { ReactNode } from 'react';
import { env } from '~/env';

export const convexClient = new ConvexClient(env.NEXT_PUBLIC_CONVEX_URL);
const convex = new ConvexReactClient(env.NEXT_PUBLIC_CONVEX_URL);

export const ConvexClientProvider = ({ children }: { children: ReactNode }) => {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
};
