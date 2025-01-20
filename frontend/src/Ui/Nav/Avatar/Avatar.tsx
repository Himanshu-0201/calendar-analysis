import  React , { useState } from "react";
import DropDown from "../DropDown/DropDown.tsx";
import "./Avatar.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store.ts";

const Avatar = ({prop_class}) => {


    const [isOpen, setIsOpen] = useState(false);

    const userName = useSelector((state : RootState) => state.userInfo.name);
    const formattedFirstChar = userName ? userName.charAt(0).toUpperCase() : '';


    const toggle = () => {
        setIsOpen(pre => !pre);
    }

    const handleCloseDropDown = () => {
        setIsOpen(false);
    }

    const elementClass = `relative inline-block text-left prop_class ${prop_class}`

    return (
        <>

            <div className={elementClass}>

                <div className="_avatar relative inline-flex items-center justify-center w-10 h-10 overflow-hidden rounded-full"
                    onClick={toggle}
                >
                    <span className="font-medium text-gray-600 dark:text-gray-300">{formattedFirstChar}</span>
                </div>

                {isOpen && (<DropDown
                    handleCloseDropDown={handleCloseDropDown}
                />)}

            </div>
        </>
    )
};

export default Avatar;


