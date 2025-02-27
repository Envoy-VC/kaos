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
    <div className='mx-auto my-[6dvh] flex w-full max-w-screen-xl flex-col gap-6'>
      <div className='px-4 font-bold font-rabbit text-4xl sm:text-5xl lg:text-6xl'>
        Realities
      </div>
      <div className='grid w-full grid-cols-1 place-content-center place-items-center gap-4 px-2 lg:grid-cols-2'>
        {realities?.map((d) => (
          <KaosCard
            key={d.id}
            {...d}
          />
        ))}
      </div>
    </div>
  );
};

export default Wars;
