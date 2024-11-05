
import { useState, useEffect } from "react";


import Nav from "../Nav/Nav";
import Timezone from "../Timezone/Timezone.js";
import Tasks from "../Tasks/Tasks";
import Test from "../Test/Test";

import "./LayOut.scss";
import Loader from "../Loader/Loader.js";


const LayOut = () => {


    const [isLoading, setIsLoading] = useState(true);


    const handleFirstTimeFetchComplete = (event) => {
        setIsLoading(false);
    }


    return (

        <>

            {isLoading && <Loader />}

            <div className="_layout_container shadow-sm">

                <Nav />
                <Timezone />
                <Tasks
                    firstTimeFetchComplete={handleFirstTimeFetchComplete}
                />

            </div>


        </>

    );
};


export default LayOut;