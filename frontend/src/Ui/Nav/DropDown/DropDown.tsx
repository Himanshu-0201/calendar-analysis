import config from "../../../config";
import React, { useRef } from "react";
import "./DropDown.scss"
import { useError } from "../../../hooks/useError.js";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../app/store";
import { setUserSignOut } from "../../../features/userInfoSlice/userInfoSlice.ts";
import useOutSideClick from "../../../hooks/useOutSideClick.js";




const DropDown = ({ handleCloseDropDown }) => {

    const { throwError } = useError();
    const userName = useSelector((state: RootState) => state.userInfo.username);
    const dispatch = useDispatch();

    const dropDownRef = useRef(null);


    useOutSideClick(dropDownRef, () => {
        handleCloseDropDown();
    });



    const signOutUser = async () => {

        try {

            const url = `${config.signOut}`;


            const response = await fetch(url, {
                method: "POST",
                credentials: 'include'
            });

            if (response.ok) {
                dispatch(setUserSignOut());
            }
            else {
                throw new Error("something went wrong");
            }

        } catch (error) {
            throwError(error);
        }

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
            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
        </li>
        <li>
            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
        </li>
        <li>
            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
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