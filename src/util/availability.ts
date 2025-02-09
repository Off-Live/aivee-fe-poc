import moment from "moment-timezone";

export interface TimeSlot {
  startDate: Date;
  endDate: Date;
}

export interface AvailabilityData {
  email: string;
  name: string;
  beginDate: Date;
  endDate: Date;
  availabilities: TimeSlot[];
  scheduled: TimeSlot[];
  slotDuration: number;
}

export const transformDates = (data: AvailabilityData): AvailabilityData => {
  return {
    ...data,
    availabilities: data.availabilities.map((slot) => ({
      startDate: new Date(slot.startDate),
      endDate: new Date(slot.endDate),
    })),
    scheduled: data.scheduled.map((slot) => ({
      startDate: new Date(slot.startDate),
      endDate: new Date(slot.endDate),
    })),
    beginDate: new Date(data.beginDate),
    endDate: new Date(data.endDate),
  };
};

export function checkAvailability(
  date: Date,
  time: number,
  availability: TimeSlot[],
  timezone: string, // 선택한 타임존을 인자로 받습니다.
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
    timezone,
  );

  const targetEndMoment = targetStartMoment.clone().add(30, "minutes");

  const targetStart = targetStartMoment.toDate();
  const targetEnd = targetEndMoment.toDate();

  return availability.some(
    (slot) => slot.startDate <= targetStart && slot.endDate >= targetEnd,
  );
}
export function splitAvailabilitySlots(
  availabilitySlots: TimeSlot[],
  slotDuration: number,
): TimeSlot[] {
  const splitSlots: TimeSlot[] = [];

  availabilitySlots.forEach((slot) => {
    let currentStart = moment(slot.startDate);
    const slotEnd = moment(slot.endDate);

    // Continue splitting while we can fit another slot
    while (
      currentStart.clone().add(slotDuration, "minutes").isSameOrBefore(slotEnd)
    ) {
      const splitSlotEnd = currentStart.clone().add(slotDuration, "minutes");

      splitSlots.push({
        startDate: currentStart.toDate(),
        endDate: splitSlotEnd.toDate(),
      });

      // Move to the next slot start
      currentStart = splitSlotEnd;
    }
  });

  return splitSlots;
}

export function getAvailableTimeSlotsForDate(
  date: Date,
  availabilitySlots: TimeSlot[],
  slotDuration: number,
  timezone: string,
): TimeSlot[] {
  // First split all availability slots
  const allSplitSlots = splitAvailabilitySlots(availabilitySlots, slotDuration);

  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  // Filter slots that fall within the target date
  return allSplitSlots.filter((slot) => {
    const slotStart = moment.tz(slot.startDate, timezone);
    return (
      year === slotStart.year() &&
      month === slotStart.month() &&
      day === slotStart.date()
    );
  });
}

export function hasAvailabilityOnDate(
  date: Date,
  availability: TimeSlot[],
  timezone: string,
): boolean {
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
    timezone,
  );

  const dayEndMoment = dayStartMoment.clone().add(1, "day");

  const dayStart = dayStartMoment.toDate();
  const dayEnd = dayEndMoment.toDate();

  return availability.some(
    (slot) => slot.startDate < dayEnd && slot.endDate > dayStart,
  );
}
