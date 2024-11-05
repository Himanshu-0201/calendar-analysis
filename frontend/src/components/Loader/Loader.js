import { FaSpinner } from 'react-icons/fa';

const Loader = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-80 z-50">
            <div className="text-center p-4 sm:p-6 md:p-8">
                <FaSpinner className="text-blue-500 text-4xl sm:text-5xl md:text-6xl lg:text-7xl animate-spin mx-auto" />
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-700 mt-4 sm:mt-6">Loading...</h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-500 mt-2 sm:mt-3">Please wait while we load your data.</p>
            </div>
        </div>
    );
};

export default Loader;
