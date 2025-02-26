'use client';

import { useQuery } from '@tanstack/react-query';
import { getAllRealities } from '~/lib/wagmi/actions';
import { KaosCard } from './_components';

const Wars = () => {
  const { data: realities } = useQuery({
    queryKey: ['wars'],
    queryFn: async () => {
      const res = await getAllRealities();
      return res;
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
