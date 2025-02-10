// components/MonthlyView.tsx

import InfoPanel from "@/components/common/InfoPanel";
import CalendarView from "@/components/common/CalendarView";
import TimeSlots from "@/components/monthly/TimeSlots";
import AiveeLogoLink from "@/components/common/AiveeLogoLink";
import { CalendarEvent } from "@/util/calendar";

interface CalendarViewProps {
  events: CalendarEvent[];
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  selectSlot: (start: Date, end: Date) => void;
}

export default function MonthlyView({
  events,
  selectedDate,
  onDateChange,
  selectSlot,
}: CalendarViewProps) {
  return (
    <div className="w-full max-w-full flex flex-col items-center">
      <div className="w-full max-w-5xl md:h-[480px] bg-subtle flex flex-col md:flex-row md:rounded-lg md:border border-border overflow-hidden">
        <div className="md:w-[240px] lg:w-[280px] shrink-0 md:border-r border-border">
          <InfoPanel />
        </div>
        <div className="grow md:border-r border-border md:w-max-[640px]">
          <CalendarView
            selectedDate={selectedDate}
            onDateChange={onDateChange}
          />
        </div>
        <div className="md:w-[240px] lg:w-[280px] shrink-0">
          <TimeSlots
            events={events}
            selectedDate={selectedDate}
            selectSlot={selectSlot}
          />
        </div>
      </div>

      <AiveeLogoLink />
    </div>
  );
}
