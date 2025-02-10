// components/Sidebar.tsx
import { ScrollArea } from "@/components/ui/scroll-area";
import InfoPanel from "./common/InfoPanel";
import CalendarView from "./common/CalendarView";
import AiveeLogoLink from "@/components/common/AiveeLogoLink";

type SidebarProps = {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
};

export default function Sidebar({ selectedDate, onDateChange }: SidebarProps) {
  return (
    <div className="h-full flex flex-col">
      <ScrollArea className="flex-1">
        <div className="space-y-4 py-2">
          <InfoPanel />
          <CalendarView
            selectedDate={selectedDate}
            onDateChange={onDateChange}
          />
        </div>
      </ScrollArea>

      <div className="flex justify-center">
        <AiveeLogoLink />
      </div>
    </div>
  );
}
