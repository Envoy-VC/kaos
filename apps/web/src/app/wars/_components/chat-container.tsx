import { cn } from '@kaos/ui/lib/utils';

const messages = [
  {
    message: 'Hey @snickerdoodle, what are you up to?',
    senderType: 'me',
    sender: 'me',
  },
  {
    message: "Howdy matey! I'm just hanging out, what about you?",
    senderType: 'other',
    sender: 'snickerdoodle',
  },
  {
    message: 'So which is better, coke or pepsi?',
    senderType: 'me',
    sender: 'me',
  },
  {
    message: 'I prefer coke, it has a lower calorie count.',
    senderType: 'other',
    sender: 'snickerdoodle',
  },
  {
    message: 'I see, I guess I should try it out next time.',
    senderType: 'me',
    sender: 'me',
  },
  {
    message: 'That sounds like a great idea!',
    senderType: 'other',
    sender: 'snickerdoodle',
  },
  {
    message: 'Hey @snickerdoodle, what are you up to?',
    senderType: 'me',
    sender: 'me',
  },
  {
    message: "Howdy matey! I'm just hanging out, what about you?",
    senderType: 'other',
    sender: 'snickerdoodle',
  },
] as const;

interface ChatMessageProps {
  message: string;
  senderType: 'me' | 'other';
  sender: string;
}

const ChatMessage = ({ message, sender, senderType }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        'flex w-full',
        senderType === 'me' ? 'justify-end' : 'justify-start'
      )}
    >
      <div
        className={cn(
          'flex max-w-xs flex-col rounded-lg border-2 border-black p-2',
          senderType === 'me' ? 'bg-[#D3DEFF]' : 'bg-white'
        )}
      >
        <div>{sender}</div>
        <div className='text-sm'>{message}</div>
      </div>
    </div>
  );
};

export const ChatContainer = () => {
  return (
    <div className='flex h-full w-full flex-col gap-2 overflow-scroll'>
      {messages.map((message, index) => {
        return (
          <ChatMessage
            key={`message-${String(index)}`}
            {...message}
          />
        );
      })}
    </div>
  );
};
