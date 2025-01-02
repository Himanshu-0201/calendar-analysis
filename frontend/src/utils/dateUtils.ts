
import { UserEvent } from "../models/UserEventsModels";



export const isToday = (currDate : Date) => {
    const d1 = new Date();
    const d2 = currDate;

    if (d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate()) return true;
    return false;
}

export const isYesterday = (currDate : Date) => {
    const d1 = new Date();
    d1.setDate(d1.getDate() - 1);
    const d2 = currDate;

    if (d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate()) return true;
    return false;
}

export const splitTimeTillCurrentTime = (userEvents: UserEvent[]): UserEvent[] => {

    let updatedUserEvents: UserEvent[] = [];
    const currTime = new Date();

    userEvents.forEach(event => {

        const endTime = new Date(event.end);
        const startTime = new Date(event.start);

        const end = new Date(Math.min(endTime.getTime(), currTime.getTime())).toISOString();
        const start = new Date(Math.min(startTime.getTime(), currTime.getTime())).toISOString();

        if (start != end) {
            updatedUserEvents.push({
                ...event,
                start,
                end
            })
        }

    });

    return updatedUserEvents;

}

export const convertMinutesToHours = (minutes: number): string => {

    const hours = Math.floor(minutes / 60); // Calculate full hours
    const remainingMinutes = Math.floor(minutes % 60);   // Calculate remaining minutes

    // Return the result in the desired format
    return `${hours} Hr ${remainingMinutes} Min`;

}

interface StartAndEndOfWeekType {
    startOfWeek: Date;
    endOfWeek: Date;
}

export const getStartAndEndOfWeek = ( date : (string | Date) ) : StartAndEndOfWeekType => {

    const currentDate = new Date(date);
    const currentDay = currentDate.getDay();

    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDay);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    return { startOfWeek, endOfWeek };
}