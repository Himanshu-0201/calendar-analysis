// I want to collepse border for outer div

import Calendar from "../Calendar/Calendar";
import TotalTime from "../TotalTime/TotalTime";
import "./Timezone.scss";

const SelectTime = () => {

    

    return (
        <div className="_time-zone-container flex border-2" >
            <Calendar/>
            <div className="self-center ml-auto">
                <TotalTime />
            </div>
        </div>
    )
}

export default SelectTime;