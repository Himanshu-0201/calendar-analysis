
export const isTimeStringUTC = (timeString) => {
    const date = new Date(timeString);
    // Check if the time string ends with Z (UTC indicator)
    const isExplicitUTC = timeString.endsWith('Z') || timeString.includes('+00:00') || timeString.includes('-00:00');

    return isExplicitUTC;
}


export const findMinTime = (timeA, timeB) => {

    const dateA = new Date(timeA); // Convert timeA to a Date object
    const dateB = new Date(timeB); // Convert timeB to a Date object

    // Compare the two dates and return the earlier one as a UTC string
    return dateA < dateB ? dateA.toISOString() : dateB.toISOString();

}

export const findMaxTime = (timeA, timeB) => {

    const dateA = new Date(timeA); // Convert timeA to a Date object
    const dateB = new Date(timeB); // Convert timeB to a Date object

    // Compare the two dates and return the after one as a UTC string
    return dateA > dateB ? dateA.toISOString() : dateB.toISOString();
}