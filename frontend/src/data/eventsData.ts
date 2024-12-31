

type EventType = {
    title: string,
    start : string,
    end: string,
    isImportant: boolean,
    isUrgent: boolean,
}

export const events : Array<EventType> = [
    {
        title: "Reading",
        start: "2024-10-29T23:00:00+05:30",
        end: "2024-10-30T00:51:00+05:30",
        isImportant: true,
        isUrgent: false
    },
    {
        title: "GYM",
        start: "2024-10-30T07:00:00+05:30",
        end: "2024-10-30T08:30:00+05:30",
        isImportant: true,
        isUrgent: false
    },
    {
        title: "Walk",
        start: "2024-10-30T18:00:00+05:30",
        end: "2024-10-30T19:15:00+05:30",
        isImportant: true,
        isUrgent: false
    },
    {
        title: "Work",
        start: "2024-10-29T11:00:00+05:30",
        end: "2024-10-30T17:00:00+05:30",
        isImportant: true,
        isUrgent: false
    }
];