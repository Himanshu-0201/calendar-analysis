

import Avatar from "./Avatar/Avatar.js";
import SingIn from "../SignIn/SignIn.js";

import "./Nav.scss";
import { useSelector } from "react-redux";
import CheckInCheckOut from "../../Ui/CheckInCheckOut/CheckInCheckOut.js";

const Nav = () => {

    const isUserSignedIn = useSelector(state => state.userInfo.isSignedIn);


    return (
        <div className="border-2 _nav-container">
            <div className="place-self-end _nav-avatar-container flex items-center space-x-4">

                {isUserSignedIn ?
                    <>
                        <div className="flex items-center space-x-4 border-2 border-gray-300 p-3 rounded-md">
                            <p className="text-gray-700 font-medium">See registered time till now</p>
                            <CheckInCheckOut />
                        </div>


                        <Avatar />
                    </>

                    : <SingIn />}
            </div>
        </div>

    )
};

export default Nav;