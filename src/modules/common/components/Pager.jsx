import PropTypes from "prop-types";
import {useProductStore} from "../../../store/useProductStore.js";
import {useCategoryStore} from "../../../store/useCategoryStore.js";

const Pager = ({totalItems}) => {
    const {
        previousFindProductsResultPage,
        nextFindProductsResultPage,
        findProducts,
        getSearchKeywords,
        currentPage,
        setCurrentPage
    } = useProductStore(state => ({
        previousFindProductsResultPage: state.previousFindProductsResultPage,
        nextFindProductsResultPage: state.nextFindProductsResultPage,
        findProducts: state.findProducts,
        getSearchKeywords: state.getSearchKeywords,
        currentPage: state.getCurrentPage(),
        setCurrentPage: state.setCurrentPage
    }));

    const selectedCategory = useCategoryStore(state => state.getSelectedCategory());

    const handlePageChange = (page) => {
        setCurrentPage(page);
        findProducts(selectedCategory?.id, getSearchKeywords(), page);
    };

    if (!totalItems || !currentPage) return null;

    const totalPages = Math.max(Math.ceil(totalItems / 6), 1);

    if (totalPages <= 1) return null;

    const renderPageNumbers = () => {
        const pageNumbers = [];

        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
                pageNumbers.push(i);
            } else if (pageNumbers[pageNumbers.length - 1] !== "...") {
                pageNumbers.push("...");
            }
        }

        return pageNumbers.map((page, index) =>
            page === "..." ? (
                <span key={index} className="px-4 py-2 text-gray-600 rounded-lg text-xl">
                    {page}
                </span>
            ) : (
                <button
                    key={page}
                    onClick={() => page !== currentPage && handlePageChange(page)}
                    className={`border-2 border-gray-600 bg-gray/20 px-4 py-2 text-xl sm:px-6 sm:py-3 ml-2 mt-2 text-gray-600 rounded-lg ${
                        page === currentPage ? "font-bold text-blue-600" : "hover:bg-gray-200"
                    }`}
                >
                    {page}
                </button>
            )
        );
    };

    return (
        <div className="flex justify-center mt-12 space-x-6">
            {currentPage > 1 && (
                <button
                    onClick={() => previousFindProductsResultPage()}
                    className="px-4 py-2 sm:px-6 sm:py-3 mt-2 border-2 border-gray-600 text-gray-600 rounded-lg hover:bg-gray-100 text-xl"
                >
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path
                            fillRule="evenodd"
                            d="M12.707 5.293a1 1 0 00-1.414 0L8.586 10l2.707 2.707a1 1 0 101.414-1.414L10.414 10l2.293-2.293a1 1 0 000-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            )}

            {renderPageNumbers()}

            {currentPage < totalPages && (
                <button
                    onClick={() => nextFindProductsResultPage()}
                    className="px-4 py-2 sm:px-6 sm:py-3 mt-2 border-2 border-gray-600 text-gray-600 rounded-lg hover:bg-gray-100 text-xl"
                >
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            )}
        </div>
    );
};

Pager.propTypes = {
    totalItems: PropTypes.number.isRequired,
};

export default Pager;
