const CategoriesNotFound = () => {
    return (
        <div className="no-categories-found flex flex-col items-center justify-center text-center p-4 mt-8">
            <svg className="w-12 h-12 dark:text-gray-400 text-gray-700" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <h3 className="text-2xl font-semibold mt-6 text-gray-700 dark:text-gray-200">
                No Categories Available
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mt-4">
                Unfortunately, we couldn't find any categories available right now. Please check back later, or you can
                refresh the page to see if new categories have been added.

            </p>
        </div>
    );
};

export default CategoriesNotFound;
