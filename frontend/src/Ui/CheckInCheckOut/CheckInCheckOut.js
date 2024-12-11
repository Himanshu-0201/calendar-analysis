import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";

import { updateEventsShowTillCurrentTime } from "../../features/userInfoSlice/userInfoSlice.js";

const CheckInCheckOut = () => {


    const eventsShowTillCurrentTime = useSelector(state => state.userInfo.eventsShowTillCurrentTime);
    const dispatch = useDispatch();


    const handleChange = () => {
        Cookies.set("eventsShowTillCurrentTime", !eventsShowTillCurrentTime, { expires: 7});
        dispatch(updateEventsShowTillCurrentTime({eventsShowTillCurrentTime : !eventsShowTillCurrentTime}));
    }


    return (
        <input
            type="checkbox"
            className="cursor-pointer"
            checked={eventsShowTillCurrentTime}
            onChange={handleChange}
        />
    )
};

export default CheckInCheckOut;