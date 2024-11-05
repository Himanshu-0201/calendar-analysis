
import { useState, useEffect } from "react";


import Nav from "../Nav/Nav";
import Timezone from "../Timezone/Timezone.js";
import Tasks from "../Tasks/Tasks";
import Test from "../Test/Test";

import "./LayOut.scss";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader.js";


const LayOut = () => {

    const isTest = false;
    // const isTest = true;

    const [isLoading, setIsLoading] = useState(true);

    // const isLoading = useSelector(state => state.firstTimeLoader.isLoading);

    const handleFirstTimeFetchComplete = (event) => {
        setIsLoading(false);
    }


    return (

        <>

            {isLoading && <Loader />}

            <div className="_layout_container shadow-sm">
                {isTest ? <Test /> :
                    <>
                        <Nav />
                        <Timezone />
                        <Tasks
                            firstTimeFetchComplete={handleFirstTimeFetchComplete}
                        />
                    </>
                }

            </div>


        </>

    );
};


export default LayOut;