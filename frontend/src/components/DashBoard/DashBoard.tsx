import React, { useState } from 'react';
import { TbLoader3 } from "react-icons/tb";
import PiChart from '../Charts/PiChart/PiChart.tsx'; // Replace with your actual chart component
import MatrixChart from '../Charts/MatrixChart/MatrixChart.tsx'; // Replace with your actual chart component
import Table from '../Table/Table.js'; // Replace with your actual table component
import DayEvents from '../DayEvents/DayEvents.tsx';
import WeekEvents from '../WeekEvents/WeekEvents.tsx';
import Nav from '../../Ui/Nav/Nav.tsx';

const Dashboard = () => {
    const [viewMode, setViewMode] = useState("day"); // Options: "day", "week", "custom"




    const handleViewChange = (mode : string) => {
        setViewMode(mode);
    };



    return (
        <div className="min-h-screen bg-gray-100 px-4 sm:px-8 py-4 pb-0">

            <Nav />

            {/* Header */}
            <div className="mb-6">
                <div className="flex flex-row gap-4 sm:gap-6">
                    <button
                        onClick={() => handleViewChange("day")}
                        className={`px-4 py-2 rounded-lg ${viewMode === "day" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}
                    >
                        Day
                    </button>
                    <button
                        onClick={() => handleViewChange("week")}
                        className={`px-4 py-2 rounded-lg ${viewMode === "week" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}
                    >
                        Week
                    </button>
                </div>
                
            </div>

            {viewMode === "day" &&  <DayEvents />}
            {viewMode === "week" && <WeekEvents />}

        </div>
    );
};

export default Dashboard;
