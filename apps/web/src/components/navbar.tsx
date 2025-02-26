import Link from 'next/link';
import { Logo } from './logo';
import { SignIn } from './sign-in';

const navLinks = [
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
  {
    key: 'meet-snickerdoodle',
    label: 'Meet Snickerdoodle',
    href: '/snickerdoodle',
  },
  {
    key: 'swap',
    label: 'Get $KAOS',
    href: '/swap',
  },
];

export const Navbar = () => {
  return (
    <div className='mx-auto mt-12 flex w-full max-w-screen-xl flex-row items-center justify-between px-4'>
      <Link
        href='/'
        className='flex flex-row items-center gap-3'
      >
        <Logo
          width={52}
          height={52}
          fill='#50C4BA'
        />
        <div className='font-rabbit font-semibold text-5xl text-neutral-800'>
          KAOS
        </div>
      </Link>
      <div className='flex flex-row items-center gap-6 font-comic'>
        {navLinks.map((link) => {
          return (
            <Link
              className='!font-bold !text-lg hidden text-neutral-800 transition-colors duration-200 hover:text-neutral-500 active:text-neutral-800 md:block'
              href={link.href}
              key={link.key}
            >
              {link.label}
            </Link>
          );
        })}
        <SignIn />
      </div>
    </div>
  );
};
