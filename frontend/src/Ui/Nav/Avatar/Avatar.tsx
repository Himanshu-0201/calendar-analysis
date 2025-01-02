import React, { useState } from "react";
import "./Avatar.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import DropDown from "../DropDown/DropDown.tsx";

const Avatar = () => {


    const [isOpen, setIsOpen] = useState(false);

    const userName = useSelector( (state : RootState) => state.userInfo.username);    
    const formattedFirstChar = userName ? userName.charAt(0).toUpperCase() : '';


    const toggle = () => {
        setIsOpen(pre => !pre);
    }

    const handleCloseDropDown = () => {
        setIsOpen(false);
    }


    return (

            <div className="relative inline-block text-left">

                <div className="_avatar relative inline-flex items-center justify-center w-10 h-10 overflow-hidden rounded-full"
                    onClick={toggle}
                >
                    <span className="font-medium text-gray-600 dark:text-gray-300">{formattedFirstChar}</span>
                </div>

                {isOpen && (<DropDown
                    handleCloseDropDown={handleCloseDropDown}
                />)}

            </div>
    )
};

export default Avatar;


