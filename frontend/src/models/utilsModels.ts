
export interface UserEvent {
    title : string,
    start : string,
    end : string,
    isImportant : boolean,
    isUrgent : boolean
}

// export interface MatrixChartProp {
//     importantTime: number,
//     notImportantTime: number,
//     urgentTime: number,
//     notUrgentTime: number
// }

export type MatrixChartProp = [number, number, number, number];