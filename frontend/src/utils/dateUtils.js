
export const isToday = (currDate) => {
    const d1 = new Date();
    const d2 = currDate;

    if (d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate()) return true;
    return false;
}

export const isYesterday = (currDate) => {
    const d1 = new Date();
    d1.setDate(d1.getDate() - 1);
    const d2 = currDate;

    if (d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate()) return true;
    return false;
}