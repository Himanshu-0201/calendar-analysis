import React, { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { AiOutlineCalendar } from "react-icons/ai"; // Calendar icon
import "react-datepicker/dist/react-datepicker.css"; // Date picker styles
import "./Calendar.scss"; // Your styles
import { useDispatch, useSelector } from "react-redux";
import { updateCurrDate } from "../../features/dayEventsSlice/dayEventsSlice.ts";
import { isToday, isYesterday } from "../../utils/dateUtils.ts";
import CustomDatePicker from "./DatePicker/DatePicker";
import { RootState } from "../../app/store.ts";

const Calendar = () => {
    const currDateStr = useSelector((state : RootState) => state.dayEvents.currDate);
    const dispatch = useDispatch();
    const currDate = new Date(currDateStr);


    const isSignedIn = useSelector((state : RootState) => state.userInfo.isSignedIn);

    // State to manage the date picker visibility
    const [isDatePickerOpen, setDatePickerOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(currDate);

    const getDate = (date : Date) => {
        const day = date.getDate();
        const monthName = date.toLocaleDateString("en-US", { month: "short" });
        const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
        return `${dayName}, ${day} ${monthName}`;
    };

    const increaseDate = () => {
        const newDate = new Date(currDate);
        newDate.setDate(newDate.getDate() + 1);
        dispatch(updateCurrDate(newDate.toISOString()));
    };

    const decreaseDate = () => {
        const newDate = new Date(currDate);
        newDate.setDate(newDate.getDate() - 1);
        dispatch(updateCurrDate(newDate.toISOString()));
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        dispatch(updateCurrDate(date.toISOString()));
        setDatePickerOpen(false); // Close the date picker after selection
    };

    const dayDisplay = isToday(currDate)
        ? "Today"
        : isYesterday(currDate)
            ? "Yesterday"
            : getDate(currDate);

    return (
        <div className="justify-start max-w-[200px] ">
            <div className="_calendar-buttons-container flex items-center text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm py-2.5 text-center">
                {/* Left Arrow */}
                <div className="sm:w-1/6 md:w-1/4">
                    <button
                        disabled={!isSignedIn}
                        type="button"
                        onClick={decreaseDate}>
                        <FaAngleLeft />
                    </button>
                </div>

                {/* Middle Text and Calendar Icon */}
                <div className="w-1/2 flex items-center justify-center">
                    <button
                        disabled={!isSignedIn}
                        type="button"
                        className="flex items-center space-x-2 cursor-pointer"
                        onClick={() => setDatePickerOpen((prev) => !prev)}
                    >
                        <span className="whitespace-nowrap text-xs sm:text-base">{dayDisplay}</span>
                        <AiOutlineCalendar className="text-lg sm:text-xl" />
                    </button>
                </div>

                {/* Right Arrow */}
                <div className="sm:w-1/6 md:w-1/4">
                    <button
                        disabled={!isSignedIn}
                        type="button"
                        onClick={increaseDate}>
                        <FaAngleRight  />
                    </button>
                </div>
            </div>

            {/* Date Picker Component */}
            {isDatePickerOpen && (

                <CustomDatePicker
                    handleDateChange={handleDateChange}
                    selectedDate={selectedDate}
                    handleCloseDatePicker={() => {
                        setDatePickerOpen(false);
                    }}
                />
            )}
        </div>
    );
};

export default Calendar;
