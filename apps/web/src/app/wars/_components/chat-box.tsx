'use client';

import { Button } from '@kaos/ui/components/button';
import { Input } from '@kaos/ui/components/input';
import { Textarea } from '@kaos/ui/components/textarea';
import { useQueryClient } from '@tanstack/react-query';
import { readContract, waitForTransactionReceipt } from '@wagmi/core';
import { useMutation as useConvexMutation } from 'convex/react';
import { ChevronsUpDownIcon } from 'lucide-react';
import { type ChangeEvent, useState } from 'react';
import { toast } from 'sonner';
import { formatEther, parseEther, toHex } from 'viem';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { api } from '~/convex/_generated/api';
import type { Id } from '~/convex/_generated/dataModel';
import { config, kaosConfig, kaosTokenConfig } from '~/lib/wagmi';
import type { Reality } from '~/types';
import { cn } from '../../../../../../packages/ui/src/lib/utils';

const percentages = ['0', '25', '50', '100'] as const;
type Percentage = (typeof percentages)[number];

interface ChatBoxProps {
  reality?: Reality;
}

export const ChatBox = ({ reality }: ChatBoxProps) => {
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();

  const [amount, setAmount] = useState<string>('0');
  const [content, setContent] = useState<string>('');
  const [currentAction, setCurrentAction] = useState<'fork' | 'burn'>('fork');
  const [currentPercentage, setCurrentPercentage] = useState<Percentage | null>(
    null
  );

  const queryClient = useQueryClient();

  const { data: balance } = useReadContract({
    ...kaosTokenConfig,
    functionName: 'balanceOf',
    args: [address ?? '0x0'],
  });

  const { data: userPool, refetch: refetchUserPool } = useReadContract({
    ...kaosConfig,
    functionName: 'getUserPool',
    args: [address ?? '0x0', toHex(reality?.id ?? '')],
  });

  const onAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (
      e.target.value === '' ||
      e.target.value === '0' ||
      e.target.value === undefined
    ) {
      setAmount('0');
      setCurrentPercentage(null);
      return;
    }
    setAmount(e.target.value);
  };

  const handlePercentageClick = (percentage: Percentage) => {
    setCurrentPercentage(percentage);
    const amount = formatEther(
      ((balance ?? 0n) * BigInt(percentage)) / BigInt(100)
    );
    setAmount(amount);
  };

  const sendMessage = useConvexMutation(
    api.functions.conversations.sendMessage
  );

  const addTransaction = useConvexMutation(
    api.functions.transactions.addTransaction
  );

  const onClaimReward = async () => {
    const id = toast.loading('Claiming reward...');
    try {
      if (!address) {
        throw new Error('Please connect your wallet');
      }
      if (!userPool) {
        throw new Error('User Pool Not Found');
      }
      if (!reality) {
        throw new Error('Reality Not Found');
      }
      await refetchUserPool();
      const hash = await writeContractAsync({
        ...kaosConfig,
        functionName: 'claimKaos',
        args: [toHex(reality.id), address],
      });
      await refetchUserPool();
      toast.loading('💸 Tokens claimed.', { id });
      await waitForTransactionReceipt(config, { hash });
    } catch (error) {
      console.log(error);
      toast.error('💣 Critical chaos failure.', { id });
    }
  };

  const onSendMessage = async () => {
    const id = toast.loading('Sending message...');
    try {
      if (!reality) {
        throw new Error('Reality Not Found');
      }
      if (!address) {
        throw new Error('Please connect your wallet');
      }

      if (amount !== '0') {
        const allowance = await readContract(config, {
          ...kaosTokenConfig,
          functionName: 'allowance',
          args: [address, kaosConfig.address],
        });

        toast.loading('📢 Approving tokens for the chaos gods.', { id });

        if (allowance < parseEther(amount)) {
          const allowanceHash = await writeContractAsync({
            ...kaosTokenConfig,
            functionName: 'approve',
            args: [kaosConfig.address, parseEther(amount)],
          });
          await waitForTransactionReceipt(config, { hash: allowanceHash });
        }

        const hash = await writeContractAsync({
          ...kaosConfig,
          functionName: 'addToReality',
          args: [
            toHex(reality.id),
            parseEther(amount),
            currentAction === 'fork' ? 0 : 1,
            address,
          ],
        });
        toast.loading('💸 Tokens sacrificed to the chaos gods.', { id });
        await waitForTransactionReceipt(config, { hash });
      }
      await sendMessage({
        address,
        content,
        realityId: reality.id as Id<'realities'>,
      });
      await addTransaction({
        reality: reality.id as Id<'realities'>,
        sender: address,
        action: currentAction,
        amount: Number(parseEther(amount)),
      });
      await queryClient.invalidateQueries({ queryKey: ['wars', reality.id] });
      setContent('');
      setAmount('0');
      toast.success('💬 Message sent!', { id });
    } catch (error) {
      console.log(error);
      toast.error('💣 Critical chaos failure.', { id });
    }
  };

  return (
    <div className='flex w-full flex-col gap-2 rounded-2xl border-2 border-black p-2 font-comic'>
      <Textarea
        placeholder='Type your message here...'
        rows={3}
        value={content}
        onChange={(e) => setContent(e.target.value)}
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
              value={amount}
              onChange={onAmountChange}
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
          {reality?.isEnded ? (
            <Button
              className='w-full'
              onClick={onClaimReward}
              disabled={userPool?.claimed}
            >
              {userPool?.claimed ? 'Already Claimed' : 'Claim $KAOS'}
            </Button>
          ) : (
            <Button
              className='w-full'
              onClick={onSendMessage}
            >
              Send
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
