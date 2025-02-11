'use client';

import Link from 'next/link';

import { AIVEE_HOME_URL } from '@/config/config';

export default function LandingPage() {
  return (
    <div className='min-h-screen bg-default flex flex-col items-center justify-center gap-4'>
      <div className='flex flex-col items-center text-center pt-16 md:pt-24'>
        <span className='text-xs font-bold text-white mb-4'>CHECK URL</span>

        <h1 className='text-4xl font-bold text-white mb-4'>
          Please check your booking URL
        </h1>

        <p className='text-base font-semibold text-white mb-8'>
          Make sure you have the correct booking link or go back to the home.
        </p>

        <Link href={AIVEE_HOME_URL} className='text-base font-semibold'>
          <span className='text-white'>Go back </span>
          <span className='text-purple-500'>Aivee</span>
          <span className='text-white'> home</span>
        </Link>
      </div>
    </div>
  );
}
