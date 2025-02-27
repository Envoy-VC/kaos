import { cn } from '@kaos/ui/lib/utils';
import { useEffect, useRef } from 'react';
import type { api } from '~/convex/_generated/api';

interface ChatMessageProps {
  message: (typeof api.functions.conversations.getMessages._returnType)[number];
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        'flex w-full',
        message.sender.type === 'me' ? 'justify-end' : 'justify-start'
      )}
    >
      <div
        className={cn(
          'flex max-w-xs flex-col rounded-lg border-2 border-black p-2',
          message.sender.type === 'me' ? 'bg-[#D3DEFF]' : 'bg-white'
        )}
      >
        <div className='font-bold text-xs'>
          {message.sender.username ??
            `${message.sender.address.slice(0, 6)}...${message.sender.address.slice(-4)}`}
        </div>
        <div className='text-sm'>{message.content}</div>
      </div>
    </div>
  );
};

interface ChatContainerProps {
  messages: typeof api.functions.conversations.getMessages._returnType;
}

export const ChatContainer = ({ messages }: ChatContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: need to update deps
  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const scrollHeight = container.scrollHeight;
      const clientHeight = container.clientHeight;
      const scrollTop = container.scrollTop;

      if (scrollHeight - clientHeight - scrollTop < 300) {
        container.scrollTo({ top: scrollHeight, behavior: 'smooth' });
      }
    }
  }, [messages]);

  return (
    <div
      className='flex h-full w-full flex-col gap-2 overflow-scroll'
      ref={containerRef}
    >
      {messages.map((message, index) => {
        return (
          <ChatMessage
            key={`message-${String(index)}`}
            message={message}
          />
        );
      })}
    </div>
  );
};
