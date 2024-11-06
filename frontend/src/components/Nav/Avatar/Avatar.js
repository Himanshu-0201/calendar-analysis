import { useState } from "react";
import DropDown from "../DropDown/DropDown";
import "./Avatar.scss";

const Avatar = () => {


    const [isOpen, setIsOpen] = useState(false);

    // console.log(isOpen);

    const toggle = () => {
        setIsOpen(pre => !pre);
    }

    const handleCloseDropDown = () => {
        setIsOpen(false);
    }


    return (
        <>

            <div className="relative inline-block text-left">

                <div className="_avatar relative inline-flex items-center justify-center w-10 h-10 overflow-hidden rounded-full"
                    onClick={toggle}
                >
                    <span className="font-medium text-gray-600 dark:text-gray-300">H</span>
                </div>

                {isOpen && (<DropDown
                    handleCloseDropDown={handleCloseDropDown}
                />)}

            </div>
        </>
    )
};

export default Avatar;


