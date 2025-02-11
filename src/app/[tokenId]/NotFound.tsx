// app/[tokenId]/NotFound.tsx

import Link from 'next/link';

import { AIVEE_HOME_URL } from '@/config/config';

export default function NotFound() {
  return (
    <div className='min-h-screen bg-default flex flex-col items-center justify-center'>
      <div className='flex flex-col items-center text-center px-8'>
        <span className='text-base md:text-xl font-bold text-white mb-4'>
          ERROR 404
        </span>

        <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4'>
          This page does not exist.
        </h1>

        <p className='text-xs md:text-base font-semibold text-white mb-6'>
          Check for spelling mistakes or go back to the home.
        </p>

        <Link
          href={AIVEE_HOME_URL}
          className='text-sm md:text-base font-semibold'
        >
          <span className='text-white'>Go back </span>
          <span className='text-purple-500'>Aivee</span>
          <span className='text-white'> home</span>
        </Link>
      </div>
    </div>
  );
}
