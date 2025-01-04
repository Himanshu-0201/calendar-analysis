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


import { updateUserInfo, userSingOut } from "../../features/userInfoSlice/userInfoSlice.ts";


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

                    const events = resposeEvents.map((event) => {
                        return {
                            ...event,
                            isImportant: true,
                            isUrgent: false
                        }
                    });

                    if (isUserSingedIn === false) {
                        dispatch(updateUserInfo({ name: userName, isSignedIn: true, eventsShowTillCurrentTime }));
                    }

                    dispatch(updateEvents({ events }));

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

                setLoading(false);
                loaderClose();

            }

        };

        fetchData();

        return () => {
            controller.abort()
        }

    }, [currDateStr]);

    // define depandancies


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
            {
                loading ?

                    <div className="flex justify-center items-center p-4">
                        <TbLoader3 className="animate-spin text-lime-300" size={48} /> {/* Customize size and color */}
                    </div>

                    :

                    <div className="grid grid-cols-10 gap-4  py-6 bg-gray-50 pt-[5px]">
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

                    </div>}
        </>
    )
};

export default AppContent;