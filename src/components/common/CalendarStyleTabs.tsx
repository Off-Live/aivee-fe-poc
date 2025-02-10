"use client";

import React from "react";
import { FaCalendarAlt, FaTh } from "react-icons/fa";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarViewType } from "@/types/calendar";

type Props = {
  currentView: CalendarViewType;
  onChange: (view: CalendarViewType) => void;
};

export default function CalendarStyleTabs({ currentView, onChange }: Props) {
  const handleValueChange = (value: string) => {
    onChange(value as CalendarViewType);
  };

  return (
    <div className="hidden sm:block p-1.5">
      <Tabs value={currentView} onValueChange={handleValueChange}>
        <TabsList className="h-10 bg-muted">
          <TabsTrigger
            value="monthly"
            className="h-8 w-9 px-0 data-[state=active]:bg-emphasis"
          >
            <FaCalendarAlt size={14} />
          </TabsTrigger>
          <TabsTrigger
            value="weekly"
            className="h-8 w-9 px-0 data-[state=active]:bg-emphasis"
          >
            <FaTh size={14} />
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
