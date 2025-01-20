import { useSelector } from "react-redux";
import "./TotalTime.scss";
import { calculateTotalTimeSpend } from "../../utils/mathUtils.ts";
import { convertMinutesToHours } from "../../utils/dateUtils.ts";
import { RootState } from "../../app/store.ts";
import React from "react";

const TotalTime = ({events, eventsShowTillCurrentTime})=>{

    // const events = useSelector((state : RootState) => state.dayEvents.events);
    // const eventsShowTillCurrentTime = useSelector((state : RootState) => state.userInfo.eventsShowTillCurrentTime);
    const totalTimeSpendInMin = calculateTotalTimeSpend(events, eventsShowTillCurrentTime);
    const totalTimeSpend = convertMinutesToHours(totalTimeSpendInMin);


    return (

        // #B0C4DE bg color
        <div className="_total-time flex flex-row space-y-2 sm:space-y-0 sm:space-x-4 px-2.5 py-4 border-2 gap-4 rounded-md">
            <div className="flex items-center truncate">
                <p className="text-sm sm:text-base"> Total time registered</p>
            </div>
            <div className="font-bold font-bold truncate !mt-0">
                <p className="text-base sm:text-lg">{totalTimeSpend}</p>
            </div>
        </div>
    )
}

export default TotalTime;