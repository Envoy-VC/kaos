import { useEffect, useRef } from 'react';
import type { api } from '~/convex/_generated/api';
import { humanizeEther } from '~/lib/helpers';
import { KaosActivityCard } from './kaos-activity-card';

interface KaosActivityCardProps {
  transactions: typeof api.functions.transactions.getTransactions._returnType;
}

export const KaosActivity = ({ transactions }: KaosActivityCardProps) => {
  const activityContainer = useRef<HTMLDivElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: need to update deps
  useEffect(() => {
    if (activityContainer.current) {
      const container = activityContainer.current;
      const scrollHeight = container.scrollHeight;
      const clientHeight = container.clientHeight;
      const scrollTop = container.scrollTop;

      if (scrollHeight - clientHeight - scrollTop < 300) {
        container.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [transactions]);

  return (
    <div
      className='flex w-full basis-3/4 flex-col gap-2 overflow-y-scroll rounded-2xl border-2 border-black bg-[#FDD2E1] p-4'
      ref={activityContainer}
    >
      {[...transactions].reverse().map((tx) => {
        return (
          <KaosActivityCard
            key={tx.id}
            address={tx.sender.address}
            amount={humanizeEther(tx.amount)}
            type={tx.action}
          />
        );
      })}
    </div>
  );
};
