// I want to collepse border for outer div

import React from "react";
import Calendar from "../../components/Calendar/Calendar.js";
import TotalTime from "../TotalTime/TotalTime.tsx";
import "./Timezone.scss";

const Timezone = () => {

    

    return (
        <div className="_time-zone-container flex border-2" >
            <Calendar/>
            <div className="self-center ml-auto">
                <TotalTime />
            </div>
        </div>
    )
}

export default Timezone;