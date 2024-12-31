
import React from "react";
import MatrixChart from "../Charts/MatrixChart/MatrixChart.tsx";
import { useSelector } from "react-redux";
import {  modifyEventsForMatrixChart } from "../../utils/mathUtils.ts";

const Test = () => {

    const eventsList = useSelector((state: any) => state.userInfo.events);
    const eventsShowTillCurrentTime = useSelector((state: any) => state.userInfo.eventsShowTillCurrentTime);
    const MatrixChartData = modifyEventsForMatrixChart(eventsList, eventsShowTillCurrentTime);



    return (

        <MatrixChart
            MatrixChartData={MatrixChartData}
        />
    )

};

export default Test;
