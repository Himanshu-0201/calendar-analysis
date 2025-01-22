
import React from "react";
import Avatar from "./Avatar/Avatar.tsx";
import SingIn from "../../Ui/SignIn/SignIn.tsx";

import "./Nav.scss";
import { useSelector } from "react-redux";
import CheckInCheckOut from "../../Ui/CheckInCheckOut/CheckInCheckOut.tsx";
import { RootState } from "../../app/store.ts";

const Nav = () => {

    const isUserSignedIn = useSelector((state: RootState) => state.userInfo.isSignedIn);


    return (
        <div className="_nav-container flex justify-between px-4 sm:px-8 py-4">
            <h1 className="text-xl font-bold text-gray-800 md:text-3xl">Google Calendar Analysis</h1>

            <div className="place-self-end  _nav-avatar-container flex flex-col sm:flex-row items-center space-x-0 sm:space-x-4">
                {isUserSignedIn ? (
                    <>
                        <div className="flex items-center space-x-0 sm:space-x-4 border-2 border-gray-300 p-2 sm:p-3 rounded-md mb-4 sm:mb-0 order-2 sm:order-1">
                            <p className="text-gray-700 font-medium text-sm sm:text-base">See events time till now</p>
                            <CheckInCheckOut />
                        </div>
                        <Avatar prop_class = "order-1 place-self-end sm:rder-2 mb-2"/>
                    </>
                ) : (
                    <SingIn />
                )}
            </div>
        </div>

    )
};

export default Nav;