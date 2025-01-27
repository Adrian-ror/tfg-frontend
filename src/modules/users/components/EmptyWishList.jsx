
const EmptyWishList = () => {
    return (
        <div className="no-file-found ml-6 mr-8 flex flex-col items-center justify-center py-8 px-4 text-center h-screen dark:bg-gray-800 rounded-lg">
            <svg
                className="w-12 h-12 dark:text-gray-400 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            </svg>
            <h3 className="text-xl font-medium mt-4 text-gray-700 dark:text-gray-200">
                Your Wish List is Empty
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
                Your wish list is currently empty. Start adding your favorite items and keep track of everything you love!
            </p>
        </div>
    );
};

export default EmptyWishList;
