
import { normalizedTitleFunction } from "./mathUtils.ts";

export const convertMinutesToHours = (minutes) => {
    const hours = Math.floor(minutes / 60); // Calculate full hours
    const remainingMinutes = Math.floor(minutes % 60);   // Calculate remaining minutes

    // Return the result in the desired format
    return `${hours} Hr ${remainingMinutes} Min`;
}

export const calPercentage = (part, total) => {
    if (total === 0) {
        throw new Error("Total value cannot be zero."); // Handle division by zero
    }

    const percentage = (part / total) * 100; // Calculate percentage
    return percentage.toFixed(2); // Return percentage roun
}


// this is for cal time only
export const calculateTotalTimeSpend = (events, eventsShowTillCurrentTime) => {

    let totalTime = 0;

    events.forEach(event => {
        let startTime = new Date(event.start);
        let endTime = new Date(event.end);

        if (eventsShowTillCurrentTime) {
            const currTime = new Date();
            startTime = new Date(Math.min(startTime, currTime));
            endTime = new Date(Math.min(endTime, currTime));
        }

        const duration = (endTime - startTime) / 1000 / 60; // duration in minutes
        totalTime += duration;
    });

    return totalTime;
}

export const modifyEventsForDayEventsTable = (userEvents, eventsShowTillCurrentTime) => {


    let updatedUserEvents = [];

    if (eventsShowTillCurrentTime) {

        const currTime = new Date();

        userEvents.forEach(event => {

            const endTime = new Date(event.end);
            const startTime = new Date(event.start);

            const end = new Date(Math.min(endTime, currTime)).toISOString();
            const start = new Date(Math.min(startTime, currTime)).toISOString();

            if (start != end) {
                updatedUserEvents.push({
                    ...event,
                    start,
                    end
                })
            }

        })
    }
    else {
        updatedUserEvents = userEvents;
    }




    const eventsArray = [];

    updatedUserEvents.forEach(event => {

        const startTime = new Date(event.start);
        const endTime = new Date(event.end);
        const duration = (endTime - startTime) / 1000 / 60; // duration in minutes
        
        // is important and urgent

        
        const isImportant = event.isImportant === null ? true : event.isImportant;
        const isUrgent = event.isUrgent === null ? false : event.isUrgent;

        //     // Normalize the event title by trimming and converting it to lowercase
        // const normalizedTitle = event.title.toLowerCase().replace(/\s+/g, ' ').trim();
        const normalizedTitle = normalizedTitleFunction(event.title);


        // Check if the title already exists in the eventsArray
        const existingEntry = eventsArray.find(entry => entry.title === normalizedTitle);

        if (existingEntry) {
            // If it exists, add the duration
            existingEntry.duration += duration;
        } else {
            // If it doesn't exist, create a new entry
            eventsArray.push({ title: normalizedTitle, duration , isImportant : isImportant, isUrgent : isUrgent});
        }

    })


    const calculatedAllTimeSpend = calculateTotalTimeSpend(updatedUserEvents, eventsShowTillCurrentTime);

    const events = eventsArray
        .map(event => {
            const eventName = event.title.charAt(0).toUpperCase() + event.title.slice(1);
            const totalTimeSpend = convertMinutesToHours(event.duration);
            const percentage = calPercentage(event.duration, calculatedAllTimeSpend);

            return {
                eventName: eventName,
                totalTimeSpend: totalTimeSpend,
                percentage: percentage,
                isImportant : event.isImportant,
                isUrgent : event.isUrgent,
                duration: event.duration, // Keep the original duration for sorting,
            };
        })
        .sort((a, b) => b.duration - a.duration) // Sort by duration in descending order
        .map(({ duration, ...rest }) => rest); // Remove duration if not needed in the final output


    return events;

}


export const modifyEventsForPieChart = (userEvents, eventsShowTillCurrentTime) => {

    let updatedUserEvents = [];

    if (eventsShowTillCurrentTime) {

        const currTime = new Date();

        userEvents.forEach(event => {

            const endTime = new Date(event.end);
            const startTime = new Date(event.start);

            const end = new Date(Math.min(endTime, currTime)).toISOString();
            const start = new Date(Math.min(startTime, currTime)).toISOString();

            if (start != end) {
                updatedUserEvents.push({
                    ...event,
                    start,
                    end
                })
            }

        })
    }
    else {
        updatedUserEvents = userEvents;
    }


    const eventsArray = [];

    updatedUserEvents.forEach(event => {

        const startTime = new Date(event.start);
        const endTime = new Date(event.end);
        const duration = (endTime - startTime) / 1000 / 60; // duration in minutes

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