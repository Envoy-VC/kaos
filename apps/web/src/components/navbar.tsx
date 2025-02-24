import { Button } from '@kaos/ui/components/button';
import { UserIcon } from 'lucide-react';
import Link from 'next/link';
import { Logo } from './logo';

const navLinks = [
  {
    key: 'home',
    label: 'Home',
    href: '/',
  },
  {
    key: 'reality-wars',
    label: 'Reality Wars',
    href: '/wars',
  },
  {
    key: 'create-chaos',
    label: 'Create Chaos',
    href: '/create',
  },
];

export const Navbar = () => {
  return (
    <div className='mx-auto mt-12 flex w-full max-w-screen-xl flex-row items-center justify-between'>
      <div className='flex flex-row items-center gap-3'>
        <Logo
          width={52}
          height={52}
          fill='#50C4BA'
        />
        <div className='font-rabbit font-semibold text-5xl text-neutral-800'>
          KAOS
        </div>
      </div>
      <div className='flex flex-row items-center gap-6 font-comic'>
        {navLinks.map((link) => {
          return (
            <Link
              className='!font-bold !text-lg text-neutral-800 transition-colors duration-200 hover:text-neutral-500 active:text-neutral-800'
              href={link.href}
              key={link.key}
            >
              {link.label}
            </Link>
          );
        })}
        <Button
          variant='secondary'
          className='!rounded-full size-10'
        >
          <UserIcon className='size-6' />
        </Button>
      </div>
    </div>
  );
};
