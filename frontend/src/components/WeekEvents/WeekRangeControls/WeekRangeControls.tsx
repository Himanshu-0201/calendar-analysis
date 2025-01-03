import React from "react";
import { getWeekBounds, getDate } from "../../../utils/dateUtils.ts"; // Ensure these functions are correctly imported

import { RiArrowLeftWideFill, RiArrowRightWideFill  } from "react-icons/ri";

const WeekRangeControls = () => {
    const currDate = new Date();
    const { firstDateOfWeek, lastDateOfWeek } = getWeekBounds(currDate);

    const firstDateStr = getDate(firstDateOfWeek);
    const lastDateStr = getDate(lastDateOfWeek);

    const weekBoundStr = `${firstDateStr}   -   ${lastDateStr}`;

    return (
        <div className="flex justify-between items-center text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm text-center">
            <button
                className="flex items-center px-4 py-2"
            >
                <RiArrowLeftWideFill className="text-xl" />
            </button>
            <div className="flex items-center gap-2">
                {weekBoundStr}
            </div>
            <button
                className="flex items-center px-4 py-2"
            >
                <RiArrowRightWideFill className="text-xl" />
            </button>
        </div>
    );
};

export default WeekRangeControls;
