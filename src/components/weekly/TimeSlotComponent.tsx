'use client';
// components/weekly/TimeSlotComponent.tsx

import moment from 'moment-timezone';
import { CSSProperties, MouseEvent } from 'react';

import { useTimezone } from '@/contexts/TimezoneContext';
import { TimeSlot } from '@/util/availability';

interface TimeSlotProps {
  slot: TimeSlot;
  style: CSSProperties;
  onClick?: () => void;
  isBlocked?: boolean;
}

export function TimeSlotComponent({
  slot,
  style,
  onClick,
  isBlocked,
}: TimeSlotProps) {
  const { selectedTimezone } = useTimezone();

  const handleClick = (_: MouseEvent<HTMLDivElement>) => {
    if (!isBlocked && onClick) {
      onClick();
    }
  };

  const timeString = moment
    .tz(slot.startDate, selectedTimezone)
    .format('h:mm a');

  return (
    <div
      className={`absolute group ${
        isBlocked
          ? 'bg-subtle/50 cursor-not-allowed [background-image:repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,.1)_10px,rgba(0,0,0,.1)_20px)]'
          : 'bg-default cursor-pointer'
      }`}
      style={style}
      onClick={handleClick}
    >
      {!isBlocked && (
        <div
          className='opacity-0 group-hover:opacity-100 absolute inset-0 bg-white/90 dark:bg-white/90
                     rounded-md transition-all duration-200 ease-in-out flex items-center justify-center
                     text-sm font-medium text-gray-900'
        >
          {timeString}
        </div>
      )}
    </div>
  );
}
