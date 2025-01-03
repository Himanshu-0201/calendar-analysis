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
        <div className="_total-time flex space-x-4 px-2.5 py-4 border-2 rounded-md">
            <div className="">
                <p> Total time registered</p>
            </div>
            <div className="font-bold">
                <p>{totalTimeSpend}</p>
            </div>
        </div>
    )
}

export default TotalTime;