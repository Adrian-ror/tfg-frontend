const NoUserAddresses = () => {
    return (
        <div
            className="no-file-found flex flex-col items-center justify-center py-8 px-4 text-center dark:bg-gray-800 rounded-lg">
            <svg
                className="w-12 h-12 dark:text-gray-400 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <h3 className="text-xl font-medium mt-4 text-gray-700 dark:text-gray-200">
                No Address Found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
                It looks like you haven't added any addresses yet. Start by adding your first address to enjoy a
                smoother checkout experience!
            </p>
        </div>
    );
};

export default NoUserAddresses;
