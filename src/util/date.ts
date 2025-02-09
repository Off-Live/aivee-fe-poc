// utils/date.ts

import moment from "moment-timezone";

export const formatTime = (date: Date, timezone: string): string => {
  const dateMoment = moment.tz(date, timezone);
  return dateMoment.format("HH:mm");
};

export const formatLocalDateWithOffset = (date: Date): string => {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZoneName: "shortOffset",
  });
  return formatter.format(date).replace(",", "");
};

export function getWeekRange(date: Date) {
  const day = date.getDay();
  const sunday = new Date(date);
  sunday.setDate(sunday.getDate() - day);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(sunday);
    d.setDate(d.getDate() + i);
    return d;
  });
}
