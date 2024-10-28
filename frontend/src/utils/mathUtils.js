

export const convertMinutesToHours = (minutes) => {
    const hours = Math.floor(minutes / 60); // Calculate full hours
    const remainingMinutes = minutes % 60;   // Calculate remaining minutes

    // Return the result in the desired format
    return `${hours} Hr ${remainingMinutes} Min`;
}

export const calPercentage = (part, total)=>{
    if (total === 0) {
        throw new Error("Total value cannot be zero."); // Handle division by zero
    }
    
    const percentage = (part / total) * 100; // Calculate percentage
    return percentage.toFixed(2); // Return percentage roun
}


// this is for cal time only
export const calculateTotalTimeSpend = (events)=>{

    let totalTime = 0;

    events.forEach(event => {
        totalTime += event.duration;
    });

    return totalTime;
}