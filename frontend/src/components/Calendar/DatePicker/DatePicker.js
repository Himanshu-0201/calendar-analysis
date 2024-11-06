
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Date picker styles


import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

import { isToday } from "../../../utils/dateUtils";
import { useRef } from "react";
import useOutSideClick from "../../../hooks/useOutSideClick";


const CustomDatePicker = ({ selectedDate, handleDateChange, handleCloseDatePicker }) => {

    const customDatePickerRef = useRef(null);

    useOutSideClick(customDatePickerRef, () => {
        handleCloseDatePicker();
    });


    return (

        <>
            <div className="absolute z-10 mt-2 bg-white rounded-lg shadow-lg border border-gray-300"

                ref={customDatePickerRef}
            >
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    className="block w-full border-none p-2 focus:ring-0 focus:outline-none"
                    inline
                    calendarClassName="bg-white rounded-lg"

                    dayClassName={(date) => {
                        return isToday(date) ? 'bg-blue-100 font-bold rounded-full' : 'hover:bg-gray-200 rounded-full';
                    }}

                    renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
                        <div className="flex justify-between items-center bg-purple-600 text-white p-2 rounded-t-lg">
                            <button onClick={decreaseMonth} className="hover:bg-purple-500 p-1 rounded">
                                <FaAngleLeft />
                            </button>
                            <span className="font-bold">
                                {date.toLocaleString("default", { month: "long" })} {date.getFullYear()}
                            </span>
                            <button onClick={increaseMonth} className="hover:bg-purple-500 p-1 rounded">
                                <FaAngleRight />
                            </button>
                        </div>
                    )}
                />
            </div>
        </>
    )
};

export default CustomDatePicker;