
export interface UserEvent {
    title : string,
    start : string,
    end : string,
    isImportant : boolean,
    isUrgent : boolean
}

export interface TableEvent {
    eventName : string,
    isImportant : boolean,
    isUrgent : boolean,
    totalTimeSpend : string
}
