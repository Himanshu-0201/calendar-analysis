import React from 'react';
import Calendar from '../../Calendar/Calendar.js';
import TotalTime from '../../../Ui/TotalTime/TotalTime.tsx';
import WeekRangeControls from '../WeekRangeControls/WeekRangeControls.tsx';
import { RootState } from '../../../app/store.ts';
import { useSelector } from 'react-redux';
import "./WeekTimeZone.scss";

const WeekTimeZone = () => {

    const events = useSelector((state: RootState) => state.weekEvents.events);

    // make it day base, not user base
    const eventsShowTillCurrentTime = useSelector((state: RootState) => state.userInfo.eventsShowTillCurrentTime);

    return (
        <div className="_week-timezone-container flex flex-col sm:flex-row border-2" >
            <div className='relative max-w-[300px]'>
                <WeekRangeControls />
            </div>
            <div className="sm:ml-auto mt-4 sm:mt-0">
                <TotalTime
                    events={events}
                    eventsShowTillCurrentTime={eventsShowTillCurrentTime}
                />
            </div>
        </div>
    )
};

export default WeekTimeZone;