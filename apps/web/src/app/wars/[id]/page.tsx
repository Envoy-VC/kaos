'use client';

import { useQuery } from '@tanstack/react-query';
import { getReality } from '~/lib/wagmi/actions';
import { KaosActivity, KaosChat, KaosDetails } from '../_components';

const WarPage = ({
  params,
}: {
  params: { id: string };
}) => {
  const id = params.id;

  const { data: reality } = useQuery({
    queryKey: ['wars', id],
    queryFn: async () => {
      console.log(id);
      const res = await getReality(id);
      return res;
    },
  });

  if (!reality) return null;

  return (
    <div className='mx-auto my-[6dvh] flex h-full w-full max-w-screen-xl flex-col gap-4 px-3 md:flex-row'>
      <div className='flex h-[75dvh] basis-2/3 flex-col gap-4'>
        <KaosDetails reality={reality} />
        <KaosActivity />
      </div>
      <KaosChat realityId={reality.id} />
    </div>
  );
};

export default WarPage;
