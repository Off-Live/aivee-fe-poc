// components/TimeSlots.tsx

import { useCallback, useState } from 'react';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { useAvailability } from '@/contexts/AvailabilityContext';
import { useTimezone } from '@/contexts/TimezoneContext';
import { getAvailableTimeSlotsForDate } from '@/util/availability';
import { CalendarEvent } from '@/util/calendar';

type TimeSlot = {
  startDate: Date;
  endDate: Date;
};

type TimeSlotsProps = {
  events: CalendarEvent[];
  selectedDate: Date;
  selectSlot: (start: Date, end: Date) => void;
};

export default function TimeSlots({
  events,
  selectedDate,
  selectSlot,
}: TimeSlotsProps) {
  const { availabilityData } = useAvailability();
  const { selectedTimezone } = useTimezone();

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const [timeFormat, setTimeFormat] = useState<'12h' | '24h'>('12h');

  const formatTime = (date: Date): string => {
    if (timeFormat === '24h') {
      const formatter = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: selectedTimezone,
      });
      return formatter.format(date);
    } else {
      const formatter = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: selectedTimezone,
      });
      // Convert AM/PM to lowercase
      return formatter.format(date).toLowerCase();
    }
  };

  const availableSlots = getAvailableTimeSlotsForDate(
    selectedDate,
    availabilityData.availabilities,
    availabilityData.slotDuration,
    selectedTimezone,
  );

  const isSlotAvailable = useCallback(
    (slot: TimeSlot): boolean => {
      if (!events || events.length === 0) return false;

      return !events.some((event) => {
        if (!event.start?.dateTime || !event.end?.dateTime) {
          return false;
        }
        const eventStart = new Date(event.start.dateTime);
        const eventEnd = new Date(event.end.dateTime);
        const passed = !(
          slot.endDate <= eventStart || slot.startDate >= eventEnd
        );
        return passed;
      });
    },
    [events],
  );

  return (
    <div className='w-full md:w-[240px] lg:w-[280px] p-5 bg-subtle'>
      <div className='flex justify-between items-center mb-4'>
        <div className='flex items-baseline gap-1'>
          <span className='text-text-emphasis text-lg font-semibold'>
            {weekdays[selectedDate.getDay()]}
          </span>
          <span className='text-text-subtle text-md'>
            {selectedDate.getDate()}
          </span>
        </div>

        <Tabs
          defaultValue='12h'
          value={timeFormat}
          onValueChange={(value) => setTimeFormat(value as '12h' | '24h')}
          className='w-[120px]'
        >
          <TabsList className='grid w-full grid-cols-2 bg-muted'>
            <TabsTrigger
              value='12h'
              className='data-[state=active]:bg-emphasis data-[state=active]:text-text-emphasis'
            >
              12h
            </TabsTrigger>
            <TabsTrigger
              value='24h'
              className='data-[state=active]:bg-emphasis data-[state=active]:text-text-emphasis'
            >
              24h
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className='flex flex-col gap-2'>
        {availableSlots.map((slot, idx) => {
          const isAvailable = isSlotAvailable(slot);

          return (
            <button
              key={idx}
              onClick={() => selectSlot(slot.startDate, slot.endDate)}
              className='w-full h-9 bg-default rounded-md hover:bg-emphasis transition-colors duration-200 text-text-emphasis text-sm font-medium relative'
            >
              <div className='flex items-center justify-center w-full gap-2'>
                {isAvailable && (
                  <div className='w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0' />
                )}
                <span>{formatTime(slot.startDate)}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
