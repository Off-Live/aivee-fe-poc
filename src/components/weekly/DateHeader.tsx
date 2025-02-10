'use client';
// components/weekly/DateHeader.tsx

import { format } from 'date-fns';
import React from 'react';

interface DateHeaderProps {
  date: Date;
}

export function DateHeader({ date }: DateHeaderProps) {
  return (
    <div className='flex flex-row items-center justify-center space-x-1'>
      <span className='text-sm text-text-subtle'>
        {format(date, 'EEE').toUpperCase()}
      </span>
      <span className='text-sm text-text-subtle'>{format(date, 'd')}</span>
    </div>
  );
}
