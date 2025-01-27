import {useState} from 'react';
import useResponseHandler from "../../../hooks/useResponseHandler.js";
import {addProductReview} from "../../../backend/shoppingService.js";
import {useParams} from "react-router-dom";

const ReviewForm = () => {

    const [hoveredStar, setHoveredStar] = useState(0);
    const [selectedStar, setSelectedStar] = useState(0);

    const [comment, setComment] = useState('');

    // Get product ID from URL parameters
    const {productId} = useParams();

    // Use custom hook to handle success responses
    const {handleSuccess, handleErrors} = useResponseHandler();

    const handleReview = (e) => {
        e.preventDefault();

        if (selectedStar && comment) {
            addProductReview(productId, selectedStar, comment,
                () => handleSuccess('Review completed!', `/`),
                (errors) => handleErrors(errors))
        } else {
            handleErrors({globalError: 'Please, complete de fields'})
        }

    };
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div
                className="p-6 bg-white rounded-lg shadow-md max-w-4xl w-full sm:p-6 grid grid-cols-1 lg:grid-cols-6 gap-6">
                {/* Formulario de reseña */}
                <div className="lg:col-span-4 col-span-1">
                    <form className="space-y-4">
                        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Write a review</h2>
                        {/* Estrellas de calificación */}
                        <div className="flex justify-center items-center space-x-1 mb-4">
                            {[1, 2, 3, 4, 5].map(star => (
                                <label
                                    key={star}
                                    onMouseEnter={() => setHoveredStar(star)}
                                    onMouseLeave={() => setHoveredStar(0)}
                                    onClick={() => setSelectedStar(star)}
                                    className={`text-2xl cursor-pointer hover:scale-110 ${
                                        (hoveredStar >= star || selectedStar >= star) ? 'text-yellow-400' : 'text-gray-300'
                                    }`}
                                >
                                    ★
                                </label>
                            ))}
                        </div>
                        {/* Campo de reseña */}
                        <textarea
                            id="review"
                            name="review"
                            rows="4"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                            className="block w-full p-3 text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Write your review"
                        />
                        <div className="text-right py-4">
                            <a onClick={(e) => handleReview(e)}
                               className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-sm px-5 py-3">
                                Post Review
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ReviewForm;
