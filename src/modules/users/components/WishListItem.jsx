import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartShopping, faStar, faTrash} from '@fortawesome/free-solid-svg-icons';
import PropTypes from "prop-types";

const WishListItem = ({item, handleAddToCart, handleDeleteItem}) => {

    const formattedDate = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(new Date(item.addedDate));

    return (
        <tr className="bg-green-50 rounded-lg hover:bg-gray-100 transition-colors duration-300 ease-in-out border-b-2 border-gray-300"
            key={item.productId}>
            <td className="py-4 px-8">
                <div className="flex items-center">
                    <img className=" w-48 mr-5" src={item.image} alt="Product"/>
                    <span className="font-extrabold text-xl font-sans ml-3">{item.productName}</span>
                </div>
            </td>
            <td className="py-4 px-6">
                <span className="font-sans text-xl">{item.shortDescription}.</span>
            </td>
            <td className="py-4 px-6 font-sans font-semibold text-xl text-center">
                ${item.productPrice}
            </td>
            <td className="py-4 px-6 whitespace-nowrap">
                <div className="flex items-center justify-center">
                    {[...Array(5)].map((_, index) => {
                        // Default color for empty stars (gray)
                        let starColor = "#d1d1d1";

                        // Check if the rating is greater than the index to make the star yellow
                        if (item.rating > index + 1) {
                            starColor = "#e6b400"; // Yellow for filled stars
                        }

                        return (
                            <FontAwesomeIcon
                                key={index}
                                icon={faStar}
                                className="h-6"
                                style={{color: starColor}}
                            />
                        );
                    })}
                </div>
                <span className="ml-2 text-gray-600 font-semibold text-xl flex items-center justify-center">
                    {item.rating}
                    <span
                        className="text-indigo-600 cursor-pointer text-xl hover:underline transition duration-200 ml-1">
                        ({item.numRatings} reviews)
                    </span>
                </span>
            </td>
            <td className="py-4 px-6">
                <div className="flex flex-col space-y-4 items-center">
                    <button
                        className="text-2xl py-3 bg-yellow-500 text-white w-full rounded-md flex items-center justify-center transition duration-300 ease-in-out hover:bg-yellow-900 hover:scale-105"
                        onClick={() => handleAddToCart(item.productId)}>
                        <FontAwesomeIcon icon={faCartShopping} className="mr-2"/>
                        Add to Cart
                    </button>
                    <button
                        className="text-2xl py-3 bg-red-600 text-white w-full rounded-md flex items-center justify-center transition duration-300 ease-in-out hover:bg-red-800 hover:scale-105"
                        onClick={() => handleDeleteItem(item.productId)}>
                        <FontAwesomeIcon icon={faTrash} className="mr-2"/>
                        Delete
                    </button>
                </div>
                <div className="flex items-center mt-2">
                    <span className="font-semibold text-gray-500 text-lg">Article added on {formattedDate}</span>
                </div>
            </td>
        </tr>
    );
};

WishListItem.propTypes = {
    item: PropTypes.shape({
        productId: PropTypes.number.isRequired,
        productName: PropTypes.string.isRequired,
        shortDescription: PropTypes.string.isRequired,
        productPrice: PropTypes.number.isRequired,
        image: PropTypes.string,
        addedDate: PropTypes.number,
        rating: PropTypes.number,
        numRatings: PropTypes.number,
    }).isRequired,
    handleAddToCart: PropTypes.func.isRequired,
    handleDeleteItem: PropTypes.func.isRequired,
};

export default WishListItem;
