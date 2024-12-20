import { useState } from "react";

import LayOut from "../LayOut/LayOut";
import Tasks from "../Tasks/Tasks";
import Nav from "../Nav/Nav";
import Timezone from "../Timezone/Timezone";
import Loader from "../Loader/Loader";


const DayEvents = () => {


    const [isLoading, setIsLoading] = useState(true);


    const handleFirstTimeFetchComplete = (event) => {
        setIsLoading(false);
    }

    return (

        <>

            {isLoading && <Loader />}

            <LayOut>

                <Nav />
                <Timezone />
                <Tasks
                    firstTimeFetchComplete={handleFirstTimeFetchComplete}
                />

            </LayOut>

        </>

    )

};


export default DayEvents;