import { format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import CalendarStyleTabs from '@/components/common/CalendarStyleTabs';
import OverlaySwitch from '@/components/common/OverlaySwitch';

import { getWeekRange } from '@/util/date';

import { CalendarViewType } from '@/types/calendar';

interface HeaderProps {
  view: CalendarViewType;
  onChange: (view: CalendarViewType) => void;
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  showGuestCalendar: boolean;
  setShowGuestCalendar: (show: boolean) => void;
}

export default function Header({
  view,
  onChange,
  currentDate,
  setCurrentDate,
  showGuestCalendar,
  setShowGuestCalendar,
}: HeaderProps) {
  const [weekDays, setWeekDays] = useState<Date[]>([]);

  // Set week days based on current date
  useEffect(() => {
    setWeekDays(getWeekRange(currentDate));
  }, [currentDate]);

  const handlePrevWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const formatDateRange = (start: Date, end: Date) => {
    const startFormat = start.getMonth() === end.getMonth() ? 'MMM d' : 'MMM d';
    const endFormat = start.getMonth() === end.getMonth() ? 'd' : 'MMM d';

    return (
      <h2>
        <span className='text-text-default text-base'>
          {format(start, startFormat)}-{format(end, endFormat)}
        </span>
        <span className='text-text-subtle text-base'>
          {format(end, ', yyyy')}
        </span>
      </h2>
    );
  };

  return (
    <header className='py-4 px-6 flex flex-row-reverse'>
      <div className='flex flex-row space-x-4'>
        <OverlaySwitch
          showGuestCalendar={showGuestCalendar}
          setShowGuestCalendar={setShowGuestCalendar}
        />
        <CalendarStyleTabs currentView={view} onChange={onChange} />
      </div>

      {view === 'weekly' && (
        <div className='flex-1 flex items-center'>
          <div className='flex flex-row items-center space-x-4'>
            {weekDays[0] &&
              weekDays[6] &&
              formatDateRange(weekDays[0], weekDays[6])}
            <div className='flex'>
              <button
                onClick={handlePrevWeek}
                className='w-9 h-9 flex items-center justify-center rounded-l hover:bg-emphasis'
              >
                <ChevronLeft className='w-4 h-4 text-text-emphasis' />
              </button>
              <button
                onClick={handleNextWeek}
                className='w-9 h-9 flex items-center justify-center rounded-r hover:bg-emphasis'
              >
                <ChevronRight className='w-4 h-4 text-text-emphasis' />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
