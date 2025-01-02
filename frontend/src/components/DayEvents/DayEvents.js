import { useState } from "react";

import LayOut from "../LayOut/LayOut";
import Nav from "../Nav/Nav";
import Timezone from "../Timezone/Timezone";
import Loader from "../Loader/Loader";
import DayEventsBody from "./DayEventsBody/DayEventsBody";

const DayEvents = () => {


    const [isLoading, setIsLoading] = useState(true);

    
    const hanndleLoaderClose = (event) => {
        setIsLoading(false);
    }

    

    return (

        <>

            {isLoading && <Loader />}

            <LayOut>

                <div>
                    <Nav />
                    <Timezone />
                </div>

                <DayEventsBody
                    loaderClose={hanndleLoaderClose}
                />

            </LayOut>

        </>

    )

};


export default DayEvents;