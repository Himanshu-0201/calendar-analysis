
import { useState, useEffect } from "react";


import Nav from "../Nav/Nav";
import Timezone from "../Timezone/Timezone.js";
import Tasks from "../Tasks/Tasks";
import Test from "../Test/Test";

import "./LayOut.scss";



const LayOut = ({ children }) => {


    return (

        <>
            <div className="_layout_container shadow-sm">
                {children}
            </div>
        </>

    );
};


export default LayOut;