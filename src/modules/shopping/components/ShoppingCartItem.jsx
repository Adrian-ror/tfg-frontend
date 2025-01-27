import PropTypes from "prop-types";
import useResponseHandler from "../../../hooks/useResponseHandler.js";
import {useShoppingCartStore} from "../../../store/useShoppingCartStore.js";
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {QuantitySelector} from "../../common/index.js";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

const ShoppingCartItem = ({shoppingItemListId, item, onRemoveItem}) => {
    const {handleSuccess} = useResponseHandler();
    const {updateShoppingCartItemQuantity} = useShoppingCartStore(state => ({
        updateShoppingCartItemQuantity: state.updateItemQuantity
    }));

    const [quantity, setQuantity] = useState(item.quantity);

    const updateQuantity = (newQuantity) => {
        if (newQuantity <= 0) {
            handleRemoveItem(); // Remove item from cart if quantity is 0 or less
        } else {
            updateShoppingCartItemQuantity(shoppingItemListId, item.productId, newQuantity);
            setQuantity(newQuantity); // Update local state with new quantity
        }
    };

    const handleIncrement = () => updateQuantity(quantity + 1);
    const handleDecrement = () => updateQuantity(quantity - 1);

    const handleRemoveItem = () => {
        onRemoveItem(shoppingItemListId, item.productId, () => handleSuccess('', "/shopping/shopping-cart"));
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 border-b-2 border-gray-500 py-4">
            <div className="flex items-center justify-center">
                <div className="flex items-center justify-center flex-col sm:flex-row gap-4 w-full">
                    <div className="img-box flex items-center justify-center">
                        <Link to={`/product/${item.productId}`}>
                            <img
                                src={item.image}
                                alt={item.productName}
                                className="w-48 ml-6"
                            />
                        </Link>
                    </div>
                    <div className="pro-data w-full sm:max-w-sm">
                        <h5 className="font-semibold text-2xl text-center mb-4 underline text-black">
                            <Link to={`/product/${item.productId}`} className="inline">
                                {item.productName}
                            </Link>
                        </h5>
                        <div className="flex items-center justify-center my-2 mb-4">
                            <p className="px-8 py-2 cursor-pointer border-2 text-center italic border-gray-400 rounded-lg bg-yellow-50 text-gray-500 font-semibold text-xl ">
                                {item.categoryName.toUpperCase()}
                            </p>
                        </div>
                        <div className="flex justify-center">
                            <button
                                className="p-2 px-16 bg-red-600 text-xl text-white w-48 text-center rounded-md flex items-center justify-center transition duration-300 ease-in-out hover:bg-red-800 hover:scale-105"
                                onClick={handleRemoveItem}
                            >
                                <FontAwesomeIcon icon={faTrash} className="mr-2"/>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center flex-col sm:flex-row gap-2 w-full">
                <div className="flex items-center justify-center w-full">
                    <QuantitySelector
                        handleDecrement={handleDecrement}
                        quantity={quantity}
                        handleIncrement={handleIncrement}
                    />
                </div>
                <div className="flex items-center justify-center w-full">
                    <div className="bg-yellow-500 flex justify-center items-center px-4 py-2 rounded-lg">
                        <h6 className="font-manrope font-sans font-extrabold text-xl leading-9 text-center">
                            <span className="mr-1">$</span>
                            <span>{(item.productPrice * quantity).toFixed(2)}</span>
                        </h6>
                    </div>
                </div>
            </div>
        </div>
    );
};

ShoppingCartItem.propTypes = {
    shoppingItemListId: PropTypes.number.isRequired,
    item: PropTypes.shape({
        productId: PropTypes.number.isRequired,
        productName: PropTypes.string.isRequired,
        categoryName: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        image: PropTypes.string,
        productPrice: PropTypes.number.isRequired,
    }).isRequired,
    onRemoveItem: PropTypes.func.isRequired,
};

export default ShoppingCartItem;
