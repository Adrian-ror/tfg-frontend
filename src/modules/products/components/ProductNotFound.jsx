const ProductNotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <svg className="w-16 h-16 text-red-400 dark:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2" />
                <line x1="9" y1="15" x2="15" y2="9" stroke="currentColor" strokeWidth="2" />
            </svg>
            <h3 className="text-2xl font-semibold mt-4 text-gray-700 dark:text-gray-200">Product Not Found</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
                The product you're looking for is not available. Please try searching for another product.
            </p>
            <button
                className="mt-6 px-6 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-800 transition duration-300 ease-in-out"
                onClick={() => window.history.back()}
            >
                Go Back
            </button>
        </div>
    );
};

export default ProductNotFound;
