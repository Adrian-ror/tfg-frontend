import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBan, faBug, faCartShopping, faHeart, faPenToSquare, faStar} from '@fortawesome/free-solid-svg-icons';
import {Loader, QuantitySelector} from "../../common/index.js";
import useResponseHandler from "../../../hooks/useResponseHandler.js";
import {useShoppingCartStore} from "../../../store/useShoppingCartStore.js";
import {useWishListStore} from "../../../store/useWishListStore.js";
import {useProductStore} from "../../../store/useProductStore.js";
import {useUsersStore} from "../../../store/useUsersStore.js";
import {ProductNotFound} from "../index.js";
import backend from "../../../backend/index.js";
import {createChat} from "../../../backend/chatService.js";
import {isProductPurchased, isProductReviewed} from "../../../backend/shoppingService.js";

const ProductDetails = () => {
    // Destructure user store methods for managing cart and wishlist
    const {addToWishList, wishList} = useWishListStore((state) => ({
        addToWishList: state.addItem,
        wishList: state.getWishList(),
    }));

    const {addToShoppingCart, shoppingCart} = useShoppingCartStore(state => ({
        addToShoppingCart: state.addItem,
        shoppingCart: state.getShoppingCart()
    }));

    const {findByProductId} = useProductStore(state => ({
        findByProductId: state.findByProductId
    }));

    const {isShopper, user, isAdmin} = useUsersStore(state => ({
        isShopper: state.isShopper(),
        user: state.getUser(),
        isAdmin: state.isAdmin()
    }));

    // Handle backend responses
    const {handleSuccess, handleErrors} = useResponseHandler();

    // Get product ID from URL parameters
    const {id} = useParams();

    // State variables
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [mainImage, setMainImage] = useState("");

    // State to manage loading status
    const [isLoading, setIsLoading] = useState(true);
    const [isPurchased, setIsPurchased] = useState(false);
    const [isReviewed, setIsReviewed] = useState(false);

    useEffect(() => {
        findByProductId(id, (product) => {
            setProduct(product);
            const mainImg = product.images.find(img => (img.includes('_main') || img.includes('-main'))) || product.images[0];
            setMainImage(mainImg);
            setIsLoading(false)
        }, handleErrors);


        if (user) {
            isProductPurchased(id,
                (isPurchased) => setIsPurchased(isPurchased),
                (errors) => handleErrors(errors));

            isProductReviewed(id,
                (isReviewed) => setIsReviewed(isReviewed),
                (errors) => handleErrors(errors)
            );
        }

    }, [id]);

    // Handle quantity increment
    const handleIncrement = () => setQuantity((prev) => prev + 1);

    // Handle quantity decrement
    const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : prev));


    // Add product to wishlist
    const handleHide = (e) => {
        e.preventDefault();
        backend.sellerService.deleteProduct(
            id,
            () => handleSuccess('Product Hided', '/'),
            (errors) => handleErrors(errors));
    };


    const handleUpdate = (e) => {
        e.preventDefault();
        handleSuccess('', `/users/products/${product.id}`)
    };

    // Add product to shopping cart
    const handleAddToCart = (e) => {
        e.preventDefault();

        if (!user) {
            // If the user is not authenticated, redirect to the login page
            handleSuccess('', '/users/login');
            return;
        }


        addToShoppingCart(shoppingCart.id, product.id, quantity,
            () => handleSuccess('', '/shopping/shopping-cart'));
    };

    // Add product to wishlist
    const handleAddToWishList = (e) => {
        e.preventDefault();

        if (!user) {
            // If the user is not authenticated, redirect to the login page
            handleSuccess('', '/users/login');
            return;
        }


        addToWishList(wishList.id, product.id,
            () => handleSuccess('', '/users/wishList'));
    };

    // Change the displayed main image
    const changeImage = (src) => setMainImage(src);

    if (isLoading) return <Loader/>;

    if (!product) return <ProductNotFound/>;

    // Rating logic for displaying stars
    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 !== 0;

        return (
            <div className="flex items-center  space-x-1">
                {[...Array(fullStars)].map((_, index) => (
                    <FontAwesomeIcon key={`full-${index}`} className="h-6" icon={faStar} style={{color: "#e6b400"}}/>
                ))}
                {halfStar && <FontAwesomeIcon icon={faStar} className="h-6" style={{color: "#e6b400", opacity: 0.5}}/>}
                {[...Array(5 - fullStars - (halfStar ? 1 : 0))].map((_, index) => (
                    <FontAwesomeIcon key={`empty-${index}`} className="h-6" icon={faStar} style={{color: "#d1d1d1"}}/>
                ))}
            </div>
        );
    };


    const handleCreateChat = () => {

        if (user) {
            if (product.userName !== user.userName) {
                createChat(
                    product.userName,
                    (chat) => {
                        handleSuccess('', `/messages/${chat.id}`);
                    },
                    (error) => {
                        handleErrors(error);
                    }
                );
            }
        }
    };


    return (
        <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row md:space-x-16">

                {/* Product Images */}
                <div
                    className="w-1/2 md:w-1/2 mb-4 md:mb-0 mt-4 border-r border-gray-400 border-6 p-2 flex flex-col items-center justify-center">
                    <div className="w-full mx-auto mb-8 mt-8 flex items-center justify-center">
                        <img
                            src={mainImage}
                            alt="Product"
                            className="w-96 h-auto rounded-lg shadow-md mb-2"
                        />
                    </div>
                    <div className="flex gap-2 py-2 justify-center overflow-x-auto">
                        {product.images.map((src, index) => (
                            <img
                                key={index}
                                src={src}
                                alt={`Thumbnail ${index + 1}`}
                                className={`w-16 h-16 object-cover rounded-md cursor-pointer ${src === mainImage ? 'opacity-100' : 'opacity-60'} hover:opacity-100 transition duration-300`}
                                onClick={() => changeImage(src)}
                            />
                        ))}
                    </div>
                </div>

                {/* Product Details */}
                <div className="w-1/2 md:w-1/2 md:ml-12">
                    <div className="w-full flex items-center justify-between mt-4 mb-4 mr-8">
                        {/* Category */}
                        <div className="flex justify-start w-1/4">
                            <p className="px-10 py-2 border-2 italic border-gray-700 rounded-lg flex items-start justify-start bg-yellow-50 text-gray-900 font-semibold text-lg w-auto">
                                {product.categoryName.toUpperCase()}
                            </p>
                        </div>

                        {/* Product Type (Physical or Service) */}
                        <div className="flex justify-end w-1/4">
                            <p className="py-2 px-4 border-2 italic border-gray-700 rounded-lg bg-blue-100 text-gray-900 font-semibold text-lg">
                                {product.service ? "SERVICE" : "PHYSICAL"}
                            </p>
                        </div>
                    </div>

                    <div className="w-full flex items-center justify-center">
                        <h2 className="text-5xl text-center font-extrabold font-sansflex-grow">
                            {product.name}
                        </h2>
                    </div>

                    {/* Created At */}
                    <div className="mb-6 mt-4">
                        <div
                            className="flex items-center justify-center">
                            <p className="text-lg text-gray-600 underline italic font-medium text-center">
                                Published on {new Date(product.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    <div className="w-full flex items-center justify-between mt-4 mb-2 mr-8">
                        {/* Brand */}
                        <div className="flex justify-start w-1/4">
                            <p className="px-6 py-3 border-2  border-gray-700 rounded-lg text-gray-800 font-semibold text-lg bg-gray-50 shadow-sm hover:shadow-md transition-all">
                                Brand: {product.brand}
                            </p>
                        </div>

                        {/* Username */}
                        <div className="flex justify-end w-1/4">
                            <p
                                onClick={handleCreateChat}
                                className={`px-6 py-3 ${user && (product.userName !== user.userName) ? 'cursor-pointer hover:underline' : ''}  border-2  border-gray-700 rounded-lg text-gray-800 font-semibold text-lg bg-gray-50 shadow-sm hover:shadow-md transition-all`}>
                                Owner: {product.userName}
                            </p>


                        </div>
                    </div>

                    <div className="flex w-full justify-end ">
                        {user && !isAdmin && user.role !== "PROVIDER" && (
                            <button
                                className="p-2 text-xl px-2 mt-2 bg-red-500 text-white w-auto rounded-md flex items-center justify-center transition duration-300 ease-in-out hover:bg-red-700 hover:scale-105"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleSuccess('', `/reports/user/${user.id}`);
                                }}
                            >
                                <FontAwesomeIcon icon={faBug} className="mr-2"/>
                                Report User
                            </button>
                        )}

                    </div>

                    {/* Product Description */}
                    <div className="mt-10 mb-8">
                        <h2 className="text-3xl font-extrabold mb-2 text-center">
                            About the product
                        </h2>
                        <p className="text-gray-600 mb-4 text-xl flex items-center justify-center">{product.description}.</p>
                    </div>

                    {/* Price & Reviews */}
                    <div className="mb-8 mt-10">
                        <h2 className="text-3xl font-extrabold mb-4 text-center">
                            Price & Reviews
                        </h2>
                        <div className="flex items-center justify-center">
                            <div className="flex items-center mr-8">
                                <div className="px-4 py-2 border border-gray-400 rounded-md bg-green-100">
                                    <h2 className="text-lg font-bold text-green-600">
                                        ${product.discount ? product.discount : product.price}
                                    </h2>
                                </div>
                                {(product.discount !== 0) && (
                                    <span
                                        className="ml-2 px-4 py-2 border border-gray-400 rounded-full bg-red-100 text-sm line-through">
                                        ${product.price}
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center">
                                {/* Rating Section */}
                                {renderStars(product.rating)}
                                <span className="ml-4 text-xl text-gray-600 font-semibold">
                                    {product.rating}
                                    <span
                                        onClick={() => handleSuccess('', `/products/${id}/reviews`)}
                                        className="text-indigo-600 text-xl cursor-pointer hover:underline transition duration-200 ml-1">
                                        ({product.numRatings} reviews)
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>

                    {!product.service ? (
                        <div className="mb-6">
                            <h2 className="text-3xl font-extrabold mb-4 text-center">Product Dimensions</h2>
                            <ul className="grid grid-cols-2 text-xl text-gray-700 border border-gray-700 rounded-lg">
                                <li className="flex items-center justify-between px-4 py-2 border-b border-gray-700">
                                    <span className="font-bold text-gray-900">Height:</span>
                                    <span
                                        className="font-sans font-semibold text-gray-600">
                                    {product.height ? `${product.height} inches` : "Not specified"}
                                    </span>
                                </li>
                                <li className="flex items-center justify-between px-4 py-2 border-b border-l border-gray-700">
                                    <span className="font-bold text-gray-900">Length:</span>
                                    <span
                                        className="font-sans font-semibold text-gray-600">
                                        {product.length ? `${product.length} inches` : "Not specified"}
                                    </span>
                                </li>
                                <li className="flex items-center justify-between px-4 py-2">
                                    <span className="font-bold text-gray-900">Width:</span>
                                    <span
                                        className="font-sans font-semibold text-gray-600">
                                        {product.width ? `${product.width} inches` : "Not specified"}
                                    </span>
                                </li>
                                <li className="flex items-center justify-between px-4 py-2 border-l border-gray-700">
                                    <span className="font-bold text-gray-900">Weight:</span>
                                    <span className="font-sans font-semibold text-gray-600">
                                        {product.weight ? `${product.weight} lbs` : "Not specified"}
                                    </span>
                                </li>
                            </ul>
                            {/* Stock Info */}
                            <div className="mb-8 mt-8 flex items-center justify-center">
                                <p className="text-3xl font-extrabold text-gray-900">
                                    Stock Available:
                                    <span className={`ml-2 ${product.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {product.stock > 0 ? `${product.stock} units` : 'Out of Stock'}
                            </span>
                                </p>

                            </div>
                        </div>

                    ) : null}


                    {!user || isShopper ? (
                        <div>

                            {/* Quantity Selector */}
                            {product.stock > 0 ? (
                                <div className="flex flex-col items-center mb-8">
                                    <h2 className="text-3xl font-extrabold mb-4">Select Quantity:</h2>
                                    <QuantitySelector
                                        quantity={quantity}
                                        handleDecrement={handleDecrement}
                                        handleIncrement={handleIncrement}
                                    />
                                </div>
                            ) : null
                            }

                            {/* Buttons for actions */}
                            <div className="flex space-x-4 mb-6 justify-center">
                                <button
                                    className="p-2 py-3 px-2 text-2xl bg-yellow-500 text-white w-full rounded-md flex items-center justify-center hover:bg-yellow-900 transition duration-300"
                                    onClick={handleAddToCart}
                                >
                                    <FontAwesomeIcon icon={faCartShopping} className="mr-2"/>
                                    Add To Cart
                                </button>
                                <button
                                    className="p-2 py-3 px-2 text-2xl bg-indigo-500 text-white w-full rounded-md flex items-center justify-center hover:bg-indigo-700 transition duration-300"
                                    onClick={handleAddToWishList}
                                >
                                    <FontAwesomeIcon icon={faHeart} className="mr-2"/>
                                    Save for Later
                                </button>
                            </div>
                        </div>
                    ) : null}

                    {user && !isAdmin && isPurchased && !isReviewed && (

                        <div className="w-full">

                            <button
                                className="p-2 py-3 px-2 text-2xl mb-2 bg-yellow-600 text-white w-full rounded-md flex items-center justify-center hover:bg-yellow-900 transition duration-300"
                                onClick={() => handleSuccess('', `/products/${id}/review`)}
                            >
                                <FontAwesomeIcon icon={faPenToSquare} className="mr-2"/>
                                Review Product
                            </button>
                        </div>

                    )}
                    {user && user.userName === product.userName && (
                        <div className="w-full">

                            <button
                                className="p-2 py-3 px-2 text-2xl mb-2 bg-yellow-600 text-white w-full rounded-md flex items-center justify-center hover:bg-yellow-900 transition duration-300"
                                onClick={(e) => handleUpdate(e)}
                            >
                                <FontAwesomeIcon icon={faPenToSquare} className="mr-2"/>
                                Update Product
                            </button>

                            {product.visible === false ? (
                                    <div
                                        className="w-full text-center mt-4 text-red-600 bg-red-100 p-4 rounded-lg shadow-md">
                                        <FontAwesomeIcon icon={faBan} className="mr-2"/>
                                        <p className="inline-block text-22xl font-semibold">This product is currently hidden
                                            and is not visible to others.</p>
                                    </div>
                                ) :
                                <button
                                    className="p-2 py-3 px-2 text-2xl bg-red-600 text-white w-full rounded-md flex items-center justify-center hover:bg-red-900 transition duration-300"
                                    onClick={(e) => handleHide(e)}
                                >
                                    <FontAwesomeIcon icon={faBan} className="mr-5"/>
                                    Hide Product
                                </button>
                            }

                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};


export default ProductDetails;
