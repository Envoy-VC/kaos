import { useQuery as useConvexQuery } from 'convex/react';
import { useAccount } from 'wagmi';
import { api } from '~/convex/_generated/api';
import type { Id } from '~/convex/_generated/dataModel';
import { ChatBox } from './chat-box';
import { ChatContainer } from './chat-container';

interface KaosChatProps {
  realityId: string;
}

export const KaosChat = ({ realityId }: KaosChatProps) => {
  const { address } = useAccount();
  const messages = useConvexQuery(api.functions.conversations.getMessages, {
    realityId: realityId as Id<'realities'>,
    address: address ?? '',
  });
  return (
    <div className='flex h-[75dvh] basis-1/3 flex-col justify-between gap-3 rounded-2xl border-2 border-black bg-[#F6F8FA] p-4'>
      <ChatContainer messages={messages ?? []} />
      <ChatBox realityId={realityId} />
    </div>
  );
};
