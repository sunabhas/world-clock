/** All the global types to be added here  */


export interface Option {
    value: string;
    label: string
}

export interface TimezoneInfo {
    abbreviation: string;
    client_ip: string;
    datetime: string;
    day_of_week: number;
    day_of_year: number;
    dst: boolean;
    dst_from: null | string;
    dst_offset: number;
    dst_until: null | string;
    raw_offset: number;
    timezone: string;
    unixtime: number;
    utc_datetime: string;
    utc_offset: string;
    week_number: number;
  }

export interface Note {
    note: string;
    time: string;
    area: string;
    location: string
}  
  

