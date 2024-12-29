
import PiChart from "../../Charts/PiChart/PeChart";
import { useEffect, useState } from "react";
import { useError } from "../../../hooks/useError";
import Table from "../../Table/Table";
import { modifyEventsForDayEventsTable, modifyEventsForPieChart } from "../../../utils/mathUtils";
import { useSelector , useDispatch} from "react-redux";
import { TbLoader3 } from "react-icons/tb";
import axios from "axios";
import Cookies from "js-cookie";
import config from "../../../config";
import { updateUser, userSingOut } from "../../../features/userInfoSlice/userInfoSlice";


const DayEventsBody = ({loaderClose}) => {

    const [loading, setLoading] = useState(true);
    const { throwError } = useError();
    const currDateStr = useSelector(state => state.userInfo.currDate);
    const eventsList = useSelector(state => state.userInfo.events);
    const dispatch = useDispatch();


    const eventsShowTillCurrentTime = useSelector(state => state.userInfo.eventsShowTillCurrentTime);

    const tableEvents = modifyEventsForDayEventsTable(eventsList, eventsShowTillCurrentTime);
    const piChartEvents = modifyEventsForPieChart(eventsList, eventsShowTillCurrentTime);
    





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


                loaderClose();  // if request failed , then I need to close the loading state
                setLoading(false);

            }



        }

        fetchData();


        return () => {
            controller.abort()
        }


    }, [currDateStr]);



    return (

        <>

            {loading ?

                <div className="flex justify-center items-center p-4">
                    <TbLoader3 className="animate-spin text-lime-300" size={48} /> {/* Customize size and color */}
                </div>

                :

                <div className="grid grid-cols-[60%_40%] ">

                    <div>
                        <Table
                            events={tableEvents}
                        />
                    </div>

                    <div>
                        <PiChart 
                            events={piChartEvents}
                        />
                    </div>

                </div>

            }

        </>

    )
}

export default DayEventsBody;