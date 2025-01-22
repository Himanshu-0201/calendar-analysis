import React, { useContext } from "react";

import { ErrorContext } from "../Context/ErrorContext.ts";
import { useNavigate } from "react-router-dom";


function Error() {

    const {error} = useContext(ErrorContext);

    console.log(error);

    const navigate = useNavigate();

    const handleClick = ()=>{
        navigate("/");
    }

    // console.log(error);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Oops! Something went wrong</h1>
                <p className="text-gray-600 text-base mb-4">
                    {error?.message || "An unexpected error occurred. Please try again later."}
                </p>
                {error?.status && (
                    <p className="text-sm text-gray-500 mb-6">
                        <strong>Status Code:</strong> {error.status}
                    </p>
                )}
                <button
                    className="bg-blue-600 hover:bg-blue-500 transition-colors px-6 py-2 text-white text-sm font-semibold rounded-lg"
                    onClick={handleClick}
                >
                    Refresh Page
                </button>
            </div>
        </div>
    );
}

export default Error;
