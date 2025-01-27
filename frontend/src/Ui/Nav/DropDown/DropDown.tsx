import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import config from "../../../config";
import { handleSingOut } from "../../../utils/authUtils.ts";
import { useRef } from "react";
import useOutSideClick from "../../../hooks/useOutSideClick.ts";
import "./DropDown.scss"
import { useError } from "../../../hooks/useError.ts";
import { RootState } from "../../../app/store.ts";
import Settings from "../../../components/Settings/Settings.tsx";



const DropDown = ({ handleCloseDropDown }) => {

    // make it more correct , you shouldn't define it like this
    const { throwError = (error: any) => console.error("throwError is undefined", error) } = useError();
    const userName = useSelector((state: RootState) => state.userInfo.name);
    const dispatch = useDispatch();
    const dropDownRef = useRef(null);

    const [openSetting, setOpenSetting] = useState<Boolean>(false);



    useOutSideClick(dropDownRef, () => {
        handleCloseDropDown();
    });



    const signOutUser = async () => {

        try {

            const url = `${config.signOut}`;

            console.log(url);

            const response = await fetch(url, {
                method: "POST",
                credentials: 'include'
            });

            if (response.ok) {
                handleSingOut();
            }
            else {
                throw new Error("something went wrong");
            }

        } catch (error) {
            throwError(error);
        }

    }

    const openSettings = () => {
        setOpenSetting(true);
    }

    const closeSettings = () => {
        setOpenSetting(false);
    }



    return (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10"
            ref={dropDownRef}
        >

            <div className=" _color px-4 py-3 text-sm text-gray-900 dark:text-white">
                <div>{userName}</div>
                {/* you can put email here */}
            </div>

            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformationButton">
                {/* <li>

                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                </li> */}
                <li>
                    {openSetting && <Settings onCloseSettings={closeSettings} />}
                    <p onClick={openSettings} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer ">Settings</p>
                </li>
                {/* <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                </li> */}
            </ul>

            <div className="py-2 border-t border-gray-200">
                <button className=" _color inline-flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    onClick={signOutUser}
                >
                    Sign out
                </button>
            </div>

        </div>
    )
};

export default DropDown;