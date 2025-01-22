import React, { useEffect, useState } from "react";
import config from "../../config.js";
import axios from "axios";
import { useError } from "../../hooks/useError.ts";
import { useDispatch, useSelector } from "react-redux";
import { modifyEventsForPieChart, modifyEventsForMatrixChart, modifyEventsForTable, normalizedTitleFunction } from "../../utils/mathUtils.ts";
import MatrixChart from "../Charts/MatrixChart/MatrixChart.tsx";
import PiChart from "../Charts/PiChart/PiChart.tsx";
import Table from "../Table/Table.tsx";
import { RootState } from "../../app/store.ts";
import { TbLoader3 } from "react-icons/tb";


import { updateUserInfo } from "../../features/userInfoSlice/userInfoSlice.ts";
import { handleSingOut } from "../../utils/authUtils.ts";


const AppContent = ({ startTime, endTime, currDateStr, eventsList, eventsShowTillCurrentTime, updateEvents, loaderClose }) => {


    const [loading, setLoading] = useState(true);
    const { throwError = (error: any) => console.error("throwError is undefined", error) } = useError();

    const dispatch = useDispatch();

    const isUserSingedIn = useSelector((state: RootState) => state.userInfo.isSignedIn);

    const piChartEvents = modifyEventsForPieChart(eventsList, eventsShowTillCurrentTime);
    const tableEvents = modifyEventsForTable(eventsList, eventsShowTillCurrentTime);
    const MatrixChartData = modifyEventsForMatrixChart(eventsList, eventsShowTillCurrentTime);


    useEffect(() => {

        const controller = new AbortController();
        setLoading(true);


        const fetchData = async () => {

            // Parse the date string to create a Date object
            const startTimeStr = startTime;
            const endTimeStr = endTime;

            const url = `${config.eventsData}?start=${encodeURIComponent(startTimeStr)}&end=${encodeURIComponent(endTimeStr)}`;


            try {

                const response = await axios({
                    signal: controller.signal,
                    method: "GET",
                    url: url,
                    withCredentials: true,
                    timeout: 60000
                })


                if (response.status === 200) {

                    const data = response.data;

                    const userName = data.userName;
                    const resposeEvents = data.events;

                    const events = resposeEvents;

                    if (isUserSingedIn === false) {
                        dispatch(updateUserInfo({ name: userName, isSignedIn: true, eventsShowTillCurrentTime }));
                    }

                    dispatch(updateEvents({ events }));

                    setLoading(false);
                }



            } catch (error) {

                if (axios.isCancel(error)) {
                    // nothing to do, 
                }
                else if (error.response && error.response.status === 401) {
                    handleSingOut();
                }
                else {
                    throwError(error);
                }
            }
            finally {

                loaderClose();

            }

        };

        fetchData();

        return () => {
            controller.abort()
        }

    }, [currDateStr]);



    const importantUrgentCheckedBoxChangeHandler = async (e, eventTitle: string, checkboxType: string) => {

        const updatedEvents: { event_name: string, isImportant: boolean, isUrgent: boolean }[] = [];
        const updatedEventsNameSet = new Set<string>();

        const events = eventsList.map((event) => {

            if (normalizedTitleFunction(eventTitle) === normalizedTitleFunction(event.title)) {

                let updatedEvent;

                if (checkboxType === "important") {

                    updatedEvent = {
                        ...event,
                        isImportant: e.target.checked
                    }

                }
                else {

                    updatedEvent = {
                        ...event,
                        isUrgent: e.target.checked
                    }
                }

                const updatedEventTitle = normalizedTitleFunction(updatedEvent.title);

                if (!updatedEventsNameSet.has(updatedEventTitle)) {

                    updatedEventsNameSet.add(updatedEventTitle);
                    updatedEvents.push({
                        event_name: updatedEventTitle || "Default Event",  // Provide fallback value
                        isImportant: updatedEvent?.isImportant ?? false, // Use nullish coalescing for boolean defaults
                        isUrgent: updatedEvent?.isUrgent ?? false
                    });

                }

                return updatedEvent;
            }
            else {
                return {
                    ...event
                }
            }

        });

        dispatch(updateEvents({ events }));


        // update in the db about events

        const requestBody = {
            eventsList: updatedEvents
        }


        try {

            const response = await axios.post(`http://localhost:8000/update-event-details`, requestBody, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true, // Send cookies with the request
            });

        } catch (error) {

            console.log(error);

        }

    }


    return (

        <>
            {
                loading ?

                    <div className="flex justify-center items-center p-4">
                        <TbLoader3 className="animate-spin text-lime-300" size={48} /> {/* Customize size and color */}
                    </div>

                    :

                    <div className="grid grid-cols-1 gap-4  py-6 bg-gray-50 pt-[5px] md:grid-cols-10">
                        {/* Table Section */}
                        <div className="col-span-1 md:col-span-6 xl:col-span-4  p-4 bg-white rounded-lg shadow-md border">
                            <h2 className="text-lg font-semibold mb-4 text-gray-700">Event Table</h2>
                            <Table
                                events={tableEvents}
                                importantUrgentCheckedBoxChangeHandler={importantUrgentCheckedBoxChangeHandler}
                            />
                        </div>

                        {/* Charts Section */}
                        <div className="col-span-1 md:col-span-4 xl:col-span-6 flex flex-col xl:flex-row xl:flex-wrap gap-4 justify-between w-full">
                            {/* Pie Chart */}
                            <div className="flex-1 p-4 bg-white rounded-lg shadow-md border w-full">
                                <h2 className="text-lg font-semibold mb-4 text-gray-700">Pie Chart</h2>
                                <div className="_day-pie-chart-container flex justify-center items-center w-full">
                                    <PiChart events={piChartEvents} />
                                </div>
                            </div>

                            {/* Matrix Chart */}
                            <div className="flex-1 p-4 bg-white rounded-lg shadow-md border w-full">
                                <h2 className="text-lg font-semibold mb-4 text-gray-700">Matrix Chart</h2>
                                <div className="_day-event_matrix-chart-container flex justify-center items-center w-full">
                                    <MatrixChart MatrixChartData={MatrixChartData} />
                                </div>
                            </div>
                        </div>

                    </div>}
        </>
    )
};

export default AppContent;