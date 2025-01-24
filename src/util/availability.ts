

export interface TimeSlot {
  startDate: Date;
  endDate: Date;
}

export interface AvailabilityResponse {
  availabilities: TimeSlot[];
  scheduled: TimeSlot[];
}

export const transformDates = (data: AvailabilityResponse): AvailabilityResponse => {
  return {
    availabilities: data.availabilities.map(slot => ({
      startDate: new Date(slot.startDate),
      endDate: new Date(slot.endDate)
    })),
    scheduled: data.scheduled.map(slot => ({
      startDate: new Date(slot.startDate), 
      endDate: new Date(slot.endDate)
    }))
  };
 };


 export function checkAvailability(date: Date, time: number, availability: TimeSlot[]): boolean {
   const hours = Math.floor(time);
   const minutes = (time % 1) * 60;
   
   const targetStart = new Date(date);
   targetStart.setHours(hours, minutes, 0, 0);
   
   const targetEnd = new Date(date);
   targetEnd.setHours(hours, minutes + 30, 0, 0);
 
   return availability.some(slot => 
     slot.startDate <= targetStart && slot.endDate >= targetEnd
   );
 }

 export function hasAvailabilityOnDate(date: Date, availability: TimeSlot[]): boolean {
  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0); // 날짜의 시작 시간 (00:00:00)
  
  const dayEnd = new Date(dayStart);
  dayEnd.setDate(dayEnd.getDate() + 1); // 다음 날 자정 (00:00:00)

  return availability.some(slot => 
    slot.startDate < dayEnd && slot.endDate > dayStart
  );
}
 