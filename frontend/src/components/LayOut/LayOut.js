
import { useState, useEffect } from "react";


import Nav from "../Nav/Nav";
import Timezone from "../Timezone/Timezone.js";
import Tasks from "../Tasks/Tasks";
import Test from "../Test/Test";

import "./LayOut.scss";


const LayOut = () => {

    const isTest = false;
    // const isTest = true;


    return (

        <div className="_layout_container shadow-sm">
            { isTest ? <Test /> :
                <>
                    <Nav />
                    <Timezone />
                    <Tasks />
                </> 
            }

        </div>
    );
};


export default LayOut;