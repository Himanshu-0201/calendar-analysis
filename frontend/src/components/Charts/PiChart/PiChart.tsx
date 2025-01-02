


import React from "react";
import { Chart } from "react-google-charts";
import { PiChartEventType } from "../../../models/ChartModels";

interface EventsType {
    events: PiChartEventType[]
}

const PiChart : React.FC<EventsType> = ({events} )=>{


    const data : [string, string | number] []= [
        ["Task", "Minutes per Day"],
        ...events
    ];

    return (
        <Chart
            width={'100%'}
            height={'300px'}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={data}
            options={{
                title: 'My Daily Activities',
            }}
        />
    );
};

export default PiChart;