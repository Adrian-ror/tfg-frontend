import {useNavigate} from "react-router-dom";


const UserNotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
            {/* SVG Illustration */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-24 h-24 text-red-600 mb-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M9 9l6 6m0-6l-6 6" />
                <circle cx="12" cy="12" r="10" />
            </svg>
            <h1 className="text-4xl font-bold text-gray-800">
                User Not Found
            </h1>
            <p className="text-gray-700 dark:text-gray-300 mt-4">
                We couldn't find the user you're looking for. They may have been removed or never existed.
            </p>
            <button
                onClick={() => navigate('/')}
                className="mt-6 px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
            >
                Go to Home
            </button>
        </div>
    );
};

export default UserNotFound;
