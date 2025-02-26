import type { api } from '~/convex/_generated/api';
import { humanizeEther } from '~/lib/helpers';
import { KaosActivityCard } from './kaos-activity-card';

interface KaosActivityCardProps {
  transactions: typeof api.functions.transactions.getTransactions._returnType;
}

export const KaosActivity = ({ transactions }: KaosActivityCardProps) => {
  return (
    <div className='flex w-full basis-3/4 flex-col gap-2 overflow-y-scroll rounded-2xl border-2 border-black bg-[#FDD2E1] p-4'>
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
