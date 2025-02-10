import { Loader2 } from 'lucide-react';
import React from 'react';

const LoadingPage = () => {
  return (
    <div className='min-h-screen bg-default flex flex-col items-center justify-center gap-4 md:gap-2'>
      <Loader2 className='h-8 w-8 text-primary animate-spin' />
      <p className='text-text-emphasis text-lg text-center px-12'>
        Updating organizer&apos;s latest schedules. Please wait a moment...
      </p>
    </div>
  );
};

export default LoadingPage;
