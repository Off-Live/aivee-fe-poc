"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useAvailability } from "@/context/AvailabilityContext";
import { useTimezone } from "@/context/TimezoneContext";
import { TimeSlot, getAvailableTimeSlotsForDate } from "@/util/availability";
import { CalendarEvent } from "@/util/calendar";
import { getWeekRange } from "@/util/date";
import { DateHeader } from "./weekly/DateHeader";
import { TimeAxis } from "./weekly/TimeAxis";
import { TimeGrid } from "./weekly/TimeGrid";
import { TimeSlotComponent } from "./weekly/TimeSlotComponent";
import { CalendarEventComponent } from "./weekly/CalendarEvent";
import moment from "moment-timezone";

interface WeeklyViewV3Props {
  events: CalendarEvent[];
  currentDate: Date;
  selectSlot: (start: Date, end: Date) => void;
  showGuestCalendar: boolean;
}

export default function WeeklyView({
  events,
  currentDate,
  selectSlot,
  showGuestCalendar,
}: WeeklyViewV3Props) {
  const { selectedTimezone } = useTimezone();
  const { availabilityData } = useAvailability();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const [weekDays, setWeekDays] = useState<Date[]>([]);
  const [cellWidth, setCellWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(720);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);

  const timeAxisWidth = 60;
  const cellHeight = 60;
  const headerHeight = 40;

  useEffect(() => {
    setWeekDays(getWeekRange(currentDate));
  }, [currentDate]);

  useEffect(() => {
    const updateSize = () => {
      const container = containerRef.current;
      if (container) {
        setContainerHeight(container.offsetHeight - headerHeight);
        const containerWidth = container.offsetWidth;
        const newCellWidth = Math.floor((containerWidth - timeAxisWidth) / 7);
        setCellWidth(newCellWidth);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const now = moment().tz(selectedTimezone);
    const currentMinutes = now.hours() * 60 + now.minutes();
    const scrollPosition = (currentMinutes / 60) * cellHeight;

    const containerHeight = scrollContainer.clientHeight;
    const centerOffset = containerHeight / 2;

    scrollContainer.scrollTop = scrollPosition - centerOffset;
  }, [selectedTimezone, cellHeight]);

  useEffect(() => {
    if (!weekDays.length) return;

    const allSlots: TimeSlot[] = [];
    weekDays.forEach((day) => {
      const slotsForDay = getAvailableTimeSlotsForDate(
        day,
        availabilityData.availabilities,
        availabilityData.slotDuration,
        selectedTimezone,
      );
      allSlots.push(...slotsForDay);
    });
    setAvailableSlots(allSlots);
  }, [weekDays, availabilityData, selectedTimezone]);

  const getSlotPositionStyle = (startDate: Date, endDate: Date) => {
    const startMoment = moment.tz(startDate, selectedTimezone);
    const endMoment = moment.tz(endDate, selectedTimezone);

    const dayIndex = weekDays.findIndex(
      (day) =>
        day.getDate() === startMoment.date() &&
        day.getMonth() === startMoment.month() &&
        day.getFullYear() === startMoment.year(),
    );

    if (dayIndex === -1) return null;

    const startMinutes = startMoment.hours() * 60 + startMoment.minutes();
    const endMinutes = endMoment.hours() * 60 + endMoment.minutes();

    return {
      left: `${dayIndex * cellWidth}px`,
      top: `${(startMinutes / 60 + 0.5) * cellHeight}px`,
      height: `${((endMinutes - startMinutes) / 60) * cellHeight}px`,
      width: `${cellWidth - 1}px`,
    };
  };

  const getEventPositionStyle = (startDate: Date, endDate: Date) => {
    const startMoment = moment.tz(startDate, selectedTimezone);
    const endMoment = moment.tz(endDate, selectedTimezone);

    const dayIndex = weekDays.findIndex(
      (day) =>
        day.getDate() === startMoment.date() &&
        day.getMonth() === startMoment.month() &&
        day.getFullYear() === startMoment.year(),
    );

    if (dayIndex === -1) return null;

    const startMinutes = startMoment.hours() * 60 + startMoment.minutes();
    const endMinutes = endMoment.hours() * 60 + endMoment.minutes();

    return {
      left: `${dayIndex * cellWidth + 3}px`,
      top: `${(startMinutes / 60 + 0.5) * cellHeight}px`,
      height: `${((endMinutes - startMinutes) / 60) * cellHeight}px`,
      width: `${cellWidth - 14}px`,
    };
  };

  const currentTimePos = useMemo(
    () =>
      ((moment().tz(selectedTimezone).hours() * 60 +
        moment().tz(selectedTimezone).minutes() +
        30) /
        60) *
      cellHeight,
    [selectedTimezone],
  );

  const currentTime = useMemo(() => {
    return moment().tz(selectedTimezone).format("h:mma");
  }, [selectedTimezone]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex flex-col bg-default border border-border overflow-hidden"
    >
      <div
        className="flex flex-row py-2 justify-evenly border-b-2"
        style={{ paddingLeft: timeAxisWidth }}
      >
        {weekDays.map((date) => (
          <div key={date.toISOString()} style={{ width: cellWidth }}>
            <DateHeader date={date} />
          </div>
        ))}
      </div>

      {/* Scrollable time grid */}
      <div
        ref={scrollContainerRef}
        className="flex flex-row overflow-y-auto"
        style={{ height: `${containerHeight}px` }}
      >
        <TimeAxis width={timeAxisWidth} cellHeight={cellHeight}>
          <div
            className="absolute right-0 flex items-center pr-0"
            style={{
              top: `${currentTimePos}px`,
              transform: "translateY(-50%)",
            }}
          >
            <span className="text-xs font-semibold bg-main text-text rounded-md px-1 py-0.5">
              {currentTime}
            </span>
          </div>
        </TimeAxis>
        <TimeGrid cellWidth={cellWidth} cellHeight={cellHeight}>
          <div
            className="absolute w-full h-[1.5px] bg-main z-10"
            style={{
              top: `${currentTimePos}px`,
            }}
          />

          {/* Available time slots */}
          {availableSlots.map((slot, index) => {
            const style = getSlotPositionStyle(slot.startDate, slot.endDate);
            if (!style) return null;

            return (
              <TimeSlotComponent
                key={`slot-${index}`}
                slot={slot}
                style={style}
                onClick={() => selectSlot(slot.startDate, slot.endDate)}
              />
            );
          })}

          {/* CalendarView events */}
          {showGuestCalendar &&
            events.map((event) => {
              const style = getEventPositionStyle(
                new Date(event.start.dateTime),
                new Date(event.end.dateTime),
              );
              if (!style) return null;

              return (
                <CalendarEventComponent
                  key={event.id}
                  event={event}
                  style={style}
                />
              );
            })}
        </TimeGrid>
      </div>
    </div>
  );
}
