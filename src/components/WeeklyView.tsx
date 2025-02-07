// components/WeeklyView.tsx
'use client';

import { useAvailability } from '@/context/AvailabilityContext';
import { useTimezone } from '@/context/TimezoneContext';
import { TimeSlot, checkAvailability, getAvailableTimeSlotsForDate } from '@/util/availability';
import { CalendarEvent } from '@/util/calendar';
import React, { useEffect, useState } from 'react';
import moment from 'moment-timezone';


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
  events: CalendarEvent[];
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  selectSlot: (start: Date, end: Date) => void;
};

const formatTime = (time: number) => {
  const adjustedTime = ((time % 24) + 24) % 24; // Handle negative/over 24h
  const hours = Math.floor(adjustedTime);
  const minutes = (adjustedTime % 1) * 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};


  


export default function WeeklyView({ events, currentDate, setCurrentDate, selectSlot }: WeeklyViewProps) {
  const { selectedTimezone } = useTimezone();
  const { availabilityData } = useAvailability();

  const [slotsWithinDay, setSlotsWithinDay] = useState<TimeSlot[]>([])
  const [weekDays, setWeekDays] = useState<Date[]>([]);

  useEffect(() => {
    setWeekDays(getWeekRange(currentDate));
  }, [currentDate]);

  useEffect(() => {
    const slots:TimeSlot[] = []
    availabilityData.availabilities.forEach((slot)=>{
      const startMoment = moment.tz(slot.startDate, selectedTimezone)
      const endMoment = moment.tz(slot.endDate, selectedTimezone)
      
      const isWithinDay = (startMoment.year() === endMoment.year()) &&
        (startMoment.month() === endMoment.month()) &&
        (startMoment.date() === endMoment.date()) 
        
      if (isWithinDay){
        slots.push(slot)
      }else{
        const splitMoment = moment.tz(
          {
            year: endMoment.year(),
            month: endMoment.month(), 
            day: endMoment.date(),
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0,
          },selectedTimezone)

        slots.push({startDate:startMoment.toDate(), endDate:splitMoment.toDate()});
        slots.push({startDate:splitMoment.toDate(), endDate:endMoment.toDate()});
        
      }
      
    })
    setSlotsWithinDay(slots)
    
  }, [selectedTimezone, availabilityData, weekDays])

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

  const formatSlotTime = (date: Date): string => {
    // Convert the date to the selected timezone
    const timeInZone = moment(date).tz(selectedTimezone);
    const hour = timeInZone.hour()
    const minute = timeInZone.minute()
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  };

  // Date range string (e.g., 1/14 - 1/20, 2025)
  const start = weekDays[0];
  const end = weekDays[6];
  const rangeString =
    start && end
      ? `${start.getMonth() + 1}/${start.getDate()} - ${end.getMonth() + 1}/${end.getDate()}, ${start.getFullYear()}`
      : '';


  const times = Array.from({ length: 50 }, (_, i) => i * 0.5 - 0.5);

  const [currentLinePos, setCurrentLinePos] = useState<number | null>(null);

  useEffect(() => {
    
    const updatePosition = () => {
      const now = new Date();
      if (
        now.getFullYear() === currentDate.getFullYear() &&
        now.getMonth() === currentDate.getMonth()
      ) {
        const hour = now.getHours();
        const minute = now.getMinutes();
        const pos = hour * 60 + minute + 30;
        setCurrentLinePos(pos);
      } else {
        setCurrentLinePos(null);
      }
    };
    updatePosition();
    const timer = setInterval(updatePosition, 60 * 1000);
    return () => clearInterval(timer);
  }, [currentDate]);


  // ------------------------------------------
  // Helper function to display events in weekly view
  // ------------------------------------------
  const getEventPositionStyle = (event: CalendarEvent) => {
    const startDate = new Date(event.start.dateTime);
    const endDate = new Date(event.end.dateTime);

    return getTimeSlotPositionStyle(startDate, endDate, 5)
  };

  const getTimeSlotPositionStyle = (startDate: Date, endDate: Date, offset: number) => {

    const startDateMoment = moment.tz(startDate, selectedTimezone)
    const endDateMoment = moment.tz(endDate, selectedTimezone)

    // 1) Check if event is within this week's range
    //    If startDate or endDate is outside the week range, ignore for now (simplified).
    //    For more accurate handling, we could add logic to calculate overlapping portions.

    const dayIndex = weekDays.findIndex(
      (d) =>
        d.getFullYear() === startDateMoment.year() &&
        d.getMonth() === startDateMoment.month() &&
        d.getDate() === startDateMoment.date()
    );
    // Don't display events not in this week
    if (dayIndex === -1) return { display: 'none' };

    // 2) Horizontal position for the day = left offset(80px) + dayIndex * cell width(150px)
    const left = 60 + dayIndex * 150;

    // 3) Event start~end (calculate in minutes → convert to px)
    //    Calculate minutes from start of day and use as top/height
    const startMinutes = startDateMoment.hour() * 60 + startDateMoment.minute();
    let endMinutes = endDateMoment.hour() * 60 + endDateMoment.minute();

    //handle 00:00
    if (endMinutes==0) {endMinutes = 1440}

    const top = startMinutes + 30;
    const height = Math.max(endMinutes - startMinutes, 15) - 5;
    // Show at least 15px (for very short events)

    return {
      position: 'absolute' as const,
      top: `${top}px`,
      left: `${left}px`,
      width: `${150 - offset}px`,
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
            const dow = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][d.getDay()];
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
                const startTime = t;
                const endTime = t + 0.5;
                return (
                  <div
                    key={`cell-${t}-${idx}`}
                    className={`weekly-cell ${t % 1 === 0 ? '' : 'hour-line'} blocked`}
                    data-time={`${formatTime(startTime)} - ${formatTime(endTime)}`}
                  >
                  
                  </div>
                );
              })}
            </React.Fragment>
          ))}

          {slotsWithinDay.map((slot, idx) => {
            const style = getTimeSlotPositionStyle(slot.startDate, slot.endDate, 0);
            return <div
              key={`availability-${idx}`}
              className="available-slot"
              style={style}
            />
          })}

          {weekDays.map((day, idx) => {
            const slots = getAvailableTimeSlotsForDate(day,slotsWithinDay,availabilityData.slotDuration,selectedTimezone)
            
            return <>
              {slots.map((slot,idx2)=>{
                const style = getTimeSlotPositionStyle(slot.startDate, slot.endDate, 0);
              return <div
                key={`splitted-${idx}-${idx2}`}
                data-time={`${formatSlotTime(slot.startDate)} - ${formatSlotTime(slot.endDate)}`}
                className="splitted-slot"
                style={style}
                onClick={()=>selectSlot(slot.startDate, slot.endDate)} 
              />
              })}
            </>
            
          })}


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