import React from 'react';
import "./MatrixChart.scss";
import { MatrixChartProp } from '../../../models/ChartModels';


interface MatrixChartPropObject {
    MatrixChartData: MatrixChartProp
}

const MatrixChart: React.FC<MatrixChartPropObject> = ({ MatrixChartData }) => {


    const [importantUrgent, importantNotUrgent, notImportantUrgent, notImportantNotUrgent] = MatrixChartData;

    return (

        <div className='grid grid-cols-11 gap-2'>
            {/* <div >01</div> */}
            <div className='_matrix_reactangle col-start-2 col-span-5 '>Urgent</div>
            <div className=' _matrix_reactangle col-span-5'>Not Urgent</div>
            <div className='_matrix_reactangle _matrix_custom-vertical-text'>Important</div>
            <div className='_matrix_box-1 col-start-2 _matrix-square '>
                <p>{importantUrgent} %</p>
            </div>
            <div className='_matrix_box-2 _matrix-square'>
                <p>{importantNotUrgent} %</p>
            </div>
            <div className='_matrix_reactangle _matrix_custom-vertical-text'>Not Important</div>
            <div className='_matrix_box-3 col-start-2 _matrix-square'>
                <p>{notImportantUrgent} %</p>
            </div>
            <div className='_matrix_box-4 _matrix-square'>
                <p>{notImportantNotUrgent} %</p>
            </div>
        </div>
    )
}

export default MatrixChart;