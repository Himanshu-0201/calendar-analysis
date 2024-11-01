import { useEffect, useState } from 'react';
import './Tasks.scss';
import { TbLoader3 } from "react-icons/tb";

import config from '../../config';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, userSingOut } from '../../features/userInfoSlice/userInfoSlice';
import { calculateTotalTimeSpend, calPercentage, convertMinutesToHours } from '../../utils/mathUtils';
import axios from 'axios';

// you can import data from here.



const Tasks = () => {

    const [loading, setLoading] = useState(true);

    
    const currDateStr = useSelector(state => state.userInfo.currDate)
    const events = useSelector(state => state.userInfo.events);
    
    const currDate = new Date(currDateStr);
    
    const dispatch = useDispatch();


    useEffect(() => {


        const controller = new AbortController();


        const fetchData = async () => {

            setLoading(true);

            try {

                const formattedDate = currDate.toISOString();
                const url = `${config.eventsData}?date=${encodeURIComponent(formattedDate)}`;


                // const response = await fetch(url, {
                //     method: "GET",
                //     credentials: 'include'
                // });

                const response =  await axios({
                    signal: controller.signal,
                    method : "GET",
                    url : url,
                    withCredentials: true,
                })


                if (response.status == 200) {
                    const data = response.data;

                    const userName = data.userName;
                    const calculatedAllTimeSpend = calculateTotalTimeSpend(data.events);



                    const events = data.events
                        .map(event => {
                            const eventName = event.title.charAt(0).toUpperCase() + event.title.slice(1);
                            const totalTimeSpend = convertMinutesToHours(event.duration);
                            const percentage = calPercentage(event.duration, calculatedAllTimeSpend);

                            return {
                                eventName: eventName,
                                totalTimeSpend: totalTimeSpend,
                                percentage: percentage,
                                duration: event.duration // Keep the original duration for sorting
                            };
                        })
                        .sort((a, b) => b.duration - a.duration) // Sort by duration in descending order
                        .map(({ duration, ...rest }) => rest); // Remove duration if not needed in the final output


                    dispatch(updateUser({ name: userName, events: events, currDate: currDateStr, allTimeSpend: calculatedAllTimeSpend }));
                }
                else {
                    console.log("auth failed, task.js")
                }

            } catch (error) {

                if(error.response && error.response.status === 401){
                    dispatch(userSingOut());
                }

                console.log("problem to fetch data, see Task.js");
            }
            finally {
                setLoading(false);
            }



        }

        fetchData();


        return ()=>{ 
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
                                <th className="border border-slate-300 text-center p-4">Task</th>
                                <th className="border border-slate-300 text-center p-4">Duration</th>
                                <th className="border border-slate-300 text-center p-4">Percentage</th>
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
