import React from "react";
import LayOut from "../LayOut/LayOut.tsx";
import AppContent from "../AppContent/AppContent.tsx";
import Cookies from "js-cookie";
import { getStartAndEndOfWeek } from "../../utils/dateUtils.ts";
import { useSelector } from "react-redux";
import Nav from "../../Ui/Nav/Nav.tsx";
import { updateEvents } from "../../features/weekEventsSlice/weekEventsSlice.ts";

const WeekEvents = () => {

    // Parse the date string to create a Date object
    const currDate = new Date();
    const { startOfWeek, endOfWeek } = getStartAndEndOfWeek(currDate);
    const eventsList = useSelector((state: any) => state.weekEvents.events);


    const startOfWeekStr = startOfWeek.toISOString();
    const endOfWeekStr = endOfWeek.toISOString();

    const eventsShowTillCurrentTimeFromCookie = Cookies.get("eventsShowTillCurrentTime") || "false";

    let eventsShowTillCurrentTime = false;
    if (eventsShowTillCurrentTimeFromCookie && eventsShowTillCurrentTimeFromCookie === "true") {
        eventsShowTillCurrentTime = true;
    }

    return (

        <LayOut>
            <div>
               <Nav />
            </div>

            <AppContent

                startTime={startOfWeekStr}
                endTime={endOfWeekStr}
                eventsShowTillCurrentTime={eventsShowTillCurrentTime}
                currDateStr={currDate.toISOString()}
                updateEvents={updateEvents}
                eventsList={eventsList}

            />

        </LayOut>
    )
}

export default WeekEvents;