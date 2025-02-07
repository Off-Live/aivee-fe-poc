
// components/Sidebar.tsx
import { TimeSlot } from '@/util/availability';
import React from 'react';
import Calendar from './Calendar';
import TimezoneSelector from './TimezoneSelector';
import { useAvailability } from '@/context/AvailabilityContext';

type SidebarProps = {
  selectedDate: Date;              
  onDateChange: (date: Date) => void;   
};


export default function Sidebar({ selectedDate, onDateChange }: SidebarProps) {
  const {availabilityData} = useAvailability()
  return (
    <div className = "sidebar">
      
      <h2 style={{ margin: '8px 0' }}>{availabilityData.name}</h2>
      <h3 style={{ margin: '8px 0' }}>{availabilityData.slotDuration}min slots</h3>
      
      <TimezoneSelector/>

      <Calendar 
       selectedDate={selectedDate}
       onDateChange={onDateChange}
       width={340}
      />
      
    </div>
  );
}
