// components/WeeklyView.tsx
'use client';

import { useTimezone } from '@/context/TimezoneContext';
import { TimeSlot,checkAvailability } from '@/util/availability';
import { CalendarEvent } from '@/util/calendar';
import React, { useEffect, useState } from 'react';


function getWeekRange(date: Date) {
  const day = date.getDay(); 
  const sunday = new Date(date);
  sunday.setDate(sunday.getDate() - day); 
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(sunday);
    d.setDate(d.getDate() + i);
    return d;
  });
  return weekDays;
}


type WeeklyViewProps = {
  events:CalendarEvent[];
  currentDate:Date;
  availability:TimeSlot[];
  setCurrentDate:(date: Date) => void;
  selectSlot:(start:Date, end:Date) => void;
};

const formatTime = (time: number) => {
  const adjustedTime = ((time % 24) + 24) % 24; // Handle negative/over 24h
  const hours = Math.floor(adjustedTime);
  const minutes = (adjustedTime % 1) * 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

export default function WeeklyView( {events, currentDate,availability, setCurrentDate, selectSlot}: WeeklyViewProps ) {
  const { selectedTimezone, setSelectedTimezone } = useTimezone();
  const [weekDays, setWeekDays] = useState<Date[]>([]);

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

  const handleCellClick = (day: Date, time: number) => {
    const hours = Math.floor(time);
    const minutes = (time % 1) * 60;
    
    const start = new Date(day);
    start.setHours(hours, minutes, 0, 0);
    
    const end = new Date(start);
    end.setMinutes(minutes + 30);
  
    selectSlot(start, end)
  };

  // Date range string (e.g., 1/14 - 1/20, 2025)
  const start = weekDays[0];
  const end = weekDays[6];
  const rangeString =
    start && end
      ? `${start.getMonth() + 1}/${start.getDate()} - ${end.getMonth() + 1}/${end.getDate()}, ${start.getFullYear()}`
      : '';

  
  const times = Array.from({ length: 50 }, (_, i) => i*0.5 - 0.5); 

  // (Optional) Calculate current time position in pixels within the grid
  // This is just for demo (real-time calculation needed)
  const [currentLinePos, setCurrentLinePos] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      if (
        now.getFullYear() === currentDate.getFullYear() &&
        now.getMonth() === currentDate.getMonth()
      ) {
        // If same month/year, calculate actual position (simplified example)
        const hour = now.getHours();
        const minute = now.getMinutes();
        // If one cell (one hour) is 60px, we can calculate y position as hour*60 + minute
        const pos = hour * 60 + minute;
        setCurrentLinePos(pos);
      } else {
        setCurrentLinePos(null);
      }
    }, 60 * 1000); // Update every minute
    return () => clearInterval(timer);
  }, [currentDate]);


  // ------------------------------------------
  // Helper function to display events in weekly view
  // ------------------------------------------
  const getEventPositionStyle = (event: CalendarEvent) => {
    const startDate = new Date(event.start.dateTime);
    const endDate = new Date(event.end.dateTime);

    return getTimeSlotPositionStyle(startDate, endDate)
  };

  const getTimeSlotPositionStyle = (startDate:Date, endDate:Date) => {

    // 1) Check if event is within this week's range
    //    If startDate or endDate is outside the week range, ignore for now (simplified).
    //    For more accurate handling, we could add logic to calculate overlapping portions.
    const dayIndex = weekDays.findIndex(
      (d) =>
        d.getFullYear() === startDate.getFullYear() &&
        d.getMonth() === startDate.getMonth() &&
        d.getDate() === startDate.getDate()
    );
    // Don't display events not in this week
    if (dayIndex === -1) return { display: 'none' };

    // 2) Horizontal position for the day = left offset(80px) + dayIndex * cell width(150px)
    const left = 80 + dayIndex * 150;

    // 3) Event start~end (calculate in minutes → convert to px)
    //    Calculate minutes from start of day and use as top/height
    const startMinutes = startDate.getHours() * 60 + startDate.getMinutes();
    const endMinutes = endDate.getHours() * 60 + endDate.getMinutes();
    const top = startMinutes + 30; 
    const height = Math.max(endMinutes - startMinutes, 15)-5; 
    // Show at least 15px (for very short events)

    return {
      position: 'absolute' as const,
      top: `${top}px`,
      left: `${left}px`,
      width: '145px',
      height: `${height}px`,
    };
  }
  


  return (
    <div>
      {/* Weekly View Header */}
      <div className="weekly-header">
        <div className="weekly-nav">
          <button onClick={handlePrevWeek}>{`<`}</button>
        </div>
        <h2>{rangeString}</h2>
        <div className="weekly-nav">
          <button onClick={handleNextWeek}>{`>`}</button>
        </div>
      </div>

      {/* Weekly Grid */}
      <div className="weekly-grid-container" style={{ position: 'relative' }}>
        {/* Day Header */}
        <div className="weekly-grid-header">
          <div></div> {/* Empty top-left cell (time axis space) */}
          {weekDays.map((d) => {
            const dayLabel = `${d.getMonth() + 1}/${d.getDate()}`;
            const dow = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][d.getDay()];
            return (
              <div key={dayLabel}>
                {dayLabel} ({dow})
              </div>
            );
          })}
        </div>

        {/* Actual time * 7 days grid */}
        <div className="weekly-grid-body">
          {/* Vertical axis: time */}
          {times.map((t) => (
            <React.Fragment key={`row-${t}`}>
              {/* Time cell */}
              <div className="weekly-time-cell">
              <span className="time-label">
                {t % 1 === 0 && `${Math.floor(t).toString().padStart(2, '0')}:00`}
              </span>
              </div>

              {/* 7 days x 1 hour each */}
              {weekDays.map((day, idx) => {
                const isAvailable = checkAvailability(day, t, availability,selectedTimezone)
                const startTime = t;
                const endTime = t + 0.5;
                return (
                  <div
                    key={`cell-${t}-${idx}`}
                    className={`weekly-cell ${t%1===0 ? '':'hour-line'} ${isAvailable ? '' : 'blocked'}`}
                    data-time={`${formatTime(startTime)} - ${formatTime(endTime)}`}
                    onClick={isAvailable ? () => handleCellClick(day, t) : undefined} 
                  >
                    {/* Add content (events, reservations) here if needed */}
                  </div>
                );
              })}
            </React.Fragment>
          ))}

          {/* (Important) Iterate through events and display with absolute positioning */}
          {events.map((event) => {
            const style = getEventPositionStyle(event);
            return (
              <div
                key={event.id}
                className="calendar-event"
                style={style}
                title={event.summary}
              >
                <div className="event-content">{event.summary}</div>
              </div>
            );
          })}

        {/* Current time line (demo) */}
        {currentLinePos !== null && (
          <div
            className="current-time-line"
            style={{ top: currentLinePos + 'px' }}
          />
        )}
        </div>

        
      </div>
    </div>
  );
}