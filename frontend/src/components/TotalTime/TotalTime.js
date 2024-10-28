import { useSelector } from "react-redux";
import "./TotalTime.scss";
import { convertMinutesToHours } from "../../utils/mathUtils";

const TotalTime = ()=>{

    const totalTimeSpendInMin = useSelector(state => state.userInfo.allTimeSpend);
    const totalTimeSpend = convertMinutesToHours(totalTimeSpendInMin);

    const isSignedIn = useSelector(state => state.userInfo.isSignedIn);






    return (

        // #B0C4DE bg color
        <div className="_total-time flex space-x-4 px-2.5 py-4 border-2 rounded-md">
            <div className="">
                <p> Total time registered</p>
            </div>
            <div className="font-bold">
                <p>{isSignedIn ? totalTimeSpend : "10 Hr 15 Min"}</p>
            </div>
        </div>
    )
}

export default TotalTime;