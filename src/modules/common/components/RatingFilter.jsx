import PropTypes from "prop-types";
import {useProductStore} from "../../../store/useProductStore.js";
import {useEffect} from "react";

const RatingFilter = ({isOpen, onClose}) => {
    const {setRating} = useProductStore(state => ({
        setRating: state.setRating
    }));

    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            document.body.classList.add('overflow-hidden'); // Disable body scroll
            window.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.body.classList.remove('overflow-hidden'); // Re-enable body scroll
            window.removeEventListener('keydown', handleEscape); // Clean up the event on close
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{background: 'rgba(0, 0, 0, 0.5)'}}>
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-8">
                {/* Close button */}
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        type="button"
                        aria-label="Close rating filter"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg p-2 inline-flex items-center"
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

                {/* Modal title */}
                <h2 className="text-2xl font-bold text-center mb-6">Select Rating</h2>

                {/* Option for all ratings */}
                <div
                    className="bg-gray-200 p-6 rounded-lg cursor-pointer mb-4 shadow-md text-center"
                    onClick={() => {
                        setRating(0);
                        onClose();
                    }}
                >
                    <span className="font-semibold text-xl">All Ratings</span>
                </div>

                {/* Rating options */}
                {[5, 4, 3, 2, 1].map((rating) => (
                    <div
                        key={rating}
                        className="bg-gray-200 p-6 rounded-lg cursor-pointer mb-4 shadow-md text-center"
                        onClick={() => {
                            setRating(rating);
                            onClose();
                        }}
                    >
                        <span className="font-semibold text-xl">{rating} Star{rating > 1 ? 's' : ''} & Up</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

RatingFilter.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default RatingFilter;
