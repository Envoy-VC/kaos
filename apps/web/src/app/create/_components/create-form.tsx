'use client';

import Image from 'next/image';
import { useState } from 'react';

import { useMutation } from 'convex/react';
import { api } from '~/convex/_generated/api';

import { waitForTransactionReceipt } from '@wagmi/core';
import { toHex } from 'viem';
import { useAccount, useWriteContract } from 'wagmi';
import { config, kaosConfig } from '~/lib/wagmi';

import { generateReality } from '~/lib/ai';

import { Button } from '@kaos/ui/components/button';
import { Textarea } from '@kaos/ui/components/textarea';
import { RotatingText } from '~/components';

import CreatePoster from 'public/create-poster.png';
import { ideas } from '~/data';

export const CreateForm = () => {
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const createReality = useMutation(api.functions.realities.createReality);

  const [opinion, setOpinion] = useState<string>('');

  const onCreateReality = async () => {
    try {
      if (opinion.trim() === '') {
        throw new Error('Please enter your opinion');
      }
      if (!address) {
        throw new Error('Please connect your wallet');
      }
      const generated = await generateReality(opinion);
      const res = await createReality({
        address,
        opinion,
        title: generated.title,
        forkRealityTitle: generated.forkRealityTitle,
        burnRealityTitle: generated.burnRealityTitle,
      });
      const hash = await writeContractAsync({
        ...kaosConfig,
        functionName: 'createReality',
        args: [toHex(res._id)],
      });
      await waitForTransactionReceipt(config, { hash });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='mx-auto my-[5dvh] max-w-screen-lg rounded-xl border-[2px] border-black bg-[#F6F8FA] p-6 px-3 font-comic'>
      <div className='flex h-full w-full flex-col gap-4 md:flex-row'>
        <div className='flex basis-1/2 flex-col gap-8 p-4'>
          <div className='font-bold text-3xl'>Drop Your Nuclear Take Here</div>
          <Textarea
            placeholder='Type your hottest take...'
            className='!text-lg h-[8rem]'
            rows={5}
            onChange={(e) => setOpinion(e.target.value)}
            value={opinion}
          />
          <Button
            className='!rounded-2xl !text-xl h-12 w-full'
            onClick={onCreateReality}
          >
            Create
          </Button>
          <RotatingText
            texts={ideas}
            mainClassName='px-2 sm:px-2 md:px-3 bg-blue-700 text-white overflow-hidden py-1 justify-center rounded-xl  text-xl !text-center border-[2px] border-black'
            staggerFrom='first'
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-120%' }}
            staggerDuration={0.025}
            splitLevelClassName='overflow-hidden pb-0.5 sm:pb-1 md:pb-1'
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
            rotationInterval={5000}
          />
        </div>
        <div className='flex basis-1/2 flex-col items-center justify-center'>
          <Image
            src={CreatePoster}
            alt='nuclear-take'
            className='!rounded-3xl aspect-square size-[26rem] object-cover'
          />
        </div>
      </div>
    </div>
  );
};
