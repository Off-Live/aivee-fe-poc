
// components/Sidebar.tsx
import { TimeSlot } from '@/util/availability';
import React from 'react';
import Calendar from './Calendar';

type SidebarProps = {
  selectedDate: Date;              
  availability: TimeSlot[];
  onDateChange: (date: Date) => void;   
};


export default function Sidebar({ selectedDate, availability, onDateChange }: SidebarProps) {
  return (
    <div className = "sidebar">
      
      <h3 style={{ margin: '8px 0' }}>Aivee</h3>
      <h2 style={{ margin: '8px 0' }}>Availability</h2>
      
      
      <p>Asia/Seoul</p>

      <Calendar
       
       selectedDate={selectedDate}
       availability={availability}
       onDateChange={onDateChange}
       width={340}
      />
      
    </div>
  );
}
