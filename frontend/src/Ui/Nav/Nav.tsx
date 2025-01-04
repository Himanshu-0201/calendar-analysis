
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
        <div className="_nav-container flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Google Calendar Analysis</h1>

            <div className="place-self-end _nav-avatar-container flex items-center space-x-4">
                {isUserSignedIn ? (
                    <>
                        <div className="flex items-center space-x-4 border-2 border-gray-300 p-3 rounded-md">
                            <p className="text-gray-700 font-medium">See registered time till now</p>
                            <CheckInCheckOut />
                        </div>
                        <Avatar />
                    </>
                ) : (
                    <SingIn />
                )}
            </div>
        </div>

    )
};

export default Nav;