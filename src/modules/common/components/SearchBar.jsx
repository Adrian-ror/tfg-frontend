import {useProductStore} from "../../../store/useProductStore.js";
import {useCategoryStore} from "../../../store/useCategoryStore.js";
import useResponseHandler from "../../../hooks/useResponseHandler.js";

const SearchBar = () => {
    const {
        findProducts,
        searchKeywords,
        setSearchKeywords,
        currentPage
    } = useProductStore(state => ({
        findProducts: state.findProducts,
        searchKeywords: state.getSearchKeywords(),
        setSearchKeywords: state.setSearchKeywords,
        currentPage: state.getCurrentPage(),
    }));

    const selectedCategory = useCategoryStore(state => state.getSelectedCategory());
    const {handleSuccess} = useResponseHandler();

    const handleSearch = () => {
        findProducts(selectedCategory?.id, searchKeywords ? searchKeywords.trim() : '', currentPage);
        handleSuccess('', '/');
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="relative flex w-full h-14 lg:w-full "> {/* Flexibilidad y ancho máximo */}

            {/* Input field */}
            <input
                className="w-full py-3 px-4 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                type="search"
                placeholder="Search for products..."
                value={searchKeywords}
                onKeyDown={handleKeyDown}
                onChange={(e) => setSearchKeywords(e.target.value)}
                aria-label="Search products"
            />

            {/* Search button */}
            <button
                className="absolute inset-y-0 right-0 flex items-center px-5 text-gray-700 bg-gray-200 border border-l-0 border-gray-300 rounded-r-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onClick={handleSearch}
                aria-label="Search"
            >
                <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M14.795 13.408l5.204 5.204a1 1 0 01-1.414 1.414l-5.204-5.204a7.5 7.5 0 111.414-1.414zM8.5 14A5.5 5.5 0 103 8.5 5.506 5.506 0 008.5 14z"
                    />
                </svg>
            </button>
        </div>
    );
};

export default SearchBar;
