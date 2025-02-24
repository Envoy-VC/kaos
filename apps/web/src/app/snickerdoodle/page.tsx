import Image from 'next/image';
import SnickerDoodleImage from 'public/snickerdoodle.png';

const Snickerdoodle = () => {
  return (
    <div className='my-[10dvh] h-full w-full px-3 md:my-[20dvh]'>
      <div className='mx-auto flex h-[20rem] max-w-screen-lg flex-col justify-around gap-3 font-comic md:flex-row'>
        <div className='flex w-full basis-1/2 flex-col items-center justify-around gap-4'>
          <div className='text-center font-bold text-4xl'>
            Meet Snickerdoodle!
          </div>
          <p className='px-4 text-center font-base text-neutral-500'>
            Snickerdoodle is the AI chaos engine of Kaos, created by a
            sleep-deprived coder to turn debates into reality wars. Her job:
            split your hot takes into parallel universes, stir drama, and reward
            the messiest arguments with Chaos Points. Tag
            <span className='ml-1 font-bold text-black'>@snickerdoodle</span> in
            Reality Chat to provoke her into roasting your takes, rigging
            debates, or dropping absurd twists. She lives to break logic, blame
            glitches on “quantum squirrels,” and watch worlds burn. Play nice?
            She'll fork your reality anyway.
          </p>
        </div>
        <Image
          src={SnickerDoodleImage}
          alt='Snickerdoodle'
          className='aspect-square size-[24rem] rounded-2xl border-[3px] border-black object-cover'
        />
      </div>
    </div>
  );
};

export default Snickerdoodle;
