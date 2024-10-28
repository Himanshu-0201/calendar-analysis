
// {/* it may not be good resposive, whitespace-nowrap */ }


import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import "./Calendar.scss";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrDate } from "../../features/userInfoSlice/userInfoSlice";

import { isToday, isYesterday } from "../../utils/dateUtils";


const Calendar = () => {

    const currDateStr = useSelector(state => state.userInfo.currDate);
    const dispatch = useDispatch();

    const currDate = new Date(currDateStr);



    const getDate = (date) => {
        const day = date.getDate();
        const monthName = date.toLocaleDateString('en-US', { month: 'short' });
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const result = `${day} ${monthName}, ${dayName}`;
        return result;
    }

    const increaseDate = () => {

        const newDate = new Date(currDate);
        newDate.setDate(newDate.getDate() + 1);
        const newDateStr = newDate.toISOString();

        dispatch(updateCurrDate({ currDate: newDateStr }));
    }

    const decreaseDate = () => {

        const newDate = new Date(currDate);
        newDate.setDate(newDate.getDate() - 1);
        const newDateStr = newDate.toISOString();

        dispatch(updateCurrDate({ currDate: newDateStr }));

    }


    const day = isToday(currDate) ? "Today" : isYesterday(currDate) ? "Yesterday" : getDate(currDate);


    return (
        <div className="place-self-center ">
            <div className="_calendar-buttons-container flex text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">

                {/* Left Arrow (25% Width) */}
                <div className="w-1/4 ">
                    <button type="button" onClick={() => decreaseDate()}>
                        <FaAngleLeft />
                    </button>
                </div>

                {/* Middle Text (50% Width) */}

                <div className="w-1/2 ">
                    <button type="button" className="align-baseline  whitespace-nowrap">
                        {day}
                    </button>
                </div>

                {/* Right Arrow (25% Width) */}
                <div className="w-1/4 ">
                    <button type="button" onClick={() => increaseDate()}>
                        <FaAngleRight />
                    </button>
                </div>

            </div>
        </div>
    )
};

export default Calendar;