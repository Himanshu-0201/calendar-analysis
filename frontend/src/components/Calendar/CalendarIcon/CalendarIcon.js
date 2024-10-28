import { useRef } from 'react';
import { FiCalendar } from 'react-icons/fi';

const CalendarIcon = () => {
    const dateInputRef = useRef(null);

    const handleIconClick = () => {
        dateInputRef.current.showPicker();
    };

    return (
        <>
            <div className="">
                <input
                    type="date"
                    ref={dateInputRef}
                    className="hidden" // Hide the default date input
                    onChange={(e) => console.log(e.target.value)} // Optional: handle date change
                />
                <button 
                    onClick={handleIconClick} 
                    className="bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 focus:outline-none"
                >
                    <FiCalendar className="text-xl" /> {/* Calendar icon */}
                </button>
            </div>
        </>
    );
};

export default CalendarIcon;
