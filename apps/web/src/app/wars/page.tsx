'use client';

import { useQuery } from '@tanstack/react-query';
import { readContract } from '@wagmi/core';
import { useMutation as useConvexMutation } from 'convex/react';
import { toHex } from 'viem';
import { useReadContract } from 'wagmi';
import { api } from '~/convex/_generated/api';
import { formatTime, humanizeEther } from '~/lib/helpers';
import { config, kaosConfig } from '~/lib/wagmi';
import { KaosCard } from './_components';

const Wars = () => {
  const getAllRealities = useConvexMutation(
    api.functions.realities.getAllRealities
  );
  useReadContract({
    ...kaosConfig,
    functionName: 'getRealities',
  });
  const { data: realities } = useQuery({
    queryKey: ['wars'],
    queryFn: async () => {
      const res = await getAllRealities();
      console.log(res);
      const contractData = await readContract(config, {
        ...kaosConfig,
        functionName: 'getRealities',
        args: [res.map((d) => toHex(d._id))],
      });

      const data = contractData.map((d, index) => ({
        id: res.at(index)?._id ?? '',
        startAt: Number(d.startAt),
        endAt: Number(d.endAt),
        remainingTime: formatTime(Number(d.endAt) - Date.now() / 1000),
        startBlock: Number(d.startBlock),
        totalAmount: humanizeEther(d.totalAmount),
        totalAmountForks: humanizeEther(d.totalAmountForks),
        totalAmountBurns: humanizeEther(d.totalAmountBurns),
        opinion: res.at(index)?.opinion ?? '',
        metadata: {
          title: res.at(index)?.metadata?.title ?? '',
          forkRealityTitle: res.at(index)?.metadata?.forkRealityTitle ?? '',
          burnRealityTitle: res.at(index)?.metadata?.burnRealityTitle ?? '',
        },
      }));
      console.log(data);
      return data;
    },
  });
  return (
    <div className='mx-auto my-[6dvh] flex max-w-screen-2xl flex-row flex-wrap items-center justify-center gap-4 px-2'>
      {realities?.map((d) => (
        <KaosCard
          key={d.id}
          {...d}
        />
      ))}
    </div>
  );
};

export default Wars;
