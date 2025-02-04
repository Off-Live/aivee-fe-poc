import moment from "moment-timezone";

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


 export function checkAvailability(
  date: Date,
  time: number,
  availability: TimeSlot[],
  timezone: string // 선택한 타임존을 인자로 받습니다.
): boolean {
  const hours = Math.floor(time);
  const minutes = (time % 1) * 60;

  const targetStartMoment = moment.tz(
    {
      year: date.getFullYear(),
      month: date.getMonth(), // 0부터 시작하는 월
      day: date.getDate(),
      hour: hours,
      minute: minutes,
      second: 0,
      millisecond: 0,
    },
    timezone
  );

  const targetEndMoment = targetStartMoment.clone().add(30, "minutes");

  const targetStart = targetStartMoment.toDate();
  const targetEnd = targetEndMoment.toDate();

  return availability.some(
    (slot) => slot.startDate <= targetStart && slot.endDate >= targetEnd
  );
}

export function hasAvailabilityOnDate(date: Date, availability: TimeSlot[], timezone:string): boolean {
  const dayStartMoment = moment.tz(
    {
      year: date.getFullYear(),
      month: date.getMonth(), // 0부터 시작하는 월
      day: date.getDate(),
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    },
    timezone
  )

  const dayEndMoment = dayStartMoment.clone().add(1,"day");

  const dayStart = dayStartMoment.toDate()
  const dayEnd = dayEndMoment.toDate()

  return availability.some(slot => 
    slot.startDate < dayEnd && slot.endDate > dayStart
  );
}
 