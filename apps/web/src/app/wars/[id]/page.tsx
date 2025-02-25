import { KaosChat, KaosActivity, KaosDetails } from '../_components';

const WarPage = () => {
  return (
    <div className='mx-auto my-[6dvh] flex h-full w-full max-w-screen-xl flex-col gap-4 px-3 md:flex-row'>
      <div className='flex basis-2/3 flex-col gap-4'>
        <KaosDetails />
        <KaosActivity />
      </div>
      <KaosChat />
    </div>
  );
};

export default WarPage;
