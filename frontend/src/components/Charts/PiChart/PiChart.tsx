


import React from "react";
import { Chart } from "react-google-charts";

import { PiChartEventsType } from "../../../models/utilsModels";

interface PiChartEventTypeObject {
    events: PiChartEventsType
}

const PiChart : React.FC<PiChartEventTypeObject> = ({events} )=>{


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