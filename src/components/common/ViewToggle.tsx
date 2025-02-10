// components/ViewToggle.tsx
"use client";

import React from "react";
import { FaCalendarAlt, FaTh } from "react-icons/fa";
import { CalendarViewType } from "@/types/calendar";

type Props = {
  currentView: CalendarViewType;
  onChange: (view: CalendarViewType) => void;
};

export default function ViewToggle({ currentView, onChange }: Props) {
  return (
    <div className="hidden sm:flex gap-1 border border-border rounded-lg bg-subtle p-1">
      <button
        className={`flex items-center justify-center w-7 h-7 rounded-md transition-colors ${
          currentView === "monthly"
            ? "bg-emphasis text-white"
            : "text-text-subtle hover:bg-emphasis/50"
        }`}
        onClick={() => onChange("monthly" as CalendarViewType)}
      >
        <FaCalendarAlt size={12} />
      </button>

      <button
        className={`flex items-center justify-center w-7 h-7 rounded-md transition-colors ${
          currentView === "weekly"
            ? "bg-emphasis text-white"
            : "text-text-subtle hover:bg-emphasis/50"
        }`}
        onClick={() => onChange("weekly" as CalendarViewType)}
      >
        <FaTh size={12} />
      </button>
    </div>
  );
}
