'use client';

import { Button } from '@kaos/ui/components/button';
import { Input } from '@kaos/ui/components/input';
import { Textarea } from '@kaos/ui/components/textarea';
import { ChevronsUpDownIcon } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../../../../../packages/ui/src/lib/utils';

const percentages = ['0', '25', '50', '100'] as const;
type Percentage = (typeof percentages)[number];

export const ChatBox = () => {
  const [currentAction, setCurrentAction] = useState<'fork' | 'burn'>('fork');
  const [currentPercentage, setCurrentPercentage] = useState<Percentage | null>(
    null
  );

  const handlePercentageClick = (percentage: Percentage) => {
    setCurrentPercentage(percentage);
  };

  return (
    <div className='flex w-full flex-col gap-2 rounded-2xl border-2 border-black p-2 font-comic'>
      <Textarea
        placeholder='Type your message here...'
        rows={3}
      />
      <div className='flex flex-col items-center gap-2'>
        <div className='flex w-full basis-2/3 flex-col gap-1'>
          <div className='flex flex-row items-center gap-1 text-center font-bold text-sm'>
            {percentages.map((percent) => {
              return (
                <Button
                  key={`percentage-${percent}`}
                  variant='ghost'
                  className={cn(
                    'h-6 w-full cursor-pointer rounded-sm border-2 border-black',
                    currentPercentage === percent && '!bg-[#C4B6FF]'
                  )}
                  onClick={() => handlePercentageClick(percent)}
                >
                  {percent}%
                </Button>
              );
            })}
          </div>
          <div className='flex flex-row items-center gap-2 '>
            <Input
              placeholder='0'
              className='w-full'
            />
            <Button
              onClick={() => {
                setCurrentAction(currentAction === 'fork' ? 'burn' : 'fork');
              }}
              className={cn(
                '!text-black !font-bold !text-base flex h-10 w-full flex-row items-center justify-between gap-2 rounded-lg border-2 border-black px-4',
                currentAction === 'fork'
                  ? 'bg-green-400 hover:bg-green-500'
                  : 'bg-red-400 hover:bg-red-500'
              )}
            >
              <div>{currentAction === 'fork' ? 'Fork' : 'Burn'}</div>
              <ChevronsUpDownIcon className='ml-2 size-6 text-black' />
            </Button>
          </div>
        </div>
        <div className='w-full basis-1/3'>
          <Button className='w-full'>Send</Button>
        </div>
      </div>
    </div>
  );
};
