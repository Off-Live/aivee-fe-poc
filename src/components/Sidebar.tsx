
// components/Sidebar.tsx
import { TimeSlot } from '@/util/availability';
import React from 'react';
import Calendar from './Calendar';
import TimezoneSelector from './TimezoneSelector';

type SidebarProps = {
  selectedDate: Date;              
  availability: TimeSlot[];
  email:string;
  name:string;
  onDateChange: (date: Date) => void;   
};


export default function Sidebar({ selectedDate, availability,email,name, onDateChange }: SidebarProps) {
  return (
    <div className = "sidebar">
      
      <h2 style={{ margin: '8px 0' }}>{name}</h2>
      <h3 style={{ margin: '8px 0' }}>Available slots</h3>
      
      <TimezoneSelector/>

      <Calendar 
       selectedDate={selectedDate}
       availability={availability}
       onDateChange={onDateChange}
       width={340}
      />
      
    </div>
  );
}
