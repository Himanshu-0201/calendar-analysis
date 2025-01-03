// I want to collepse border for outer div

import React from "react";
import Calendar from "../../components/Calendar/Calendar.tsx";
import TotalTime from "../TotalTime/TotalTime.tsx";
import "./DayTimeZone.scss";
import { RootState } from "../../app/store.ts";
import { useSelector } from "react-redux";

const DayTimeZone = () => {

    const events = useSelector((state: RootState) => state.dayEvents.events);

    // make it day base, not user base
    const eventsShowTillCurrentTime = useSelector((state: RootState) => state.userInfo.eventsShowTillCurrentTime);

    return (
        <div className="_time-zone-container flex border-2" >
            <Calendar />
            <div className="self-center ml-auto">
                <TotalTime
                    events={events}
                    eventsShowTillCurrentTime={eventsShowTillCurrentTime}
                />
            </div>
        </div>
    )
}

export default DayTimeZone;