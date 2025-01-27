import {useEffect} from 'react';
import PropTypes from "prop-types";
import {useCategoryStore} from "../../../store/useCategoryStore.js";

const CategoryModal = ({isOpen, onClose}) => {

    // State functions
    const {categories, setSelectedCategory} = useCategoryStore(state => ({
        categories: state.getCategories(),
        setSelectedCategory: state.setSelectedCategory,
    }));

    useEffect(() => {
        // Function to handle the "Escape" key event
        const handleEscape = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        // Add and remove the keyboard event depending on the modal state
        if (isOpen) {
            document.body.classList.add('overflow-hidden'); // Disable body scroll
            window.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.body.classList.remove('overflow-hidden'); // Re-enable body scroll
            window.removeEventListener('keydown', handleEscape); // Clean up the event on close
        };
    }, [isOpen, onClose]);

    // If the modal is not open, render nothing
    if (!isOpen) return null;

    return (
        // Main div
        <div className="fixed inset-0 flex items-center justify-center z-50"
             style={{background: 'rgba(0, 0, 0, 0.5)', width: '100vw', height: '100vh'}}>
            {/* Category Modal */}
            <div className="bg-white rounded-lg shadow-lg max-w-lg w-full lg:max-h-full p-6 overflow-y-auto">
                {/* Close button */}
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        type="button"
                        aria-label="Close category modal"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5 inline-flex items-center"
                    >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>

                {/* Modal Header */}
                <h2 className="text-2xl font-semibold text-center mb-6">Select a Category</h2>

                {/* All Categories option */}
                <div
                    className="bg-gray-200 p-6 rounded-lg cursor-pointer mb-4 shadow-md"
                    onClick={() => {
                        setSelectedCategory({id: null, name: "All Categories"});
                        onClose();
                    }}
                >
                    <span className="font-semibold text-xl">All Categories</span>
                </div>

                {/* Category list */}
                {categories.length === 0 ? (
                    // Message when no categories exist
                    <p className="text-lg text-gray-600 text-center">No categories available.</p>
                ) : (
                    categories.map((category) => (
                        <details key={category.name} className="mb-4">
                            {/* Parent categories */}
                            <summary className="bg-gray-200 p-6 rounded-lg cursor-pointer shadow-md text-xl">
                                <span
                                    className="font-semibold"
                                    onClick={() => {
                                        setSelectedCategory({id: category.id, name: category.name});
                                        onClose();
                                    }}
                                >
                                    {category.name}
                                </span>
                            </summary>

                            {/* Subcategories */}
                            <ul className="ml-6 mt-4 space-y-3">
                                {category.subcategories && category.subcategories.length > 0 ? (
                                    category.subcategories.map((subcategory) => (
                                        <li
                                            key={subcategory.name}
                                            className="ml-6 p-3 text-center text-gray-800 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200 text-lg"
                                            onClick={() => {
                                                setSelectedCategory({id: subcategory.id, name: subcategory.name});
                                                onClose();
                                            }}
                                        >
                                            {subcategory.name}
                                        </li>
                                    ))
                                ) : (
                                    // Message when no subcategories exist
                                    <li className="ml-6 p-3 text-center text-gray-600 bg-gray-100 rounded-md cursor-not-allowed text-lg">
                                        No subcategories available
                                    </li>
                                )}
                            </ul>
                        </details>
                    ))
                )}
            </div>
        </div>
    );
};

CategoryModal.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func
};

export default CategoryModal;
