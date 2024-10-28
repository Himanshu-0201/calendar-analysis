
import { FaRegSadTear  } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const PageNotFound = () => {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <FaRegSadTear className="text-6xl text-blue-500 mb-4" /> {/* Updated icon */}
            <h1 className="text-4xl font-bold text-gray-800">404 - Page Not Found</h1>
            <p className="mt-2 text-lg text-gray-600">
                Oops! The page you are looking for does not exist.
            </p>
            <Link
                to="/"
                className="mt-4 inline-block bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
            >
                Go Back Home
            </Link>
        </div>
    )

}

export default PageNotFound;