// components/CalendarView.tsx
"use client";

import { useAvailability } from "@/context/AvailabilityContext";
import { useTimezone } from "@/context/TimezoneContext";
import { hasAvailabilityOnDate } from "@/util/availability";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type CalendarProps = {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
};

export default function CalendarView({
  selectedDate,
  onDateChange,
}: CalendarProps) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const { selectedTimezone } = useTimezone();
  const { availabilityData } = useAvailability();
  const [year, setYear] = useState(selectedDate.getFullYear());
  const [month, setMonth] = useState(selectedDate.getMonth()); // 0=Jan, 1=Feb, ...

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const today = new Date();
  const isToday = (day: number) => {
    return (
      today.getDate() === day &&
      today.getMonth() === month &&
      today.getFullYear() === year
    );
  };

  const handlePrevMonth = () => {
    if (month === 0) {
      setYear(year - 1);
      setMonth(11);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNextMonth = () => {
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
    <div className="w-full md:p-5 p-5 pb-10">
      {/* CalendarView Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-baseline gap-1">
          <span className="text-text-default text-lg font-medium">
            {monthNames[month]}
          </span>
          <span className="text-text-subtle text-md">{year}</span>
        </div>

        <div className="flex">
          <button
            onClick={handlePrevMonth}
            className="w-9 h-9 flex items-center justify-center rounded-l hover:bg-emphasis"
          >
            <ChevronLeft className="w-4 h-4 text-text-emphasis" />
          </button>
          <button
            onClick={handleNextMonth}
            className="w-9 h-9 flex items-center justify-center rounded-r hover:bg-emphasis"
          >
            <ChevronRight className="w-4 h-4 text-text-emphasis" />
          </button>
        </div>
      </div>

      {/* Days of Week Header */}
      <div className="grid grid-cols-7 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((dow) => (
          <div
            key={dow}
            className="text-center text-xs font-medium text-text-default"
          >
            {dow.toUpperCase()}
          </div>
        ))}
      </div>

      {/* Date Cells */}
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDayOfMonth }).map((_, idx) => (
          <div key={`empty-${idx}`} className="aspect-square" />
        ))}

        {daysArray.map((day) => {
          const currentDate = new Date(year, month, day);
          const isSelected =
            currentDate.toDateString() === selectedDate.toDateString();
          const isAvailable = hasAvailabilityOnDate(
            currentDate,
            availabilityData.availabilities,
            selectedTimezone,
          );

          return (
            <div
              key={day}
              onClick={() => (isAvailable ? handleDayClick(day) : undefined)}
              className={`
                aspect-square flex items-center justify-center text-sm cursor-pointer rounded-lg relative
                ${isSelected && "bg-inverted text-text-inverted font-semibold"}
                ${isAvailable && !isSelected && "bg-emphasis text-text-default hover:border-2 hover:border-border-focus"}
                ${!isAvailable && "text-text-subtle"}
              `}
            >
              <span>{day}</span>
              {isToday(day) && (
                <div
                  className={`absolute w-1 h-1 rounded-full ${isSelected ? "bg-text-inverted" : "bg-text-emphasis"}`}
                  style={{ bottom: "20%" }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
