export class CalendarEvent{
    timeStart: string; // 12:12
    timeEnd:string; // 23:10
    title: string // text
    tags: string[]; // [tag1, tag2]
    id: string;
    constructor(title: string, timeStart: string, timeEnd:string, tags: string[], id: string) {
        this.timeStart = timeStart;
        this.timeEnd = timeEnd;
        this.title = title
        this.tags = tags;
        this.id = id;
    }
}