import type { CalendarEvent } from './event';

export function parseEventTags(eventText: string): string[] {
  // EvenText ~~~ tag1 tag2 tag3
  // function returns [tag1, tag2, tag3]
  const f = eventText.split(' ~~~ ');
  if (f.length === 1) {
    return [];
  }
  const tags = f[1].split(' ');
  return tags;
}

export function parseEventText(eventText: string) {
  // EvenText ~~~ tag1 tag2 tag3
  // function returns [EventText]
  const f = eventText.split(' ~~~ ');
  return f[0];
}

export function dateEqualsByDay(date: Date, datePrev: Date) {
  return (
    datePrev.getDate() === date.getDate()
		&& datePrev.getDay() === date.getDay()
		&& datePrev.getMonth() === date.getMonth()
		&& datePrev.getFullYear() === date.getFullYear()
  );
}

// returns subject for outlook api
export function generateSubject(tags: string[], title: string): string {
  if (tags.length === 0) {
    return title;
  }
  let tagsText = '';
  tags.forEach((tag) => {
    if (tagsText === '') {
      tagsText = tag;
    } else {
      tagsText = `${tagsText} ${tag}`;
    }
  });
  return `${title} ~~~ ${tagsText}`;
}

export function timeForCreationEvent(d: Date, hhmm: string) {
  const datestring = `${d.getFullYear()}-${`0${d.getMonth() + 1}`.slice(
    -2,
  )}-${`0${d.getDate()}`.slice(-2)}`;
  return `${datestring}T${hhmm}`;
}

export function parseTimehhmm(t: string): string {
  const tmp = t.split('T')[1].split(':');
  return `${tmp[0]}:${tmp[1]}`;
}

export class eventDays {
  date: Date;

  events: CalendarEvent[];

  constructor(date: Date, Events: CalendarEvent[]) {
    this.events = Events;
    this.date = date;
  }
}
