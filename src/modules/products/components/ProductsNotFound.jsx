
const ProductsNotFound = () => {
    return (
        <div className="no-products-found flex flex-col items-center justify-center h-screen text-center">
            <svg className="w-12 h-12 dark:text-gray-400 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <h3 className="text-xl font-medium mt-6 text-gray-700 dark:text-gray-200">No Products Found</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-4">
                It seems we couldn't find any products matching your search. Please try adjusting your filters or
                search criteria.
            </p>
        </div>
    );
};

export default ProductsNotFound;
