import { useEffect, useState } from 'react';
import './Tasks.scss';
import { TbLoader3 } from "react-icons/tb";

import config from '../../config';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, userSingOut } from '../../features/userInfoSlice/userInfoSlice';
import { calculateTotalTimeSpend, calPercentage, convertMinutesToHours, modifyEventsForTasksComponent } from '../../utils/mathUtils';
import axios from 'axios';
import Cookies from "js-cookie";
import { useError } from '../../hooks/useError';
import { useNavigate } from 'react-router-dom';

// you can import data from here.



const Tasks = ({ firstTimeFetchComplete }) => {

    const [loading, setLoading] = useState(true);
    const { throwError } = useError();


    const currDateStr = useSelector(state => state.userInfo.currDate)
    const eventsList = useSelector(state => state.userInfo.events);
    const eventsShowTillCurrentTime = useSelector(state => state.userInfo.eventsShowTillCurrentTime);


    const events = modifyEventsForTasksComponent(eventsList, eventsShowTillCurrentTime);


    const dispatch = useDispatch();


    useEffect(() => {


        const controller = new AbortController();


        const fetchData = async () => {

            setLoading(true);

            try {

                // Parse the date string to create a Date object
                const startTime = new Date(currDateStr);


                // Set to local time zone with 0 hr, 0 min, 0 sec, and 0 ms
                startTime.setHours(0, 0, 0, 0);

                const endTime = new Date(currDateStr);

                // Set to local time zone with 23 hr, 59 min, 59 sec, and  999ms
                endTime.setHours(23, 59, 59, 999);

                const startStr = startTime.toISOString();
                const endStr = endTime.toISOString();

                const url = `${config.eventsData}?start=${encodeURIComponent(startStr)}&end=${encodeURIComponent(endStr)}`;


                const response = await axios({
                    signal: controller.signal,
                    method: "GET",
                    url: url,
                    withCredentials: true,
                    timeout: 60000
                })

                // console.log("response " + response);


                if (response.status == 200) {
                    const data = response.data;

                    const userName = data.userName;
                    const events = data.events;

                    const eventsShowTillCurrentTimeFromCookie = Cookies.get("eventsShowTillCurrentTime") || "false";

                    let eventsShowTillCurrentTime = false

                    if (eventsShowTillCurrentTimeFromCookie && eventsShowTillCurrentTimeFromCookie === "true") {
                        eventsShowTillCurrentTime = true;
                    }


                    dispatch(updateUser({ name: userName, events: events, currDate: currDateStr, eventsShowTillCurrentTime }));

                }
                else {
                    console.log("auth failed, task.js")
                }

            } catch (error) {

                if (error.response && error.response.status === 401) {
                    dispatch(userSingOut());
                }
                else {
                    throwError(error);
                }

            }
            finally {
                firstTimeFetchComplete();  // if request failed , then I need to close the loading state
                setLoading(false);

            }



        }

        fetchData();


        return () => {
            controller.abort()
        }


    }, [currDateStr]);




    const tableEventsData = events ? events : [];


    const tableDate = tableEventsData.map((event, index) => {
        return (
            <tr key={index}>
                <td className="border border-slate-300 text-center p-4">{event.eventName}</td>
                <td className="border border-slate-300 text-center p-4">{event.totalTimeSpend}</td>
                <td className="border border-slate-300 text-center p-4"> {event.percentage} % </td>
            </tr>
        )
    })

    return (

        loading ?
            <div className="flex justify-center items-center p-4">
                <TbLoader3 className="animate-spin text-lime-300" size={48} /> {/* Customize size and color */}
            </div>
            :
            (
                tableEventsData.length > 0 ? (
                    <table className="min-w-full border-collapse border border-slate-400 _table">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-slate-300 text-center p-4">Activity</th>
                                <th className="border border-slate-300 text-center p-4">Duration</th>
                                <th className="border border-slate-300 text-center p-4">Percentage
                                    <span className='block !text-xs font-normal'>( % total register time)</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableDate}
                        </tbody>
                    </table>
                ) :
                    (<p className="text-center p-4 text-gray-500 border border-slate-300">No events available to display.</p>)
            )
    );
};

export default Tasks;
