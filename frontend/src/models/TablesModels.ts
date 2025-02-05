
export interface OverlayTableEventsEvent {
    start : string,
    end : string,
    duration : string
}

export interface OverlayTableElement {
    date: string,
    totalDurationForDay: string,
    title : string,
    events: OverlayTableEventsEvent[]
}