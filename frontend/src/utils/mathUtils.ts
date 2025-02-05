import { TableEvent } from "../models/UserEventsModels.ts";
// import { MatrixChartProp, UserEvent } from "../models/utilsModels.ts";
import { MatrixChartProp, PiChartEventType } from "../models/ChartModels.ts";
import { UserEvent } from "../models/UserEventsModels.ts";
import { convertMinutesToHours, splitTimeTillCurrentTime } from "./dateUtils.ts";
import { OverlayTableElement, OverlayTableEventsEvent } from "../models/TablesModels";


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

// this is for cal time only
export const calculateTotalTimeSpend = (events: UserEvent[], eventsShowTillCurrentTime: boolean) => {

    let totalTime = 0;

    events.forEach(event => {
        let startTime = new Date(event.start);
        let endTime = new Date(event.end);

        if (eventsShowTillCurrentTime) {
            const currTime = new Date();
            startTime = new Date(Math.min(startTime.getTime(), currTime.getTime()));
            endTime = new Date(Math.min(endTime.getTime(), currTime.getTime()));
        }

        const duration = (endTime.getTime() - startTime.getTime()) / 1000 / 60; // duration in minutes
        totalTime += duration;
    });

    return totalTime;
}


export const modifyEventsForTable = (userEvents: UserEvent[], eventsShowTillCurrentTime: boolean): TableEvent[] => {

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
        const duration = Math.round((endTime.getTime() - startTime.getTime()) / 1000 / 60); // duration in minutes

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

    const events: TableEvent[] = eventsArray
        .sort((a, b) => b.duration - a.duration) // Sort events by duration
        .map(event => {

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



export const modifyEventsForPieChart = (userEvents: UserEvent[], eventsShowTillCurrentTime: boolean): PiChartEventType[] => {

    let updatedUserEvents: UserEvent[] = [];

    if (eventsShowTillCurrentTime) {

        updatedUserEvents = splitTimeTillCurrentTime(userEvents);
    }
    else {
        updatedUserEvents = userEvents;
    }


    const eventsArray: PiChartEventType[] = [];

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
}

const convertUtcToLocalTime = (utcTimeString: string) => {
    const date = new Date(utcTimeString);

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');

    const period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert 0 to 12 for midnight and use modulo for 12-hour format

    return `${hours}:${minutes} ${period}`;
};

const formatDateToReadable = (dateString: string): string => {
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    };

    return date.toLocaleDateString('en-US', options);
};

const calculateDurationInMinutes = (start: string, end: string): number => {

    const st = new Date(start);
    const ed = new Date(end);

    const duration = (ed.getTime() - st.getTime()) / 1000 / 60;

    return duration;
}




const filterEventsByTitle = (events: UserEvent[], title: string): UserEvent[] => {

    const normalizedTitle = normalizedTitleFunction(title);

    const eventsByTitle: UserEvent[] = [];

    events.forEach(event => {
        if (normalizedTitleFunction(event.title) === normalizedTitle) {
            eventsByTitle.push(event);
        }
    });

    return eventsByTitle;
}

export const modifyEventsForOverlayTable = (events: UserEvent[], title: string) : OverlayTableElement [] => {

    const eventsByTitle = filterEventsByTitle(events, title);
    // const eventsByDate = groupsEventsByDate(eventsByTitle);

    const groupedEvents: { [key: string]: { events: OverlayTableEventsEvent [], totalDuration: number } } = {};

    eventsByTitle.forEach((event) => {
        const eventDate = formatDateToReadable(event.start); // Extract the date part from the start
        if (!groupedEvents[eventDate]) {
            groupedEvents[eventDate] = { events: [], totalDuration: 0 };
        }

        // Calculate event duration in minutes if not already provided
        const duration = calculateDurationInMinutes(event.start, event.end);


        groupedEvents[eventDate].events.push({
            start: convertUtcToLocalTime(event.start),
            end: convertUtcToLocalTime(event.end),
            duration: convertMinutesToHours(duration),
        });

        groupedEvents[eventDate].totalDuration += duration;
    });

    // Convert the grouped events object into an array of dates with their corresponding events
    const updatedUserEvents = Object.keys(groupedEvents).map(date => ({
        date,
        title : normalizedTitleFunction(title),
        totalDurationForDay: convertMinutesToHours(groupedEvents[date].totalDuration),
        events: groupedEvents[date].events
    }));



    return updatedUserEvents;

};






