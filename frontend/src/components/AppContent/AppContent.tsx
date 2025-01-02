import React, { useEffect } from "react";
import config from "../../config.js";
import axios from "axios";
import { useError } from "../../hooks/useError.ts";
import { useDispatch, useSelector } from "react-redux";
import { modifyEventsForPieChart, modifyEventsForMatrixChart, modifyEventsForTable, normalizedTitleFunction } from "../../utils/mathUtils.ts";
import MatrixChart from "../Charts/MatrixChart/MatrixChart.tsx";
import PiChart from "../Charts/PiChart/PiChart.tsx";
import Table from "../Table/Table.tsx";
import { RootState } from "../../app/store.ts";


const AppContent = ({ startTime, endTime, eventsList, currDateStr, eventsShowTillCurrentTime, updateEvents }) => {



    const { throwError = (error: any) => console.error("throwError is undefined", error) } = useError();

    const dispatch = useDispatch();

    // const isUserSingedIn = useSelector((state: RootState) => state.userInfo.isSingedIn);
    const isUserSingedIn = false;

    const piChartEvents = modifyEventsForPieChart(eventsList, eventsShowTillCurrentTime);
    const tableEvents = modifyEventsForTable(eventsList, eventsShowTillCurrentTime);
    const MatrixChartData = modifyEventsForMatrixChart(eventsList, eventsShowTillCurrentTime);


    useEffect(() => {

        const controller = new AbortController();

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
                        console.log("setting user info");
                        // dispatch(setUserInfo({ name: userName, isUSerSingedIn: true, eventsShowTillCurrentTime }));
                    }

                    dispatch(updateEvents({ events }));

                }



            } catch (error) {

                if (error.response && error.response.status === 401) {

                    // define it
                    // dispatch(userSingOut());
                }
                else {
                    throwError(error);
                }
            }
            finally {
                // define it 
            }

        };

        fetchData();

        return () => {
            controller.abort()
        }

    }, []);

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
    )
};

export default AppContent;