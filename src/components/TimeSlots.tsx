// components/TimeSlots.tsx
import React, { useState } from 'react';

type TimeSlotsProps = {
  selectedDate: Date;
};

export default function TimeSlots({ selectedDate }: TimeSlotsProps) {
  const [is24Hour, setIs24Hour] = useState(true);

  // For example , 15:00 ~ 19:00, 30min for each slot
  const times = [
    15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19,
  ];

  const toggleFormat = () => {
    setIs24Hour((prev) => !prev);
  };

  const handleTimeClick = (time: number) => {
    const hour = Math.floor(time);
    const minute = (time - hour) === 0.5 ? 30 : 0;
    console.log(`Selected Time: ${selectedDate.toDateString()} ${hour}:${minute === 0 ? '00' : '30'}`);
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
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
        <h3>{`${selectedDate.getMonth() + 1}/${selectedDate.getDate()}`}</h3>
        <button onClick={toggleFormat}>
          {is24Hour ? '12h' : '24h'}
        </button>
      </div>
      {times.map((time, idx) => (
        <div
          key={idx}
          className="timeItem"
          onClick={() => handleTimeClick(time)}
        >
          {formatTime(time)}
        </div>
      ))}
    </div>
  );
}
