// components/AiveeLogoLink.tsx

import Image from 'next/image';
import Link from 'next/link';

import { AIVEE_HOME_URL } from '@/config/config';

export default function AiveeLogoLink() {
  return (
    <div className='pt-5 pb-10'>
      <Link
        href={AIVEE_HOME_URL}
        target='_blank'
        rel='noopener noreferrer'
        className='inline-flex items-center'
      >
        <div className='flex flex-row text-text-subtle gap-2 text-xl'>
          <Image
            src='/aivee-logo.svg'
            alt='Aivee Logo'
            width={20}
            height={20}
            priority
          />
          aivee.xyz
        </div>
      </Link>
    </div>
  );
}
