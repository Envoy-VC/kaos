import { readContract } from '@wagmi/core';
import { http, createPublicClient, toHex } from 'viem';
import { monadTestnet } from 'viem/chains';
import { api } from '~/convex/_generated/api';
import type { Id } from '~/convex/_generated/dataModel';
import { config, kaosConfig } from '~/lib/wagmi';
import { convexClient } from '~/providers';
import type { Reality } from '~/types';
import { formatTime, humanizeEther } from '../helpers';

export const getAllRealities = async (): Promise<Reality[]> => {
  const convexRes = await convexClient.mutation(
    api.functions.realities.getAllRealities,
    {}
  );
  const contractData = await readContract(config, {
    ...kaosConfig,
    functionName: 'getRealities',
    args: [convexRes.map((d) => toHex(d._id))],
  });

  const data = contractData.map((d, index) => ({
    id: convexRes.at(index)?._id ?? '',
    startAt: Number(d.startAt),
    endAt: Number(d.endAt),
    remainingTime: {
      raw: Math.floor(Number(d.endAt) - Date.now() / 1000),
      formatted: formatTime(Number(d.endAt) - Date.now() / 1000),
    },
    startBlock: Number(d.startBlock),
    totalAmount: {
      raw: Number(d.totalAmount),
      formatted: humanizeEther(d.totalAmount),
    },
    totalAmountForks: {
      raw: Number(d.totalAmountForks),
      formatted: humanizeEther(d.totalAmountForks),
    },
    totalAmountBurns: {
      raw: Number(d.totalAmountBurns),
      formatted: humanizeEther(d.totalAmountBurns),
    },
    opinion: convexRes.at(index)?.opinion ?? '',
    metadata: {
      title: convexRes.at(index)?.metadata?.title ?? '',
      forkRealityTitle: convexRes.at(index)?.metadata?.forkRealityTitle ?? '',
      burnRealityTitle: convexRes.at(index)?.metadata?.burnRealityTitle ?? '',
    },
  }));

  return data;
};

export const getReality = async (id: string): Promise<Reality> => {
  const convexRes = await convexClient.mutation(
    api.functions.realities.getReality,
    {
      id: id as Id<'realities'>,
    }
  );

  console.log('Convex Res', convexRes);
  const contractData = await readContract(config, {
    ...kaosConfig,
    functionName: 'getReality',
    args: [toHex(convexRes._id)],
  });
  console.log('Contract Data', contractData);

  const data = {
    id: convexRes._id ?? '',
    startAt: Number(contractData.startAt),
    endAt: Number(contractData.endAt),
    remainingTime: {
      raw: Math.floor(Number(contractData.endAt) - Date.now() / 1000),
      formatted: formatTime(Number(contractData.endAt) - Date.now() / 1000),
    },
    startBlock: Number(contractData.startBlock),
    totalAmount: {
      raw: Number(contractData.totalAmount),
      formatted: humanizeEther(contractData.totalAmount),
    },
    totalAmountForks: {
      raw: Number(contractData.totalAmountForks),
      formatted: humanizeEther(contractData.totalAmountForks),
    },
    totalAmountBurns: {
      raw: Number(contractData.totalAmountBurns),
      formatted: humanizeEther(contractData.totalAmountBurns),
    },
    opinion: convexRes.opinion ?? '',
    metadata: {
      title: convexRes.metadata?.title ?? '',
      forkRealityTitle: convexRes.metadata?.forkRealityTitle ?? '',
      burnRealityTitle: convexRes.metadata?.burnRealityTitle ?? '',
    },
  };

  return data;
};

export const publicClient = createPublicClient({
  chain: monadTestnet,
  transport: http(),
});

const getAllTransactions = async (fromBlock: number, realityId: string) => {
  const filter = await publicClient.createContractEventFilter({
    ...kaosConfig,
    // biome-ignore lint/nursery/noSecrets: safe
    eventName: 'AddKaosToReality',
    fromBlock: BigInt(fromBlock),
    toBlock: 'latest',
    args: {
      realityId: toHex(realityId),
    },
  });

  const logs = await publicClient.getFilterLogs({ filter });
  console.log(logs);
};
