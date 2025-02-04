// components/TimeSlots.tsx

import { useTimezone } from '@/context/TimezoneContext';
import { checkAvailability, TimeSlot } from '@/util/availability';
import { useEffect, useState } from 'react';


type TimeSlotsProps = {
  selectedDate: Date;
  availability: TimeSlot[];
  selectSlot:(start:Date, end:Date) => void;
};

export default function TimeSlots({ selectedDate, availability, selectSlot }: TimeSlotsProps) {
  const { selectedTimezone, setSelectedTimezone } = useTimezone();
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const [is24Hour, setIs24Hour] = useState(true);

  const times = Array.from({ length: 48 }, (_, i) => i * 0.5);

  
  const handleTimeClick = (time: number) => {
    const hours = Math.floor(time);
    const minutes = (time % 1) * 60;
    
    const start = new Date(selectedDate);
    start.setHours(hours, minutes, 0, 0);
    
    const end = new Date(start);
    end.setMinutes(minutes + 30);
    selectSlot(start, end)
  };

  const formatTime = (time: number): string => {
    const hour = Math.floor(time);
    const minute = (time - hour) === 0.5 ? 30 : 0;
    if (is24Hour) {
      // 24h form
      return `${hour.toString().padStart(2, '0')}:${minute === 0 ? '00' : '30'}`;
    } else {
      // 12h form
      const suffix = hour >= 12 ? 'PM' : 'AM';
      const twelveHour = hour > 12 ? hour - 12 : hour;
      return `${twelveHour}:${minute === 0 ? '00' : '30'} ${suffix}`;
    }
  };

  return (
    <div className="times">
        <h3 style = {{textAlign:'left'}}>{`${selectedDate.getMonth() + 1}/${selectedDate.getDate()} ${weekdays[selectedDate.getDay()]}`}</h3>
        
      
      {times.map((time, idx) => {
        if (checkAvailability(selectedDate, time, availability,selectedTimezone)) {
          return (<div
            key={idx}
            className="timeItem"
            onClick={() => handleTimeClick(time)}
          >
            {formatTime(time)}
          </div>)
        } else {
          return null
        }

      })}

    </div>
  );
}

