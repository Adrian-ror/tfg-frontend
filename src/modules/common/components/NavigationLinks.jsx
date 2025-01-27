import {RatingFilter} from "../index.js";
import {useState} from "react";
import CategoryModal from "./CategoryModal.jsx";
import {useCategoryStore} from "../../../store/useCategoryStore.js";
import {useProductStore} from "../../../store/useProductStore.js";

const NavigationLinks = () => {

    const selectedCategory = useCategoryStore((state) => state.getSelectedCategory());

    const {rating} = useProductStore(state => ({
        rating: state.getRating(),
    }));

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRatingFilterOpen, setIsRatingFilterOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const openRatingFilter = () => setIsRatingFilterOpen(true);
    const closeRatingFilter = () => setIsRatingFilterOpen(false);

    return (
        <div className="flex items-center md:space-x-8"> {/* Aumenta espacio entre elementos */}

            {/* Logo section */}
            <div className="flex flex-shrink-0 items-center mr-4">
                <img
                    className="h-16 w-auto" /* Aumentado de h-10 a h-16 */
                    src="/hub.png"
                    alt="Your Company"
                />
            </div>

            {/* Navigation link for CommerceHub */}
            <div className="flex items-center space-x-6 ml-2 mr-10">
                <a
                    key="CommerceHub"
                    href='/'
                    className="bg-gray-900 text-white rounded-md px-5 py-3 text-lg font-semibold hover:bg-gray-700 transition"
                    aria-current="page"
                >
                    CommerceHub
                </a>
            </div>

            {/* Category selection and search bar */}
            <div className="flex"> {/* Espaciado entre elementos */}
                {/* Button to select a category */}
                <button
                    className="bg-yellow-500 mr-5 text-white rounded-md px-6 py-3 text-lg font-semibold hover:bg-gray-800 transition"
                    onClick={openModal}
                >
                    {selectedCategory ? selectedCategory.name : 'Select Category'}
                </button>

                {/* Category modal component */}
                <CategoryModal isOpen={isModalOpen} onClose={closeModal}/>

                {/* Button for rating filter */}
                <button
                    className="bg-yellow-500 text-white rounded-md px-6 py-3 text-lg font-semibold hover:bg-gray-800 transition"
                    onClick={openRatingFilter}
                >
                    {rating > 0 ? `Rating: ${rating} Stars` : 'Filter by Rating'}
                </button>

                <RatingFilter isOpen={isRatingFilterOpen} onClose={closeRatingFilter}/>

            </div>
        </div>
    );
};

export default NavigationLinks;
