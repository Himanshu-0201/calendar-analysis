import { FaArrowsSpin } from "react-icons/fa6";
import React from 'react';

const SettingsLoader = () => {

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-80 z-50">
            <div className="text-center p-4 sm:p-6 md:p-8">
                <FaArrowsSpin className="text-blue-500 text-4xl sm:text-5xl md:text-6xl lg:text-7xl animate-spin mx-auto" />
            </div>
        </div>
    );
};

export default SettingsLoader;
