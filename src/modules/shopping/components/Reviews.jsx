import {useEffect, useState} from "react";
import useResponseHandler from "../../../hooks/useResponseHandler.js";
import {useParams} from "react-router-dom";
import {getProductReviews} from "../../../backend/shoppingService.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";

const Reviews = () => {

    // Handle backend responses
    const {handleErrors} = useResponseHandler();

    // Get product ID from URL parameters
    const {productId} = useParams();

    // State variables
    const [reviews, setReviews] = useState([]);


    useEffect(() => {

        if (productId !== null) {
            getProductReviews(productId,
                (reviews) => {
                    setReviews(reviews);
                },
                (errors) => handleErrors(errors));
        }


    }, [productId]);

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 !== 0;

        return (
            <div className="flex items-center space-x-1">
                {[...Array(fullStars)].map((_, index) => (
                    <FontAwesomeIcon key={`full-${index}`} icon={faStar} style={{color: "#e6b400"}}/>
                ))}
                {halfStar && <FontAwesomeIcon icon={faStar} style={{color: "#e6b400", opacity: 0.5}}/>}
                {[...Array(5 - fullStars - (halfStar ? 1 : 0))].map((_, index) => (
                    <FontAwesomeIcon key={`empty-${index}`} icon={faStar} style={{color: "#d1d1d1"}}/>
                ))}
            </div>
        );
    };


    return (
        <section className="bg-white px-4 py-12 md:py-24">
            <div className="max-w-screen-xl mx-auto">
                <h2 className="font-black text-black text-center text-3xl leading-none uppercase max-w-2xl mx-auto mb-10">
                    Reviews
                </h2>
                <div className="flex flex-wrap gap-4 md:gap-6">
                    {reviews && reviews.map((review, index) => (
                        <div key={index}
                             className="bg-gray-200 rounded-lg p-8 text-center md:w-1/3 flex flex-col items-center">
                            <p className="font-bold uppercase">{review.userName}</p>
                            <p className="text-xl font-light italic text-gray-700">{review.comment}</p>
                            <div className="flex items-center justify-center space-x-2 mt-4">
                                {renderStars(review.rating)}
                            </div>
                            <div className="flex items-center mt-2">
                                <span
                                    className="font-semibold text-gray-500 text-sm mr-3">Review posted on
                                    <p
                                        className="font-semibold text-gray-500 text-sm">
                                        {new Intl.DateTimeFormat('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        }).format(new Date(review.reviewDate))}
                                </p>
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};


export default Reviews;
