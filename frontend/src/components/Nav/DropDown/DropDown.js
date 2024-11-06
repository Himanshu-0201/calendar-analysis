import { useDispatch, useSelector } from "react-redux";
import config from "../../../config";

import { userSingOut } from "../../../features/userInfoSlice/userInfoSlice";
import { useRef } from "react";
import useOutSideClick from "../../../hooks/useOutSideClick";



const DropDown = ({ handleCloseDropDown }) => {

    const userName = useSelector(state => state.userInfo.name);
    const dispatch = useDispatch();
    const dropDownRef = useRef(null);



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
                dispatch(userSingOut());
            }
            else {
                console.log("failed to signout in");
            }

        } catch (error) {

        }

    }



    return (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10"
            ref={dropDownRef}
        >

            <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
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
                <button className="inline-flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    onClick={signOutUser}
                >
                    Sign out
                </button>
            </div>

        </div>
    )
};

export default DropDown;