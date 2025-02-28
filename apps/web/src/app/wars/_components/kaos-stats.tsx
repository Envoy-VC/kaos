import { CircleArrowUpIcon } from 'lucide-react';
import Image from 'next/image';
import KaosToken from 'public/kaos-token.png';
import type { Reality } from '~/types';

interface KaosStatsProps {
  reality?: Reality;
}

export const KaosStats = ({ reality }: KaosStatsProps) => {
  return (
    <div className='h-full w-full basis-2/5 rounded-2xl border-2 border-black bg-[#DFF1E2] p-3'>
      <div className='flex flex-col gap-3'>
        <div className='flex flex-row items-center justify-between gap-2 rounded-3xl border-2 border-black bg-white px-2 py-2 text-2xl'>
          <div className='flex flex-row items-center gap-2'>
            <Image
              src={KaosToken}
              alt='kaos-logo'
              className='!size-8 !rounded-full border-2 border-black'
            />
            <div>{reality?.totalAmountForks.formatted ?? '0'} $KAOS</div>
          </div>
          <CircleArrowUpIcon
            className='rotate-45 text-3xl text-green-500'
            width={32}
            height={32}
          />
        </div>
        <div className='flex flex-row items-center justify-between gap-2 rounded-3xl border-2 border-black bg-white px-2 py-2 text-2xl'>
          <div className='flex flex-row items-center gap-2'>
            <Image
              src={KaosToken}
              alt='kaos-logo'
              className='!size-8 !rounded-full border-2 border-black'
            />
            <div>{reality?.totalAmountBurns.formatted ?? '0'} $KAOS</div>
          </div>
          <CircleArrowUpIcon
            className='-rotate-135 text-3xl text-red-500'
            width={32}
            height={32}
          />
        </div>
        <div className='flex flex-row items-center justify-between gap-2 rounded-3xl border-2 border-black bg-white px-2 py-2 text-2xl'>
          {reality?.remainingTime.formatted
            ? `⏳ Collapse in: ${reality.remainingTime.formatted}`
            : '💥 Collapsed'}
        </div>
      </div>
    </div>
  );
};
