
export class CalendarEvent {
    timeStart: string;
    timeEnd:string;
    title: string
    tags: string[];
    constructor(title: string, timeStart: string, timeEnd:string, tags: string[]) {
        this.timeStart = timeStart;
        this.timeEnd = timeEnd;
        this.title = title
        this.tags = tags;
    }
}
