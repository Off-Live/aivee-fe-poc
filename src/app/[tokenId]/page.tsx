// app/page.tsx
'use client';

import InfoPanel from '@/components/InfoPanel';
import Calendar from '@/components/Calendar';
import TimeSlots from '@/components/TimeSlots';
import ViewToggle from '@/components/ViewToggle';
import WeeklyView from '@/components/WeeklyView';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useMonthlyEvents } from '@/util/calendar';
import { useParams } from 'next/navigation';
import ModalForm from '@/components/ModalForm';
import { AvailabilityResponse, TimeSlot, transformDates } from '@/util/availability';
import Sidebar from '@/components/Sidebar';
import GoogleAuth from '@/components/GoogleAuth';
import moment from "moment-timezone";
import { useAvailability } from '@/context/AvailabilityContext';

interface HostInfo{
  email:string;
  name:string;
}

export default function HomePage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot>({ startDate: new Date(), endDate: new Date() })
  const [view, setView] = useState<'monthly' | 'weekly'>('monthly');
  const [initLoading, setInitLoading] = useState(true)
  const [authorized, setAuthorized] = useState(false)
  const [showModal, setShowModal] = useState(false);

  const { credential } = useAuth();
  const { availabilityData, setAvailabilityData} = useAvailability()
  const { monthlyEvents, loading } = useMonthlyEvents(credential?.accessToken, selectedDate)

  const param = useParams();
  const token = param['tokenId']

  useEffect(() => {
    const getAvailabilitySlots = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_AIVEE_BACKEND}/availability/slots?token=${token}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);

        }

        const json = await response.json()
        const availabilityData = transformDates(json as AvailabilityResponse);

        setAvailabilityData(availabilityData)
        console.log(availabilityData.availabilities)
        
        setInitLoading(false)
        setAuthorized(true)
        setSelectedDate(availabilityData.beginDate)
       
      } catch (error) {
        setInitLoading(false)
        setAuthorized(false)
      }

    }
    

    getAvailabilitySlots()

  }, [param, token, setAvailabilityData])

  const selectSlot = (start: Date, end: Date) => {
    setSelectedSlot({ startDate: start, endDate: end })
    setShowModal(true)
    console.log("select slot")
  }

  const authorizedMain = <>

    <div style={{ position: 'absolute', top: '24px', right: '150px' }}>
      <GoogleAuth/>
    </div>
    
    <div style={{ position: 'absolute', top: '24px', right: '24px' }}>
      <ViewToggle currentView={view} onChange={(v) => setView(v)} />
    </div>


    {view === 'monthly' ? (
      <>
        
        <div className="calendarWrapper">
          <InfoPanel/>
          <Calendar
            selectedDate={selectedDate}
            onDateChange={(date) => setSelectedDate(date)}
          />
          <TimeSlots selectedDate={selectedDate} selectSlot={selectSlot} />
        </div>
      </>
    ) : (
      <>
        <h1>Weekly View</h1>
        <WeeklyView events={monthlyEvents} currentDate={selectedDate} setCurrentDate={setSelectedDate} selectSlot={selectSlot} />
      </>
    )}
  </>

  const unauthorizedMain = "Not valid token"
  const loadingScreen = "loading"

  const content = initLoading ? loadingScreen : (authorized ? authorizedMain : unauthorizedMain)


  return (
    <div className="container">
      {
        view === 'monthly' ? null : (
        <Sidebar  selectedDate={selectedDate}
          onDateChange={(date) => setSelectedDate(date)}
          />)
      }
      <div className="main">
        {content}

      </div>

      <ModalForm show={showModal} selectedSlot={selectedSlot} token={String(token!)}  onClose={() => setShowModal(false)} />

    </div>
  );
}




