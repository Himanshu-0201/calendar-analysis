

const normalizedTitleFunction = (title) => {

    let normalizedTitle = title.toLowerCase().replace(/\s+/g, ' ').trim();
    normalizedTitle = normalizedTitle.charAt(0).toUpperCase() + normalizedTitle.slice(1);

    return normalizedTitle;

};


const convertMinutesToHours = (minutes) => {

    const hours = Math.floor(minutes / 60); // Calculate full hours
    const remainingMinutes = Math.floor(minutes % 60);   // Calculate remaining minutes

    // Return the result in the desired format

    if (hours === 0) {
        return `${remainingMinutes} Min`;
    }
    else {
        return `${hours} Hr ${remainingMinutes} Min`;
    }

}


export const formateDate = (currDate) => {
    const date = new Date(currDate);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();

    return `${day} ${month}, ${year}`;
}


export const defineDate = () => {
    const currDate = new Date();

    const dayOfCurrDate = currDate.getDay();



    const firstDateOfWeek = new Date(currDate);
    firstDateOfWeek.setDate(firstDateOfWeek.getDate() - dayOfCurrDate - 7);
    firstDateOfWeek.setHours(0, 0, 0);

    const lastDateOfWeek = new Date(firstDateOfWeek);
    lastDateOfWeek.setDate(firstDateOfWeek.getDate() + 6);
    lastDateOfWeek.setHours(23, 59, 59, 999);


    return { firstDateOfWeek: firstDateOfWeek.toISOString(), lastDateOfWeek: lastDateOfWeek.toISOString() };

}



export const updateEventsList = (eventsList) => {

    // console.log(events);
    const updatedEventsList = [];

    eventsList.forEach(event => {

        const startTime = new Date(event.start);
        const endTime = new Date(event.end);
        const duration = (endTime.getTime() - startTime.getTime()) / 1000 / 60; // duration in minutes
        const title = event.title;


        let normalizedTitle;

        if (!title) {
            normalizedTitle = normalizedTitleFunction("No title")
        }
        else {
            normalizedTitle = normalizedTitleFunction(title);
        }


        const existingEntry = updatedEventsList.find(entry => entry.title === normalizedTitle);

        if (existingEntry) {
            // If it exists, add the duration
            existingEntry.duration += duration;
        } else {
            // If it doesn't exist, create a new entry
            updatedEventsList.push({ title: normalizedTitle, duration });
        }

    });


    const finalUpdatedEventsList = updatedEventsList
        .sort((a, b) => b.duration - a.duration) // Sort events by duration
        .map(event => {

            const eventName = event.title;
            const totalTimeSpend = convertMinutesToHours(event.duration);
            const perDayTimeSpend = convertMinutesToHours(event.duration / 7);

            return {
                eventName,
                totalTimeSpend,
                perDayTimeSpend
            }

        });


    return finalUpdatedEventsList;

}


export const countTotalTime = (eventsList) => {

    const totalDuration = eventsList.reduce((accumulator, event) => {

        const startTime = new Date(event.start);
        const endTime = new Date(event.end);
        const duration = (endTime.getTime() - startTime.getTime()) / 1000 / 60; // 

        return accumulator + duration;

    }, 0);


    const totalTime = convertMinutesToHours(totalDuration);


    return totalTime;

};