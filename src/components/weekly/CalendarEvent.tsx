"use client";
// components/weekly/CalendarEvent.tsx

import { CalendarEvent } from "@/util/calendar";
import { CSSProperties } from "react";

interface CalendarEventProps {
  event: CalendarEvent;
  style: CSSProperties;
}

export function CalendarEventComponent({ event, style }: CalendarEventProps) {
  return (
    <div
      className="absolute bg-main bg-opacity-10 text-primary-foreground rounded px-2 py-1 overflow-hidden"
      style={style}
    >
      <div className="text-xs font-medium truncate">{event.summary}</div>
    </div>
  );
}
