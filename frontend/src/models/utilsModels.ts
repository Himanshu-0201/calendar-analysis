
export interface UserEvent {
    title: string,
    start: string,
    end: string,
    isImportant: boolean,
    isUrgent: boolean
}

// export interface MatrixChartProp {
//     importantTime: number,
//     notImportantTime: number,
//     urgentTime: number,
//     notUrgentTime: number
// }

export type MatrixChartProp = [number, number, number, number];

export type EventType = {
    title: string,
    start: string,
    end: string,
    isImportant: boolean,
    isUrgent: boolean,
}

// export interface PiChartEventType {
//     events: [string, number][]
// }

export type PiChartEventsType = [string, number][];

export interface TableEventType {
    eventName : string,
    totalTimeSpend : string,
    isImportant : boolean,
    isUrgent : boolean
}