import { cn } from '@kaos/ui/lib/utils';
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
  return (
    <div className='flex h-full w-full flex-col gap-2 overflow-scroll'>
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
