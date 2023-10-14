/** All the global types to be added here  */
export interface TimezoneInfo {
  abbreviation: string;
  clientIp: string;
  datetime: string;
  dayOfWeek: number;
  dayOfYear: number;
  dst: boolean;
  dstFrom: string | null;
  dstOffset: number;
  dstUntil: string | null;
  rawOffset: number;
  timezone: string;
  unixtime: number;
  utcDatetime: string;
  utcOffset: string;
  weekNumber: number;
}

export interface Note {
  id: number;
  description: string;
  time: string;
  area: string;
  location: string;
}
