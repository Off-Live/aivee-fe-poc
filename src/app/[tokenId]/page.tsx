"use client";
// app/[tokenId]/page.tsx

import { useAuth } from "@/context/AuthContext";
import { useAvailability } from "@/context/AvailabilityContext";
import { useMonthlyEvents } from "@/util/calendar";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { transformDates } from "@/util/availability";
import MonthlyView from "@/components/MonthlyView";
import { AIVEE_BACKEND_URL } from "@/config/config";
import NotFound from "@/app/[tokenId]/NotFound";
import Sidebar from "@/components/Sidebar";
import Header from "@/app/[tokenId]/Header";
import WeeklyView from "@/components/WeeklyView";
import { cn } from "@/lib/utils";
import ReservationDialog from "@/components/ReservationDialog";
import LoadingPage from "@/app/[tokenId]/Loading";
import {CalendarViewType} from "@/types/calendar";

export default function HomePage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [showGuestCalendar, setShowGuestCalendar] = useState(false);
  const [view, setView] = useState<CalendarViewType>("monthly");
  const [initLoading, setInitLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const { credential } = useAuth();
  const { setAvailabilityData } = useAvailability();
  const { monthlyEvents, loading } = useMonthlyEvents(
    credential?.accessToken,
    selectedDate,
  );

  const param = useParams();
  const token = param["tokenId"];

  useEffect(() => {
    const checkMobile = () => {
      const isMobileView = window.matchMedia("(max-width: 768px)").matches;
      if (isMobileView) {
        setView("monthly");
      }
    };
    checkMobile();

    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleResize = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setView("monthly");
      }
    };
    mediaQuery.addEventListener("change", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    const fetchAvailability = async () => {
      try {
        const response = await fetch(
          `${AIVEE_BACKEND_URL}/availability/slots?token=${token}`,
        );
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        const availabilityData = transformDates(await response.json());

        if (mounted) {
          setAvailabilityData(availabilityData);
          setInitLoading(false);
          setAuthorized(true);
          setSelectedDate(availabilityData.beginDate);
        }
      } catch (error) {
        if (mounted) {
          setInitLoading(false);
          setAuthorized(false);
        }
      }
    };

    fetchAvailability();

    return () => {
      mounted = false; // cleanup
    };
  }, [token, setAvailabilityData]);

  const handleSlotSelect = (start: Date, end: Date) => {
    setSelectedSlot({ startDate: start, endDate: end });
    setOpenDialog(true);
    console.log("select slot");
  };

  if (initLoading) return <LoadingPage />;
  if (!authorized) return <NotFound />;

  return (
    <div className="min-h-screen bg-default">
      <div className={`mx-auto min-h-screen 'max-w-[1800px]'`}>
        <div className="flex min-h-screen">
          {view === "monthly" ? null : (
            <nav className="hidden md:block border-r border-border md:w-[360px] lg:w-[420px] shrink-0">
              <Sidebar
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
              />
            </nav>
          )}

          <main className="flex-1 flex flex-col">
            <Header
              view={view}
              onChange={setView}
              currentDate={selectedDate}
              setCurrentDate={setSelectedDate}
              showGuestCalendar={showGuestCalendar}
              setShowGuestCalendar={setShowGuestCalendar}
            />

            {/* CalendarView Container */}
            <div className="flex-1 flex items-center justify-center">
              <div
                className={cn(
                  "flex flex-col w-full h-full items-center justify-center",
                  view === "monthly" ? "max-w-7xl" : "",
                )}
              >
                {view === "monthly" ? (
                  <MonthlyView
                    events={monthlyEvents}
                    selectedDate={selectedDate}
                    onDateChange={setSelectedDate}
                    selectSlot={handleSlotSelect}
                  />
                ) : (
                  <WeeklyView
                    events={monthlyEvents}
                    currentDate={selectedDate}
                    selectSlot={handleSlotSelect}
                    showGuestCalendar={showGuestCalendar}
                  />
                )}
              </div>
            </div>
          </main>
        </div>

        <ReservationDialog
          open={openDialog}
          selectedSlot={selectedSlot}
          token={String(token)}
          onOpenChange={setOpenDialog}
        />
      </div>
    </div>
  );
}
