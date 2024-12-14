
export const isTimeStringUTC = (timeString) => {
    const date = new Date(timeString);
    // Check if the time string ends with Z (UTC indicator)
    const isExplicitUTC = timeString.endsWith('Z') || timeString.includes('+00:00') || timeString.includes('-00:00');

    return isExplicitUTC;
}
