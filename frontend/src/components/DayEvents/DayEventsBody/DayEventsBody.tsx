
import PiChart from "../../Charts/PiChart/PiChart.tsx";
import React, { useEffect, useState } from "react";
import { useError } from "../../../hooks/useError.ts";
import Table from "../../Table/Table.tsx";
import { useSelector, useDispatch } from "react-redux";
import { TbLoader3 } from "react-icons/tb";
import axios from "axios";
import Cookies from "js-cookie";
import config from "../../../config";
import { updateEvents, updateUser, userSingOut } from "../../../features/userInfoSlice/userInfoSlice.ts";
import { modifyEventsForMatrixChart, normalizedTitleFunction , modifyEventsForDayEventsTable, modifyEventsForPieChart } from "../../../utils/mathUtils.ts";
import MatrixChart from "../../Charts/MatrixChart/MatrixChart.tsx";

import "./DayEventsBody.scss";
import { RootState } from "../../../app/store.ts";


const DayEventsBody = ({ loaderClose }) => {

    const [loading, setLoading] = useState(true);

    // make it more correct , you shouldn't define it like this
       const { throwError = (error: any) => console.error("throwError is undefined", error) } = useError();

    const currDateStr = useSelector((state : RootState) => state.userInfo.currDate);
    const eventsList = useSelector((state : RootState) => state.userInfo.events);
    const dispatch = useDispatch();


    const eventsShowTillCurrentTime = useSelector((state : RootState) => state.userInfo.eventsShowTillCurrentTime);

    const tableEvents = modifyEventsForDayEventsTable(eventsList, eventsShowTillCurrentTime);
    const piChartEvents = modifyEventsForPieChart(eventsList, eventsShowTillCurrentTime);
    const MatrixChartData = modifyEventsForMatrixChart(eventsList, eventsShowTillCurrentTime);








    useEffect(() => {


        const controller = new AbortController();


        const fetchData = async () => {

            setLoading(true);

            try {

                // Parse the date string to create a Date object
                const startTime = new Date(currDateStr);


                // Set to local time zone with 0 hr, 0 min, 0 sec, and 0 ms
                startTime.setHours(0, 0, 0, 0);

                const endTime = new Date(currDateStr);

                // Set to local time zone with 23 hr, 59 min, 59 sec, and  999ms
                endTime.setHours(23, 59, 59, 999);

                const startStr = startTime.toISOString();
                const endStr = endTime.toISOString();

                const url = `${config.eventsData}?start=${encodeURIComponent(startStr)}&end=${encodeURIComponent(endStr)}`;


                const response = await axios({
                    signal: controller.signal,
                    method: "GET",
                    url: url,
                    withCredentials: true,
                    timeout: 60000
                })

                // console.log("response " + response);


                if (response.status == 200) {
                    const data = response.data;

                    const userName = data.userName;
                    const resposeEvents = data.events;

                    const events = resposeEvents.map((event) => {
                        return {
                            ...event,
                            isImportant: true,
                            isUrgent: false
                        }
                    })


                    const eventsShowTillCurrentTimeFromCookie = Cookies.get("eventsShowTillCurrentTime") || "false";

                    let eventsShowTillCurrentTime = false

                    if (eventsShowTillCurrentTimeFromCookie && eventsShowTillCurrentTimeFromCookie === "true") {
                        eventsShowTillCurrentTime = true;
                    }


                    dispatch(updateUser({ name: userName, events: events, currDate: currDateStr, eventsShowTillCurrentTime }));

                }
                else {
                    console.log("auth failed, task.js")
                }

            } catch (error) {

                if (error.response && error.response.status === 401) {
                    dispatch(userSingOut());
                }
                else {
                    throwError(error);
                }

            }
            finally {


                loaderClose();  // if request failed , then I need to close the loading state
                setLoading(false);

            }



        }

        fetchData();


        return () => {
            controller.abort()
        }


    }, [currDateStr]);



    const importantUrgentCheckedBoxChangeHandler = (e, eventTitle, checkboxType) => {


        const events = eventsList.map((event) => {



            if (normalizedTitleFunction(eventTitle) === normalizedTitleFunction(event.title)) {


                if (checkboxType === "important") {

                    return {
                        ...event,
                        isImportant: e.target.checked
                    }

                }
                else {
                    return {
                        ...event,
                        isUrgent: e.target.checked
                    }
                }
            }
            else {
                return {
                    ...event
                }
            }

        });


        dispatch(updateEvents({ events }));

    }


    return (

        <>

            {loading ?

                <div className="flex justify-center items-center p-4">
                    <TbLoader3 className="animate-spin text-lime-300" size={48} /> {/* Customize size and color */}
                </div>

                :

                <div className="grid grid-cols-10 gap-4  py-6 bg-gray-50">
                    {/* Table Section */}
                    <div className="col-span-4 p-4 bg-white rounded-lg shadow-md border">
                        <h2 className="text-lg font-semibold mb-4 text-gray-700">Event Table</h2>
                        <Table
                            events={tableEvents}
                            importantUrgentCheckedBoxChangeHandler={importantUrgentCheckedBoxChangeHandler}
                        />
                    </div>

                    {/* Charts Section */}
                    <div className="col-span-6 flex flex-wrap gap-4 justify-between w-full">
                        {/* Pie Chart */}
                        <div className="flex-1 p-4 bg-white rounded-lg shadow-md border max-w-full">
                            <h2 className="text-lg font-semibold mb-4 text-gray-700">Pie Chart</h2>
                            <div className="_day-pie-chart-container flex justify-center items-center w-full">
                                <PiChart events={piChartEvents} />
                            </div>
                        </div>

                        {/* Matrix Chart */}
                        <div className="flex-1 p-4 bg-white rounded-lg shadow-md border max-w-full">
                            <h2 className="text-lg font-semibold mb-4 text-gray-700">Matrix Chart</h2>
                            <div className="_day-event_matrix-chart-container flex justify-center items-center w-full">
                                <MatrixChart MatrixChartData={MatrixChartData} />
                            </div>
                        </div>
                    </div>


                </div>

            }

        </>

    )
}

export default DayEventsBody;