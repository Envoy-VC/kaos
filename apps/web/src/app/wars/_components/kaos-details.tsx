import { KaosCharts } from './kaos-charts';
import { KaosStats } from './kaos-stats';

export const KaosDetails = () => {
  return (
    <div className='h-full max-h-[24rem] w-full rounded-2xl border-2 border-black bg-[#F6F8FA] font-comic'>
      <div className='flex h-full flex-col'>
        <div className='flex h-[3rem] w-full justify-end rounded-t-xl bg-[#383838] px-4'>
          <div className='flex flex-row items-center gap-2'>
            <div className='size-3 rounded-full bg-[#5E5E5E]' />
            <div className='size-3 rounded-full bg-[#5E5E5E]' />
            <div className='size-3 rounded-full bg-[#5E5E5E]' />
          </div>
        </div>
        <div className='flex w-full flex-col gap-1 p-4'>
          <div className='px-2 font-bold text-sm'>Nuclear Take: </div>
          <div className='rounded-2xl border-2 border-black bg-white px-4 py-2 text-3xl'>
            Is Star Wars more iconic than Star Trek?
          </div>
        </div>
        <div className='flex h-full w-full flex-col gap-2 px-4 pb-4 md:flex-row'>
          <KaosCharts />
          <KaosStats />
        </div>
      </div>
    </div>
  );
};
