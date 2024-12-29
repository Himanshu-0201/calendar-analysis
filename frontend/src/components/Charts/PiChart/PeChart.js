
import { Chart } from "react-google-charts";

const PiChart = ({events})=>{


    const data = [
        ["Task", "Miutes per Day"],
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