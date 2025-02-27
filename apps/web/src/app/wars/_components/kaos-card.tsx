'use client';

import { Button } from '@kaos/ui/components/button';
import { CircleArrowUp } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import KaosToken from 'public/kaos-token.png';
import type { Reality } from '~/types';

export const KaosCard = (props: Reality) => {
  const router = useRouter();
  return (
    <div className='flex h-full w-full flex-col gap-2 rounded-lg border-[3px] border-black bg-[#B2E7B9] px-4 py-3 font-comic sm:h-[12rem] sm:flex-row'>
      <div className='flex h-full w-full basis-2/3 flex-col justify-between gap-2 text-wrap'>
        <div className='font-semibold text-2xl'>{props.metadata.title}</div>
        <div className='font-bold text-neutral-700'>
          ⏳ Collapse in: {props.remainingTime.formatted}
        </div>
        <div className='flex flex-row items-center justify-between gap-2 sm:justify-start'>
          <Button
            className='!rounded-xl !text-lg h-10 w-full border-2 border-black'
            variant='secondary'
            onClick={() => router.push(`/wars/${props.id}`)}
          >
            Fork Reality
          </Button>
          <Button
            className='!rounded-xl !text-lg h-10 w-full border-2 border-black'
            variant='destructive'
            onClick={() => router.push(`/wars/${props.id}`)}
          >
            Burn it Down
          </Button>
        </div>
      </div>
      <div className='flex w-full basis-1/3 flex-row items-end justify-start gap-2 sm:flex-col sm:justify-between'>
        <div className='flex w-fit flex-row items-center justify-center gap-2 rounded-2xl border-2 border-black bg-white px-2 py-[2px]'>
          <div className='flex flex-row items-center gap-1'>
            {props.totalAmountForks.formatted}
            <CircleArrowUp className='rotate-45 text-green-500' />
          </div>
          <div className='flex flex-row items-center gap-1'>
            {props.totalAmountBurns.formatted}
            <CircleArrowUp className='-rotate-135 text-red-500' />
          </div>
        </div>
        <div className='flex flex-row items-center gap-1 rounded-2xl border-2 border-black bg-white px-2 py-[2px]'>
          <Image
            src={KaosToken}
            alt='kaos-logo'
            className='!h-6 !w-6 !rounded-full'
          />
          <div>{props.totalAmount.formatted} $KAOS</div>
        </div>
      </div>
    </div>
  );
};
