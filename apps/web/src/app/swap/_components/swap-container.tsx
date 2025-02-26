'use client';

import { Button } from '@kaos/ui/components/button';
import { Input } from '@kaos/ui/components/input';
import { ArrowDown } from 'lucide-react';
import Image from 'next/image';
import KaosToken from 'public/kaos-token.png';

export const SwapContainer = () => {
  return (
    <div className='mx-auto flex w-full max-w-lg flex-col gap-2 p-3'>
      <div className='relative flex flex-col gap-1 font-comic'>
        <div className='-translate-y-1/2 absolute top-1/2 right-1/2 flex size-12 translate-x-1/2 items-center justify-center rounded-xl border-2 border-black bg-white'>
          <ArrowDown className='size-7 text-black' />
        </div>
        <div className='flex flex-col gap-2 rounded-xl border-2 border-black px-4 py-3'>
          <div className='pb-2 text-2xl'>Sell</div>
          <div className='flex flex-row items-center justify-between'>
            <Input
              className='!text-4xl w-fit border border-none px-0 shadow-none focus-visible:border-none focus-visible:ring-0'
              placeholder='0'
            />
            <div className='flex flex-row items-center justify-start gap-1 rounded-2xl border-2 border-black px-3 py-1'>
              {/* biome-ignore lint/nursery/noImgElement: <explanation> */}
              <img
                src='https://docs.monad.xyz/img/monad_logo.png'
                alt='Monad Logo'
                className='size-7'
              />
              <div>$MON</div>
            </div>
          </div>
          <div className='flex w-full justify-end'>
            <div className='flex flex-row items-center gap-2'>
              <div className='font-bold text-sm'>1.34 MON</div>
              <Button className='!rounded-full !text-xs h-6 border-2 border-black bg-[#C4B6FF] px-2 py-1 text-black hover:bg-[#C4B6FF]'>
                MAX
              </Button>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-2 rounded-xl border-2 border-black px-4 py-3'>
          <div className='pb-2 text-2xl'>Buy</div>
          <div className='flex flex-row items-center justify-between'>
            <Input
              className='!text-4xl w-fit border border-none px-0 shadow-none focus-visible:border-none focus-visible:ring-0'
              disabled={true}
              placeholder='0'
            />
            <div className='flex flex-row items-center justify-start gap-1 rounded-2xl border-2 border-black px-3 py-1'>
              <Image
                src={KaosToken}
                alt='Monad Logo'
                className='size-7 rounded-full'
              />
              <div>$KAOS</div>
            </div>
          </div>
          <div className='flex w-full justify-end'>
            <div className='flex flex-row items-center gap-2'>
              <div className='font-bold text-sm'>4589 KAOS</div>
            </div>
          </div>
        </div>
      </div>
      <Button className='!rounded-xl !text-xl h-12'>Swap</Button>
    </div>
  );
};
