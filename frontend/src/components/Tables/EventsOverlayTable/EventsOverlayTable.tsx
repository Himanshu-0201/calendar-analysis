import React, { useState } from "react";
import { OverlayTableElement } from "../../../models/TablesModels";
import { FaChevronDown } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa6";
import { title } from "process";


interface OverlayTableProps {
    tableEvents: OverlayTableElement[];
}


const EventsOverlayTable: React.FC<OverlayTableProps> = ({ tableEvents }) => {


    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    const toggleActiveIndex = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    // console.log(tableEvents);
    let tableTitle = "";
    if (tableEvents.length > 0) {
        tableTitle = tableEvents[0].title;
    }

    const content = (tableEvents.map((event, index) => (
        <div key={index} className="bg-white shadow-lg rounded-lg p-2">
            <div className="flex items-center justify-between">
                {/* Display Date */}
                <span className="text-base font-semibold text-blue-600">
                    {event.date}
                </span>

                {/* Display Total Time for the Day */}
                <span className="text-base font-semibold text-gray-600">
                    {`Total duration : ${event.totalDurationForDay}`} {/* You can format this as needed */}
                </span>

                {/* Toggle Button */}
                <button
                    onClick={() => toggleActiveIndex(index)}
                    className="bg-blue-500 text-white px-2 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                    {activeIndex === index ? <FaChevronDown /> : <FaAngleRight />}
                </button>
            </div>


            {/* Scrollable Table */}
            {activeIndex === index && (
                <div className="overflow-x-auto mt-3 max-h-48 border-t border-gray-300">
                    <table className="w-full table-auto border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 p-2 text-center text-sm font-medium text-gray-700">
                                    Start Time
                                </th>
                                <th className="border border-gray-300 p-2 text-center text-sm font-medium text-gray-700">
                                    End Time
                                </th>
                                <th className="border border-gray-300 p-2 text-center text-sm font-medium text-gray-700">
                                    Duration
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {event.events.map((singleEvent: any, idx: number) => (
                                <tr key={idx} className="hover:bg-gray-50 transition-all">
                                    <td className="border border-gray-300 text-center p-2 text-gray-600">
                                        {singleEvent.start}
                                    </td>
                                    <td className="border border-gray-300 text-center p-2 text-gray-600">
                                        {singleEvent.end}
                                    </td>
                                    <td className="border border-gray-300 text-center p-2 text-gray-600">
                                        {singleEvent.duration}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )))



    return (
        <div className="p-6 max-w-4xl mx-auto space-y-6">
            <h3 className="text-lg font-bold  text-gray-800 mt-4 mb-4">
                {`Event : ${tableTitle}`}
            </h3>
            {content}
        </div>
    );
};

export default EventsOverlayTable;
