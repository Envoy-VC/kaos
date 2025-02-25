import { ChatBox } from './chat-box';
import { ChatContainer } from './chat-container';

export const KaosChat = () => {
  return (
    <div className='flex h-[75dvh] basis-1/3 flex-col justify-between gap-3 rounded-2xl border-2 border-black bg-[#F6F8FA] p-4'>
      <ChatContainer />
      <ChatBox />
    </div>
  );
};
