import React from "react";
import { getWeekBounds, getDate } from "../../../utils/dateUtils.ts"; // Ensure these functions are correctly imported

import { RiArrowLeftWideFill, RiArrowRightWideFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store.ts";
import { updateCurrDate } from "../../../features/weekEventsSlice/weekEventsSlice.ts";

const WeekRangeControls = () => {

    const currDate = useSelector((state: RootState) => state.weekEvents.currDate);
    const isSignedIn = useSelector((state: RootState) => state.userInfo.isSignedIn);
    const dispatch = useDispatch();

    const { firstDateOfWeek, lastDateOfWeek } = getWeekBounds(currDate);

    const firstDateStr = getDate(firstDateOfWeek);
    const lastDateStr = getDate(lastDateOfWeek);

    const weekBoundStr = `${firstDateStr}   -   ${lastDateStr}`;

    const incrementWeek = () => {
        const date = new Date(currDate);
        date.setDate(date.getDate() + 7);
        dispatch(updateCurrDate(date.toISOString()));
    };

    const decrementWeek = () => {
        const date = new Date(currDate);
        date.setDate(date.getDate() - 7);
        dispatch(updateCurrDate(date.toISOString()));
    };

    return (
        <div className=" flex flex-row justify-between items-center text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm text-center py-2.5 sm:gap-4 sm:gap-0">
            <button
                disabled={!isSignedIn}
                className="flex items-center justify-center px-2 py-2"
                onClick={decrementWeek}
            >
                <RiArrowLeftWideFill className="text-xl" />
            </button>
            <div className="flex items-center justify-center gap-2 text-center">
                {weekBoundStr}
            </div>
            <button
                disabled={!isSignedIn}
                className="flex items-center justify-center px-2 py-2"
                onClick={incrementWeek}
            >
                <RiArrowRightWideFill className="text-xl" />
            </button>
        </div>
    );
};

export default WeekRangeControls;
