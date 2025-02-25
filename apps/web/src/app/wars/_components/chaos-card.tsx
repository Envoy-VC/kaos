import { Button } from '@kaos/ui/components/button';
import { CircleArrowUp } from 'lucide-react';
import Image from 'next/image';
import KaosToken from 'public/kaos-token.png';

interface ChaosCardProps {
  id: string;
  title: string;
}

export const ChaosCard = () => {
  return (
    <div className='flex h-[12rem] w-[32rem] flex-row gap-2 rounded-lg border-[3px] border-black bg-[#B2E7B9] px-4 py-3 font-comic'>
      <div className='flex h-full w-full basis-2/3 flex-col justify-between gap-2 text-wrap'>
        <div className='font-semibold text-2xl'>
          Is Star Wars more iconic than Star Trek?
        </div>
        <div className='font-bold text-neutral-700'>⏳ Collapse in: 2h 15m</div>
        <div className='flex flex-row items-center gap-2'>
          <Button
            className='!rounded-xl !text-lg h-10 border-2 border-black'
            variant='secondary'
          >
            Fork Reality
          </Button>
          <Button
            className='!rounded-xl !text-lg h-10 border-2 border-black'
            variant='destructive'
          >
            Burn it Down
          </Button>
        </div>
      </div>
      <div className='flex w-full basis-1/3 flex-col items-end justify-between'>
        <div className='flex w-fit flex-row items-center justify-center gap-2 rounded-2xl border-2 border-black bg-white px-2 py-[2px]'>
          <div className='flex flex-row items-center gap-1'>
            1.2M <CircleArrowUp className='rotate-45 text-green-500' />
          </div>
          <div className='flex flex-row items-center gap-1'>
            456K <CircleArrowUp className='-rotate-135 text-red-500' />
          </div>
        </div>
        <div className='flex flex-row items-center gap-1 rounded-2xl border-2 border-black bg-white px-2 py-[2px]'>
          <Image
            src={KaosToken}
            alt='kaos-logo'
            className='!h-6 !w-6 !rounded-full'
          />
          <div>1.2K $KAOS</div>
        </div>
      </div>
    </div>
  );
};
