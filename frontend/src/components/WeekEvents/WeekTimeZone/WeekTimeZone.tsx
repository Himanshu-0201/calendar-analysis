import React from 'react';
import Calendar from '../../Calendar/Calendar.js';
import TotalTime from '../../../Ui/TotalTime/TotalTime.tsx';
import WeekRangeControls from '../WeekRangeControls/WeekRangeControls.tsx';
import { RootState } from '../../../app/store.ts';
import { useSelector } from 'react-redux';

const WeekTimeZone = () => {

    const events = useSelector((state: RootState) => state.weekEvents.events);

    // make it day base, not user base
    const eventsShowTillCurrentTime = useSelector((state: RootState) => state.userInfo.eventsShowTillCurrentTime);

    return (
        <div className="_time-zone-container flex border-2" >
            <WeekRangeControls />
            <div className="self-center ml-auto">
                <TotalTime
                    events={events}
                    eventsShowTillCurrentTime={eventsShowTillCurrentTime}
                />
            </div>
        </div>
    )
};

export default WeekTimeZone;