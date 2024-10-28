import React from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../../config';

const DeniedAccess = () => {
    const navigate = useNavigate();

    const handleRetry = () => {
        // navigate('/signin'); // Redirect to the sign-in page
        const url = config.signIn;
        window.location.href = url; // can I use something else
    };

    const handleGoHome = () => {
        navigate('/'); // Redirect to the home page
    };

    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="bg-white rounded-lg shadow-lg p-8 w-1/2"> {/* Set width to half */}
                <h1 className="text-3xl font-semibold text-red-600 mb-4 text-center">Access Denied</h1>
                <p className="text-lg mb-6 text-gray-700 text-center">
                    We couldn't sign you in. Please try again or contact support if the issue persists.
                </p>
                <div className="flex justify-center space-x-4">
                    <button
                        onClick={handleRetry}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                        Retry Sign-In
                    </button>
                    <button
                        onClick={handleGoHome}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                    >
                        Go to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeniedAccess;
