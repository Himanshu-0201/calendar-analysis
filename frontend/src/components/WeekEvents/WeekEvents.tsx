import React, { useState } from "react";
import LayOut from "../LayOut/LayOut.tsx";
import AppContent from "../AppContent/AppContent.tsx";
import Cookies from "js-cookie";
import { getStartAndEndOfWeek } from "../../utils/dateUtils.ts";
import { useSelector } from "react-redux";
import Nav from "../../Ui/Nav/Nav.tsx";
import { updateEvents } from "../../features/weekEventsSlice/weekEventsSlice.ts";
import { RootState } from "../../app/store.ts";
import Loader from "../../Ui/Loader/Loader.tsx";
import WeekTimeZone from "./WeekTimeZone/WeekTimeZone.tsx";

const WeekEvents = () => {

    const [isLoading, setIsLoading] = useState(true);
    const eventsList = useSelector((state: RootState) => state.weekEvents.events);
    const currDateStr = useSelector((state: RootState) => state.weekEvents.currDate);

    // Parse the date string to create a Date object
    const currDate = new Date();
    const { startOfWeek, endOfWeek } = getStartAndEndOfWeek(currDate);


    const startOfWeekStr = startOfWeek.toISOString();
    const endOfWeekStr = endOfWeek.toISOString();

    const eventsShowTillCurrentTimeFromCookie = Cookies.get("eventsShowTillCurrentTime") || "false";

    let eventsShowTillCurrentTime = false;
    if (eventsShowTillCurrentTimeFromCookie && eventsShowTillCurrentTimeFromCookie === "true") {
        eventsShowTillCurrentTime = true;
    }



    const handleLoaderClose = (event: any) => {
        setIsLoading(false);
    }

    return (

        <>

            {isLoading && <Loader />}

            <LayOut>

                <div>
                    <Nav />
                    <WeekTimeZone />
                </div>

                <AppContent

                    startTime={startOfWeekStr}
                    endTime={endOfWeekStr}
                    eventsShowTillCurrentTime={eventsShowTillCurrentTime}
                    updateEvents={updateEvents}
                    eventsList={eventsList}
                    loaderClose={handleLoaderClose}
                    currDateStr={currDateStr}
                />

            </LayOut>
        </>
    )
}

export default WeekEvents;