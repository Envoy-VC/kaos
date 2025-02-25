import { cn } from '@kaos/ui/lib/utils';
import Image from 'next/image';
import KaosToken from 'public/kaos-token.png';

interface KaosActivityCardProps {
  address: string;
  amount: string | number;
  type: 'fork' | 'burn';
}

export const KaosActivityCard = ({
  address,
  amount,
  type,
}: KaosActivityCardProps) => {
  return (
    <div className='flex flex-row items-center justify-between rounded-2xl border-2 border-black bg-white px-4 py-2 font-comic text-xl'>
      <div>{address}</div>
      <div className='flex flex-row items-center justify-center gap-3'>
        <div
          className={cn(
            'text-2xl',
            type === 'fork' ? 'text-green-500' : 'text-red-500'
          )}
        >
          {type === 'fork' ? '+' : '-'}
          {amount}
        </div>
        <Image
          src={KaosToken}
          alt='Kaos Logo'
          className='size-8 rounded-full'
          width={40}
          height={40}
        />
      </div>
    </div>
  );
};
