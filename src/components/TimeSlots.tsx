// components/TimeSlots.tsx

import { useAvailability } from '@/context/AvailabilityContext';
import { useTimezone } from '@/context/TimezoneContext';
import { checkAvailability, getAvailableTimeSlotsForDate, TimeSlot } from '@/util/availability';
import { useEffect, useState } from 'react';
import moment from 'moment-timezone';

type TimeSlotsProps = {
  selectedDate: Date;
  selectSlot:(start:Date, end:Date) => void;
};

export default function TimeSlots({ selectedDate, selectSlot }: TimeSlotsProps) {
  const { selectedTimezone} = useTimezone();
  const { availabilityData} = useAvailability()
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const [is24Hour, setIs24Hour] = useState(true);


  const formatTime = (hour: number, minute: number): string => {
    if (is24Hour) {
      // 24h form
      return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    } else {
      // 12h form
      const suffix = hour >= 12 ? 'PM' : 'AM';
      const twelveHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
      return `${twelveHour}:${minute.toString().padStart(2, '0')} ${suffix}`;
    }
  };

  const formatSlotTime = (date: Date): string => {
    // Convert the date to the selected timezone
    const timeInZone = moment(date).tz(selectedTimezone);
    return formatTime(timeInZone.hour(), timeInZone.minute());
  };
  const slots = getAvailableTimeSlotsForDate(selectedDate,availabilityData.availabilities,availabilityData.slotDuration, selectedTimezone )

  return (
    <div className="times">
        <h3 style = {{textAlign:'left'}}>{`${selectedDate.getMonth() + 1}/${selectedDate.getDate()} ${weekdays[selectedDate.getDay()]}`}</h3>
        
        {slots.map((slot, idx) => (
        <div
          key={idx}
          className="timeItem"
          onClick={() => selectSlot(slot.startDate, slot.endDate)}
        >
          {formatSlotTime(slot.startDate)}
        </div>
      ))}



    </div>
  );
}

