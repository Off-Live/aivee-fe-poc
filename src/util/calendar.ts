// utils/calendarApi.ts
import { useEffect, useState } from 'react';

export interface CalendarEvent {
  id: string;
  summary: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  description?: string;
  location?: string;
}

interface CalendarResponse {
  items: CalendarEvent[];
  nextPageToken?: string;
}

export const fetchCalendarEvents = async (
  accessToken: string,
  startDate: Date = new Date(),  
  endDate?: Date  
): Promise<CalendarEvent[]> => {
  try {
    // Set endDate to 30 days after startDate if endDate is not given.
    const timeMin = startDate.toISOString();
    const timeMax = endDate 
      ? endDate.toISOString() 
      : new Date(startDate.getTime() + (30 * 24 * 60 * 60 * 1000)).toISOString();

    // Call Google Calendar API
    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${timeMin}&timeMax=${timeMax}&orderBy=startTime&singleEvents=true`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch calendar events');
    }

    const data: CalendarResponse = await response.json();
    //console.log('Calendar Events:', data.items);
    return data.items;
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    throw error;
  }
};


export function getStartOfWeek(date: Date) {
  const copy = new Date(date);
  const day = copy.getDay(); // sunday:0, monday:1 ...
  const diff = copy.getDate() - day;
  copy.setDate(diff);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

export function getEndOfWeek(date: Date) {
  const copy = new Date(date);
  const day = copy.getDay();
  const diff = copy.getDate() + (6 - day);
  copy.setDate(diff);
  copy.setHours(23, 59, 59, 999);
  return copy;
}

export function useWeeklyEvents(credential: string | undefined, selectedDate: Date) {
  const [weeklyEvents, setWeeklyEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!credential) return;

    const loadWeeklyEvents = async () => {
      setLoading(true);
      try {
        const startOfWeek = getStartOfWeek(selectedDate);
        const endOfWeek = getEndOfWeek(selectedDate);
        const events = await fetchCalendarEvents(credential, startOfWeek, endOfWeek);
        setWeeklyEvents(events);
      } catch (error) {
        console.error('Failed to fetch weekly events:', error);
      } finally {
        setLoading(false);
      }
    };

    loadWeeklyEvents();
  }, [credential, selectedDate]);

  return { weeklyEvents, loading };
}

export function getStartOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0);
}

export function getEndOfMonth(date: Date) {
  // day=0: one day before the first day of the next month
  return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
}

export function useMonthlyEvents(credential: string | undefined, selectedDate: Date) {
  const [monthlyEvents, setMonthlyEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchStart, setFetchStart] = useState<Date>(getStartOfMonth(selectedDate))
  const [fetchEnd, setFetchEnd ] = useState<Date>(getEndOfMonth(selectedDate))


  useEffect(() => {
    setFetchStart(getStartOfWeek(getStartOfMonth(selectedDate)))
    setFetchEnd(getEndOfWeek(getEndOfMonth(selectedDate)))
  }, [selectedDate])

  useEffect(() => {
    if (!credential) return;

    const loadMonthlyEvents = async () => {
      setLoading(true);
      try {
        console.log(fetchStart, fetchEnd)
        const events = await fetchCalendarEvents(credential, fetchStart, fetchEnd);
        setMonthlyEvents(events);
      } catch (error) {
        console.error('Failed to fetch monthly events:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMonthlyEvents();
  }, [credential, fetchStart, fetchEnd]);

  return { monthlyEvents, loading };
}