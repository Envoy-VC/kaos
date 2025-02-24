'use client';

import { Button } from '@kaos/ui/components/button';
import { Textarea } from '@kaos/ui/components/textarea';
import Image from 'next/image';
import CreatePoster from 'public/create-poster.png';
import { RotatingText } from '~/components';

const ideas: string[] = [
  'Is tea better than coffee for morning energy?',
  'Should toilet paper hang over or under the roll?',
  'Are hot dogs considered sandwiches or their own category?',
  'Does pineapple belong on pizza or is it a crime?',
  'Is Marvel truly superior to DC in storytelling?',
  'Should you put milk before cereal or cereal first?',
  'Are emojis in emails professional or unprofessional?',
  'Is a hotdog a sandwich or a taco?',
  'Should you fold pizza slices or eat them flat?',
  'Are cats better pets than dogs or vice versa?',
  'Is winter more enjoyable than summer or just colder?',
  'Should ketchup be banned from hot dogs forever?',
  'Is Instagram better for memes than TikTok?',
  'Are e-books better than physical books for reading?',
  'Is camping in nature better than luxury hotels?',
  'Should you shower in the morning or at night?',
  'Is Star Wars more iconic than Star Trek?',
  'Are smartphones making people smarter or more distracted?',
  'Is chocolate ice cream better than vanilla flavor?',
  'Should you put mayo on fries or just ketchup?',
  'Is binge-watching TV shows healthy or a bad habit?',
  'Are aliens more likely than ghosts to exist?',
  'Is it okay to wear socks with sandals?',
  'Should pizza be eaten with fork or hands?',
  'Is time travel possible or just science fiction?',
  'Are dogs more loyal pets than cats?',
  'Should you text or call for serious conversations?',
  'Is it better to read books or watch movies?',
  'Are weekends for productivity or total relaxation?',
  'Is water wet or just makes things wet?',
];

export const CreateForm = () => {
  return (
    <div className='mx-auto my-[5dvh] h-[30rem] max-w-screen-lg rounded-xl border-[2px] border-black bg-[#F6F8FA] p-6 font-comic'>
      <div className='flex h-full w-full flex-col gap-4 md:flex-row'>
        <div className='flex basis-1/2 flex-col gap-8 p-4'>
          <div className='font-bold text-3xl'>Drop Your Nuclear Take Here</div>
          <Textarea
            placeholder='Type your hottest take...'
            className='!text-lg'
            rows={5}
          />
          <Button className='!rounded-2xl !text-xl h-12 w-full'>Create</Button>
          <RotatingText
            texts={ideas}
            mainClassName='px-2 sm:px-2 md:px-3 bg-blue-700 text-white overflow-hidden py-1 justify-center rounded-xl  text-xl !text-center border-[2px] border-black'
            staggerFrom='first'
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-120%' }}
            staggerDuration={0.025}
            splitLevelClassName='overflow-hidden pb-0.5 sm:pb-1 md:pb-1'
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
            rotationInterval={5000}
          />
        </div>
        <div className='flex basis-1/2 flex-col items-center justify-center'>
          <Image
            src={CreatePoster}
            alt='nuclear-take'
            className='!rounded-3xl aspect-square size-[26rem] object-cover'
          />
        </div>
      </div>
    </div>
  );
};
