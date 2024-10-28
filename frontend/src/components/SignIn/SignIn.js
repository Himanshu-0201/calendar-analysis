
// set green color when hovering

import { FaSignInAlt } from "react-icons/fa";
import "./SignIn.scss";
import config from "../../config";
// import { useEffect } from "react";

let user = true;

const SingIn = () => {

    const makeUserSignIn = () => {
        const url  = config.signIn;
        window.location.href = url; // can I use something else
    }


    return (
        <div className="flex justify-center items-center  bg-gray-100">
            <button
                className="_sign-in flex items-center gap-2 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
                onClick={makeUserSignIn}
            >
                <span>Sign In</span>
                <FaSignInAlt className="text-lg" />
            </button>
        </div>
    )
};

export default SingIn;