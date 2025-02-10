// components/Sidebar.tsx
import AiveeLogoLink from '@/components/common/AiveeLogoLink';
import { ScrollArea } from '@/components/ui/scroll-area';

import CalendarView from './common/CalendarView';
import InfoPanel from './common/InfoPanel';

type SidebarProps = {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
};

export default function Sidebar({ selectedDate, onDateChange }: SidebarProps) {
  return (
    <div className='h-full flex flex-col'>
      <ScrollArea className='flex-1'>
        <div className='space-y-4 py-2'>
          <InfoPanel />
          <CalendarView
            selectedDate={selectedDate}
            onDateChange={onDateChange}
          />
        </div>
      </ScrollArea>

      <div className='flex justify-center'>
        <AiveeLogoLink />
      </div>
    </div>
  );
}
