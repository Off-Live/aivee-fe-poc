"use client";
// components/weekly/TimeAxis.tsx

import { format } from "date-fns";
import { ReactNode } from "react";

interface TimeAxisProps {
  width: number;
  cellHeight: number;
  children?: ReactNode;
}

export function TimeAxis({ width, cellHeight, children }: TimeAxisProps) {
  const hours = Array.from({ length: 25 }, (_, i) => i);
  const totalHeight = hours.length * cellHeight;

  const formatHour = (hour: number) => {
    const date = new Date();
    date.setHours(hour, 0, 0, 0);
    return format(date, "ha").toLowerCase();
  };

  return (
    <div
      className="relative border-r-[1px] flex-shrink-0"
      style={{
        width: `${width}px`,
        height: `${totalHeight}px`,
      }}
    >
      {hours.map((hour) => (
        <div
          key={hour}
          className="flex items-center justify-end pr-2"
          style={{ height: `${cellHeight}px` }}
        >
          <span className="text-xs text-text-subtle">{formatHour(hour)}</span>
        </div>
      ))}

      {children}
    </div>
  );
}
