import type { Event } from 'microsoft-graph';
import { format } from 'date-fns';
import { parseISO } from 'date-fns';

type CalendarDayRowProps = {
  date: Date,
  timeFormat: string,
  events: Event[]
};

interface FormatMap {
  [key: string] : string;
}

// date-fns format strings are slightly
// different than the ones returned by Graph
const formatMap: FormatMap = {
  "h:mm tt": "h:mm a",
  "hh:mm tt": "hh:mm a"
};

// Helper function to format Graph date/time in the user's
// preferred format
export function formatDateTime(dateTime: string | undefined, timeFormat: string) {
  if (dateTime !== undefined) {
    const parsedDate = parseISO(dateTime);
    return format(parsedDate, formatMap[timeFormat] || timeFormat);
  }
}