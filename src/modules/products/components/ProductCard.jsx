import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBug, faCartShopping, faHeart, faStar} from '@fortawesome/free-solid-svg-icons';
import {useUsersStore} from "../../../store/useUsersStore.js";
import useResponseHandler from "../../../hooks/useResponseHandler.js";
import {useShoppingCartStore} from "../../../store/useShoppingCartStore.js";
import {useWishListStore} from "../../../store/useWishListStore.js";

const ProductCard = ({product}) => {

// Access to user store actions and data
    const {shoppingCart, addCartItem} = useShoppingCartStore(state => ({
        shoppingCart: state.getShoppingCart(),
        addCartItem: state.addItem,
    }));

    const {wishList, addWishItem} = useWishListStore(state => ({
        wishList: state.getWishList(),
        addWishItem: state.addItem,
    }));

    const {isShopper, user, isAdmin} = useUsersStore(state => ({
        isShopper: state.isShopper(),
        user: state.getUser(),
        isAdmin: state.isAdmin()
    }));


    // Handle backend responses
    const {handleSuccess, handleErrors} = useResponseHandler();

    // Handle adding products to the shopping cart
    const handleSubmitCart = (event) => {
        event.preventDefault(); // Prevent the default form action
        event.stopPropagation(); // Stop the click event from bubbling up

        if (!user) {
            // If the user is not authenticated, redirect to the login page
            handleSuccess('', '/users/login');
            return;
        }

        addCartItem(
            shoppingCart.id,
            product.id,
            1,
            () => handleSuccess('Product added to cart!', ''),
            handleErrors
        );
    };

    // Handle adding products to the wish list
    const handleSubmitWish = (event) => {
        event.preventDefault(); // Prevent the default form action
        event.stopPropagation(); // Stop the click event from bubbling up

        if (!user) {
            // If the user is not authenticated, redirect to the login page
            handleSuccess('', '/users/login');
            return;
        }

        addWishItem(
            wishList.id,
            product.id,
            () => handleSuccess('Product added to wish list!', ''),
            handleErrors
        );
    };

    // Handle navigating to product details
    const handleDetails = (event) => {
        event.preventDefault(); // Prevent the default form action
        handleSuccess('', `/product/${product.id}`);
    };
    console.log(product)

    return (
        <section
            className="relative rounded-lg border-2 border-gray-200 p-5 py-6 bg-gray-300 text-center transform duration-500 hover:-translate-y-2 cursor-pointer hover:bg-gray-200"
            onClick={handleDetails}
        >
            <div
                className="absolute top-4 left-4 border-2 italic border-gray-700 rounded-lg bg-yellow-100 text-gray-900 font-semibold text-lg flex items-center justify-center w-auto"
            >
                <p className="py-2 px-4">{product.categoryName}</p>
            </div>

            {/* Product Type (Physical or Service) */}
            <div
                className="absolute top-4 right-5 border-2 italic border-gray-700 rounded-lg bg-blue-100 text-gray-900 font-semibold text-lg flex items-center justify-center w-auto"
            >
                <p className="py-2 px-4">{product.service ? 'Service' : 'Physical'}</p>
            </div>

            {/* Product Image */}
            <img
                src={product.image}
                alt={product.name}
                className="w-48 h-48  object-cover mx-auto rounded-md mb-4 mt-14"
            />

            {/* Product Name */}
            <h1 className="text-lg my-3 mb-4 cursor-pointer relative">
                <span className="absolute inset-0 opacity-50" aria-hidden="true"/>
                <span className="relative z-10 text-2xl font-semibold">{product.name}</span>
            </h1>

            <p className="text-xl text-gray-500 italic font-sans font-bold mb-4">{product.shortDescription}</p>

            {/* Product Price and Rating Section */}
            <div className="flex justify-between items-center mb-4">
                {/* Product Price */}
                <div
                    className="ml-6 w-auto border-2 border-gray-700 rounded-md bg-green-100 flex items-center justify-center">
                    <h2 className="text-lg py-2 px-4 font-bold tracking-wide text-gray-900 font-sans">${product.price}</h2>
                </div>

                {/* Rating Section */}
                <div className="flex space-x-1 mr-8">
                    {[...Array(5)].map((_, index) => {
                        // Default color for empty stars (gray)
                        let starColor = "#f1efef";

                        // Check if the rating is greater than the index to make the star yellow
                        if (product.rating > index + 1) {
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

            </div>

            {!user || isShopper ? (
                    <>
                        <div>
                            {/* Action Buttons */}
                            <button
                                className="p-2 py-3 px-2 text-xl font-bold bg-yellow-500 text-white w-full rounded-md flex items-center justify-center transition duration-300 ease-in-out hover:bg-yellow-900 hover:scale-105"
                                onClick={(event) => handleSubmitCart(event)} // Click event to add product to cart
                            >
                                <FontAwesomeIcon icon={faCartShopping} className="mr-2"/>
                                Add To Cart
                            </button>
                            <button
                                className="p-2 py-3 px-2 text-xl font-bold mt-2 bg-indigo-500 text-white w-full rounded-md flex items-center justify-center transition duration-300 ease-in-out hover:bg-indigo-700 hover:scale-105"
                                onClick={(event) => handleSubmitWish(event)} // Click event to add product to wish list
                            >
                                <FontAwesomeIcon icon={faHeart} className="mr-2"/>
                                Save for Later
                            </button>
                        </div>
                    </>

                ) :
                null
            }
            {user && !isAdmin && (
                <button
                    className="p-2 py-3 px-2 text-xl mt-2 bg-red-500 text-white w-full rounded-md flex items-center justify-center transition duration-300 ease-in-out hover:bg-red-700 hover:scale-105"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleSuccess('', `/reports/product/${product.id}`);
                    }}
                >
                    <FontAwesomeIcon icon={faBug} className="mr-2"/>
                    Report
                </button>
            )}


        </section>
    );
};

ProductCard.propTypes = {

    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        categoryName: PropTypes.string.isRequired,
        shortDescription: PropTypes.string.isRequired,
        rating: PropTypes.number,
        visible: PropTypes.bool.isRequired,
        service: PropTypes.bool.isRequired,
    }).isRequired,

};

export default ProductCard;
