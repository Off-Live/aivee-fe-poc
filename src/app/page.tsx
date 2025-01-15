// app/page.tsx
'use client';

import Sidebar from '@/components/Sidebar';
import Calendar from '@/components/Calendar';
import TimeSlots from '@/components/TimeSlots';
import ViewToggle from '@/components/ViewToggle';
import WeeklyView from '@/components/WeeklyView';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useMonthlyEvents} from '@/util/calendar';

export default function HomePage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [view, setView] = useState<'monthly' | 'weekly'>('monthly');
  const { credential } = useAuth();
  const {monthlyEvents, loading} = useMonthlyEvents(credential?.accessToken, selectedDate)
  
  return (
    <div className="container">
      <Sidebar />
      <div className="main">

        <div style={{ position: 'absolute', top: '24px', right: '24px' }}>
          <ViewToggle currentView={view} onChange={(v) => setView(v)} />
        </div>


        {view === 'monthly' ? (
          <>
            <h1>Select date and time</h1>

            <div className="calendarWrapper">
              <Calendar
                selectedDate={selectedDate}
                onDateChange={(date) => setSelectedDate(date)}
              />
              <TimeSlots selectedDate={selectedDate} />
            </div>
          </>
        ) : (
          <>
            <h1>Weekly View</h1>
            <WeeklyView events={monthlyEvents} currentDate={selectedDate} setCurrentDate={setSelectedDate}/>
          </>
        )}
      </div>
    </div>
  );
}




