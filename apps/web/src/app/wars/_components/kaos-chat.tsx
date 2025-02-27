import { useQuery as useConvexQuery } from 'convex/react';
import { useAccount } from 'wagmi';
import { api } from '~/convex/_generated/api';
import type { Id } from '~/convex/_generated/dataModel';
import type { Reality } from '~/types';
import { ChatBox } from './chat-box';
import { ChatContainer } from './chat-container';

interface KaosChatProps {
  reality?: Reality;
}

export const KaosChat = ({ reality }: KaosChatProps) => {
  const { address } = useAccount();
  const messages = useConvexQuery(
    api.functions.conversations.getMessages,
    reality
      ? {
          realityId: reality.id as Id<'realities'>,
          address: address ?? '',
        }
      : 'skip'
  );
  return (
    <div className='flex h-[75dvh] basis-1/3 flex-col justify-between gap-3 rounded-2xl border-2 border-black bg-[#F6F8FA] p-4'>
      <ChatContainer messages={messages ?? []} />
      <ChatBox reality={reality} />
    </div>
  );
};
