import moment from 'moment-timezone';

export function formatGMTOffset(timezone: string): string {
  const offset = moment.tz(timezone).utcOffset();
  const hours = Math.floor(Math.abs(offset) / 60);
  const minutes = Math.abs(offset) % 60;
  const formattedHours = hours.toString();
  if (minutes === 0) {
    return `GMT${offset >= 0 ? '+' : '-'}${formattedHours}`;
  }
  return `GMT${offset >= 0 ? '+' : '-'}${formattedHours}:${minutes.toString().padStart(2, '0')}`;
}

export function formatTimezoneAbbr(timezone: string): string {
  const gmtOffset = formatGMTOffset(timezone);
  const city = timezone.split('/').pop()?.replace(/_/g, ' '); // Gets city name
  return `${gmtOffset} ${city}`;
}

export function formatTimezone(timezone: string): string {
  const gmtOffset = formatGMTOffset(timezone);
  const city = timezone.replace(/_/g, ' '); // Gets city name
  return `${gmtOffset} ${city}`;
}
