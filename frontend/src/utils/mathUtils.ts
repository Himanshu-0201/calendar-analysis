import { MatrixChartProp, UserEvent } from "../models/utilsModels.ts";
import { splitTimeTillCurrentTime } from "./dateUtils.ts";


export const normalizedTitleFunction = (title: string): string => {

    let normalizedTitle = title.toLowerCase().replace(/\s+/g, ' ').trim();
    normalizedTitle = normalizedTitle.charAt(0).toUpperCase() + normalizedTitle.slice(1);

    return normalizedTitle;

};

export const modifyEventsForMatrixChart = (userEvents: UserEvent[], eventsShowTillCurrentTime: boolean): MatrixChartProp => {

    let updatedUserEvents: UserEvent[] = [];
    let importantTime: number = 0;
    let notImportantTime: number = 0;
    let urgentTime: number = 0;
    let notUrgentTime: number = 0;

    if (eventsShowTillCurrentTime) {
        updatedUserEvents = splitTimeTillCurrentTime(userEvents);
    }
    else {
        updatedUserEvents = userEvents;
    }

    updatedUserEvents.forEach((event) => {

        const startTime = new Date(event.start);
        const endTime = new Date(event.end);

        const diffInMintues = (endTime.getTime() - startTime.getTime()) / (1000 * 60);

        if (event.isImportant) {
            importantTime += diffInMintues;
        }
        else {
            notImportantTime += diffInMintues;
        }

        if (event.isUrgent) {
            urgentTime += diffInMintues;
        }
        else {
            notUrgentTime += diffInMintues;
        }

    });


    // const importUrgentMatrixDate = calImportantUrgentEvents();


    const totalTime = importantTime + notImportantTime;

    if (totalTime === 0) {
        return [0,0,0,0];
    }

    const importantTimePercent = ((importantTime) * 100.0) / (totalTime);
    const notImportantTimePercent = ((notImportantTime) * 100) / (totalTime);

    const urgentTimePercent = ((urgentTime) * 100) / (totalTime);
    const notUrgentTimePercent = ((notUrgentTime) * 100) / (totalTime);

    const importantUrgent = parseFloat(((importantTimePercent * urgentTimePercent) / 100).toFixed(2));
    const importantNotUrgent = parseFloat(((importantTimePercent * notUrgentTimePercent) / 100).toFixed(2));

    const notImportantUrgent = parseFloat(((notImportantTimePercent * urgentTimePercent) / 100).toFixed(2));
    const notImportantNotUrgent = parseFloat(((notImportantTimePercent * notUrgentTimePercent) / 100).toFixed(2));



    return [
        importantUrgent,
        importantNotUrgent,
        notImportantUrgent,
        notImportantNotUrgent
    ]


}







