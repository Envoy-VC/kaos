'use client';

import { useQuery } from '@tanstack/react-query';
import { useQuery as useConvexQuery } from 'convex/react';
import { api } from '~/convex/_generated/api';
import type { Id } from '~/convex/_generated/dataModel';
import { getReality } from '~/lib/wagmi/actions';
import { KaosActivity, KaosChat, KaosDetails } from '../_components';

const WarPage = ({
  params,
}: {
  params: { id: string };
}) => {
  const id = params.id;

  const { data: reality, refetch } = useQuery({
    queryKey: ['wars', id],
    queryFn: async () => {
      const res = await getReality(id);
      return res;
    },
  });

  const transactions = useConvexQuery(
    api.functions.transactions.getTransactions,
    { reality: id as Id<'realities'> }
  );

  return (
    <div className='mx-auto my-[6dvh] flex h-full w-full max-w-screen-xl flex-col gap-4 px-3 md:flex-row'>
      <div className='flex h-[75dvh] basis-2/3 flex-col gap-4'>
        <KaosDetails
          reality={reality}
          transactions={transactions ?? []}
        />
        <KaosActivity transactions={transactions ?? []} />
      </div>
      <KaosChat realityId={reality?.id} />
    </div>
  );
};

export default WarPage;
