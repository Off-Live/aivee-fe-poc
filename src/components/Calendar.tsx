// components/Calendar.tsx
'use client';

import { useAvailability } from '@/context/AvailabilityContext';
import { useTimezone } from '@/context/TimezoneContext';
import { hasAvailabilityOnDate, TimeSlot } from '@/util/availability';
import React, { useState } from 'react';

type CalendarProps = {
  selectedDate: Date;              
  onDateChange: (date: Date) => void; 
  width?: number;
};

export default function Calendar({ selectedDate, onDateChange, width }: CalendarProps) {
  const monthNames = [
    'January',
    'February', 
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  const { selectedTimezone } = useTimezone();
  const { availabilityData } = useAvailability();
  const [year, setYear] = useState(selectedDate.getFullYear());
  const [month, setMonth] = useState(selectedDate.getMonth()); // 0=Jan, 1=Feb, ...

  const firstDayOfMonth = new Date(year, month, 1).getDay(); 
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // When previous month button is clicked
  const handlePrevMonth = () => {
    // When going back from January (month=0), move to December of previous year
    if (month === 0) {
      setYear(year - 1);
      setMonth(11);
    } else {
      setMonth(month - 1);
    }
  };

  // When next month button is clicked
  const handleNextMonth = () => {
    // When going forward from December (month=11), move to January of next year
    if (month === 11) {
      setYear(year + 1);
      setMonth(0);
    } else {
      setMonth(month + 1);
    }
  };

  const handleDayClick = (day: number) => {
    const newDate = new Date(year, month, day);
    onDateChange(newDate);
  };

  return (
    <div className="calendar" style={{width:width}}>
      {/* Calendar Header Section */}
      <div className="calendarHeader">
        <button className="dark-button" onClick={handlePrevMonth} style={{ cursor: 'pointer' }}>
          &larr;  {/* Left Arrow (←) */}
        </button>
        <h3>
        {monthNames[month]} {year} 
        </h3>
        <button className="dark-button" onClick={handleNextMonth} style={{ cursor: 'pointer' }}>
          &rarr;  {/* Right Arrow (→) */}
        </button>
      </div>

      {/* Days of Week Header */}
      <div className="calendarGrid" style={{ marginBottom: '8px' }}>
        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((dow) => (
          <div key={dow} style={{ textAlign: 'center', fontWeight: 'bold' }}>
            {dow}
          </div>
        ))}
      </div>

      {/* Date Cells */}
      <div className="calendarGrid">
        {/* Fill empty cells before the 1st day in the first week */}
        {Array.from({ length: firstDayOfMonth }).map((_, idx) => (
          <div key={`empty-${idx}`} />
        ))}

        {/* Fill actual dates */}
        {daysArray.map((day) => {
          const currentDate = new Date(year, month, day);
          // Compare with selected date
          const isSelected =
            currentDate.toDateString() === selectedDate.toDateString();
          const isAvailable = 
            hasAvailabilityOnDate(currentDate, availabilityData.availabilities,selectedTimezone)
          return (
            <div
              key={day}
              className={`calendarDay ${isSelected ? 'selected' : isAvailable? 'valid' : ''}`}
              onClick={() => handleDayClick(day)}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}