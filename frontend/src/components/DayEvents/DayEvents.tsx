import React, { useState } from "react";

import LayOut from "../LayOut/LayOut.tsx";
import Nav from "../../Ui/Nav/Nav.tsx";
import Timezone from "../../Ui/Timezone/Timezone.tsx";
import Loader from "../../Ui/Loader/Loader.tsx";
import DayEventsBody from "./DayEventsBody/DayEventsBody.tsx";

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