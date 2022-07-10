import type { CalendarEvent } from "./event";

export function parseEventTags(eventText: string): string[]{
    // EvenText ~~~ tag1 tag2 tag3
    // function returns [tag1, tag2, tag3]
    const f = eventText.split(" ~~~ ");
    if (f.length == 1){
        return [];
    }else{
        const tags = f[1].split(" ");
        return tags;
    }
}
export function parseEventText(eventText: string){
    // EvenText ~~~ tag1 tag2 tag3
    // function returns [EventText]
    const f = eventText.split(" ~~~ ");
    return f[0];
}
export function dateEqualsByDay(date: Date, datePrev: Date){
    return datePrev.getDate() === date.getDate() && datePrev.getDay() === date.getDay() && datePrev.getMonth() === date.getMonth() && datePrev.getFullYear() === date.getFullYear();
}
export class eventDays{
    day: Date
    Events: CalendarEvent[]
    constructor(day: Date, Events: CalendarEvent[]){
        this.Events = Events;
        this.day = day;
    }
} 