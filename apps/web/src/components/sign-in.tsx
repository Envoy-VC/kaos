import { Button } from '@kaos/ui/components/button';
import { UserIcon } from 'lucide-react';

export const SignIn = () => {
  return (
    <Button
      variant='secondary'
      className='!rounded-full size-10'
    >
      <UserIcon className='size-6' />
    </Button>
  );
};
