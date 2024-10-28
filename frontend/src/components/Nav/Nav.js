

import Avatar from "./Avatar/Avatar.js";
import SingIn from "../SignIn/SignIn.js";

import "./Nav.scss";
import { useSelector } from "react-redux";

const Nav = () => {

    const isUserSignedIn = useSelector(state => state.userInfo.isSignedIn);


    return (
        <div className="border-2 _nav-container">
            <div className="place-self-end _nav-avatar-container">
                {isUserSignedIn ? <Avatar /> : <SingIn />}
            </div>
        </div>
    )
};

export default Nav;