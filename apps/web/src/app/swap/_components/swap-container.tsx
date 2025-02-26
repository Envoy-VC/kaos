'use client';

import { Button } from '@kaos/ui/components/button';
import { Input } from '@kaos/ui/components/input';
import { waitForTransactionReceipt } from '@wagmi/core';
import { ArrowDown } from 'lucide-react';
import Image from 'next/image';
import KaosToken from 'public/kaos-token.png';
import { type ChangeEvent, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { parseEther } from 'viem';
import { useAccount, useBalance, useWriteContract } from 'wagmi';
import { config, kaosTokenConfig } from '~/lib/wagmi';

export const SwapContainer = () => {
  const [monadAmount, setMonadAmount] = useState<string>('0');
  const [kaosAmount, setKaosAmount] = useState<string>('0');

  const { address } = useAccount();
  const { data: balance } = useBalance({ address });
  const { writeContractAsync } = useWriteContract();

  const formattedBalance = useMemo(() => {
    const decimals = balance?.decimals ?? 18;
    const value = balance?.value ?? 0;
    const res = Number(value) / 10 ** decimals;
    return res.toFixed(2);
  }, [balance]);

  const onMonadAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const monadValue = e.target.value === '' ? '0' : e.target.value;
    const kaosValue = Number(parseEther(monadValue)) / 1e12;
    setMonadAmount(monadValue);
    setKaosAmount(kaosValue.toFixed(2));
  };

  const onMaxClick = () => {
    // @ts-expect-error safe
    onMonadAmountChange({ target: { value: formattedBalance } });
  };

  const onSwap = async () => {
    const id = toast.loading('Swapping Tokens...');
    try {
      if (!address) {
        throw new Error('Please connect your wallet');
      }
      const hash = await writeContractAsync({
        ...kaosTokenConfig,
        functionName: 'placeOrder',
        args: [address, parseEther(kaosAmount)],
        value: parseEther(monadAmount),
      });
      toast.loading('🛸 Transaction orbiting Saturn. ETA: 5 sec.', { id });
      await waitForTransactionReceipt(config, { hash });
      setMonadAmount('0');
      setKaosAmount('0');
      toast.success('🎉 Swapped successfully!', { id });
    } catch (error) {
      toast.error('😢 Something went wrong', { id });
    }
  };

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
              onChange={onMonadAmountChange}
              value={monadAmount}
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
              <div className='font-bold text-sm'>{formattedBalance} MON</div>
              <Button
                className='!rounded-full !text-xs h-6 border-2 border-black bg-[#C4B6FF] px-2 py-1 text-black hover:bg-[#C4B6FF]'
                onClick={onMaxClick}
              >
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
              onChange={() => true}
              placeholder='0'
              value={kaosAmount}
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
              <div className='font-bold text-sm'>$KAOS</div>
            </div>
          </div>
        </div>
      </div>
      <Button
        className='!rounded-xl !text-xl h-12'
        onClick={onSwap}
      >
        Swap
      </Button>
    </div>
  );
};
