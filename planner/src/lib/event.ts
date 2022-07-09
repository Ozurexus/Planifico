
export class CalendarEvent {
    time: string;
    title: string
    tags: string[];
    constructor(title: string, time: string, tags: string[]) {
        this.time = time;
        this.title = title
        this.tags = tags;
    }
}
