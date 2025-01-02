import React, { useState } from 'react';
import { TbLoader3 } from "react-icons/tb";
import PiChart from '../Charts/PiChart/PiChart.tsx'; // Replace with your actual chart component
import MatrixChart from '../Charts/MatrixChart/MatrixChart.tsx'; // Replace with your actual chart component
import Table from '../Table/Table.js'; // Replace with your actual table component

const Dashboard = () => {
    const [loading, setLoading] = useState(false);
    const [viewMode, setViewMode] = useState("day"); // Options: "day", "week", "custom"
    const [customDates, setCustomDates] = useState({ start: "", end: "" });

    const dummyEvents = [
        { id: 1, title: "Event 1", date: "2025-01-01" },
        { id: 2, title: "Event 2", date: "2025-01-02" },
        { id: 3, title: "Event 3", date: "2025-01-03" },
    ]; // Replace with actual events

    const handleViewChange = (mode) => {
        setViewMode(mode);
    };

    const handleCustomDateChange = (e) => {
        const { name, value } = e.target;
        setCustomDates((prev) => ({ ...prev, [name]: value }));
    };

    const handleApplyCustomDates = () => {
        console.log("Custom Dates Applied:", customDates);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Loader */}
            {loading && (
                <div className="flex justify-center items-center p-4">
                    <TbLoader3 className="animate-spin text-lime-300" size={48} />
                </div>
            )}

            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Google Calendar Analysis</h1>
                <div className="flex gap-4 mt-4">
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
                    <button
                        onClick={() => handleViewChange("custom")}
                        className={`px-4 py-2 rounded-lg ${viewMode === "custom" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}
                    >
                        Custom Dates
                    </button>
                </div>
            </div>

            {/* Custom Date Picker */}
            {viewMode === "custom" && (
                <div className="mb-6 p-4 bg-white rounded-lg shadow-md border">
                    <h2 className="text-lg font-semibold mb-4 text-gray-700">Select Custom Date Range</h2>
                    <div className="flex gap-4 items-center">
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Start Date</label>
                            <input
                                type="date"
                                name="start"
                                value={customDates.start}
                                onChange={handleCustomDateChange}
                                className="border rounded-lg p-2 w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">End Date</label>
                            <input
                                type="date"
                                name="end"
                                value={customDates.end}
                                onChange={handleCustomDateChange}
                                className="border rounded-lg p-2 w-full"
                            />
                        </div>
                        <button
                            onClick={handleApplyCustomDates}
                            className="px-4 py-2 bg-green-500 text-white rounded-lg"
                        >
                            Apply
                        </button>
                    </div>
                </div>
            )}

            {/* Main Dashboard */}
            <div className="grid grid-cols-10 gap-4 py-6 bg-gray-50">
                {/* Table Section */}
                <div className="col-span-4 p-4 bg-white rounded-lg shadow-md border">
                    <h2 className="text-lg font-semibold mb-4 text-gray-700">Event Table</h2>
                    {/* <Table events={dummyEvents} importantUrgentCheckedBoxChangeHandler={() => {}} /> */}
                </div>

                {/* Charts Section */}
                <div className="col-span-6 flex flex-wrap gap-4 justify-between w-full">
                    {/* Pie Chart */}
                    <div className="flex-1 p-4 bg-white rounded-lg shadow-md border max-w-full">
                        <h2 className="text-lg font-semibold mb-4 text-gray-700">Pie Chart</h2>
                        <div className="flex justify-center items-center w-full">
                            {/* <PiChart events={dummyEvents} /> */}
                        </div>
                    </div>

                    {/* Matrix Chart */}
                    <div className="flex-1 p-4 bg-white rounded-lg shadow-md border max-w-full">
                        <h2 className="text-lg font-semibold mb-4 text-gray-700">Matrix Chart</h2>
                        <div className="flex justify-center items-center w-full">
                            {/* <MatrixChart MatrixChartData={dummyEvents} /> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
