import { MatrixChartProp, PiChartEventsType, UserEvent , TableEventType} from "../models/utilsModels.ts";
import { splitTimeTillCurrentTime } from "./dateUtils.ts";
import { convertMinutesToHours } from "./dateUtils.ts";

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
        return [0, 0, 0, 0];
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


export const modifyEventsForPieChart = (userEvents: UserEvent[], eventsShowTillCurrentTime: boolean): PiChartEventsType => {

    let updatedUserEvents: UserEvent[] = [];

    if (eventsShowTillCurrentTime) {
        updatedUserEvents = splitTimeTillCurrentTime(userEvents);
    }
    else {
        updatedUserEvents = userEvents;
    }

    const eventsArray: [string, number][] = [];

    updatedUserEvents.forEach(event => {

        const startTime = new Date(event.start);
        const endTime = new Date(event.end);
        const duration = (endTime.getTime() - startTime.getTime()) / 1000 / 60; // duration in minutes

        //     // Normalize the event title by trimming and converting it to lowercase
        // let normalizedTitle = event.title.toLowerCase().replace(/\s+/g, ' ').trim();
        // normalizedTitle = normalizedTitle.charAt(0).toUpperCase() + normalizedTitle.slice(1);

        const normalizedTitle = normalizedTitleFunction(event.title);

        // Check if the title already exists in the eventsArray
        const existingEntry = eventsArray.find(entry => entry[0] === normalizedTitle);

        if (existingEntry) {
            // If it exists, add the duration
            existingEntry[1] += duration;
        } else {
            // If it doesn't exist, create a new entry
            eventsArray.push([normalizedTitle, duration]);
        }

    })

    return eventsArray;
};


export const modifyEventsForTable = (userEvents: UserEvent[], eventsShowTillCurrentTime: boolean): TableEventType [] => {

    let updatedUserEvents: UserEvent[] = [];

    if (eventsShowTillCurrentTime) {
        updatedUserEvents = splitTimeTillCurrentTime(userEvents);
    }
    else {
        updatedUserEvents = userEvents;
    }

    const eventsArray: {
        title: string,
        duration: number,
        isImportant: boolean,
        isUrgent: boolean
    }[] = [];

    updatedUserEvents.forEach(event => {

        const startTime = new Date(event.start);
        const endTime = new Date(event.end);
        const duration = (endTime.getTime() - startTime.getTime()) / 1000 / 60; // duration in minutes

        // is important and urgent
        const isImportant = event.isImportant === null ? true : event.isImportant;
        const isUrgent = event.isUrgent === null ? false : event.isUrgent;

        const normalizedTitle = normalizedTitleFunction(event.title);

        const existingEntry = eventsArray.find(entry => entry.title === normalizedTitle);

        if (existingEntry) {
            // If it exists, add the duration
            existingEntry.duration += duration;
        } else {
            // If it doesn't exist, create a new entry
            eventsArray.push({ title: normalizedTitle, duration, isImportant: isImportant, isUrgent: isUrgent });
        }
    });

    const events : TableEventType [] = eventsArray.map(event => {

        const eventName = event.title;
        const totalTimeSpend = convertMinutesToHours(event.duration);

        return {
            eventName,
            totalTimeSpend,
            isImportant: event.isImportant,
            isUrgent: event.isUrgent
        }

    });


    return events;

}







