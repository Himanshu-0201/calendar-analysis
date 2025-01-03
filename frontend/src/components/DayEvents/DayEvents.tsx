import React, { useState } from "react";
import LayOut from "../LayOut/LayOut.tsx";
import Nav from "../../Ui/Nav/Nav.tsx";
import DayTimezone from "../../Ui/DayTimeZone/DayTimeZone.tsx";
import Loader from "../../Ui/Loader/Loader.tsx";
import { RootState } from "../../app/store.ts";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { updateEvents } from "../../features/dayEventsSlice/dayEventsSlice.ts";
import AppContent from "../AppContent/AppContent.tsx";

const DayEvents = () => {


    const [isLoading, setIsLoading] = useState(true);

    const currDateStr = useSelector((state: RootState) => state.dayEvents.currDate);
    // const eventsShowTillCurrentTime = useSelector((state: RootState) => state.userInfo.eventsShowTillCurrentTime);
    const eventsList = useSelector((state: RootState) => state.dayEvents.events);


    const startTime = new Date(currDateStr);
    startTime.setHours(0, 0, 0, 0);

    const endTime = new Date(currDateStr);
    endTime.setHours(23, 59, 59, 999);

    const startStr = startTime.toISOString();
    const endStr = endTime.toISOString();

    const eventsShowTillCurrentTimeFromCookie = Cookies.get("eventsShowTillCurrentTime") || "false";

    let eventsShowTillCurrentTime = false

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
                    <DayTimezone />
                </div>

                <AppContent

                    startTime={startStr}
                    endTime={endStr}
                    eventsList={eventsList}
                    eventsShowTillCurrentTime = {eventsShowTillCurrentTime}
                    updateEvents = {updateEvents}
                    loaderClose={handleLoaderClose}
                    currDateStr  = {currDateStr}

                />


            </LayOut>

        </>

    )

};


export default DayEvents;