import PropTypes from 'prop-types';
import useResponseHandler from "../../../hooks/useResponseHandler.js";

const OrderItemCard = ({item}) => {

    // Handle backend responses
    const {handleSuccess} = useResponseHandler();

    // Handle quantity increment
    const handleProductDetails = () => handleSuccess('', `/product/${item.productId}`);

    return (
        <div
            className="flex items-center justify-between py-6 gap-y-6 border-b border-gray-300 dark:border-gray-600"> {/* Aumentamos padding y borde */}
            <div className="flex-1">
                <h4 className="text-2xl font-bold underline text-gray-900 dark:text-white"> {/* Aumentamos el tamaño de la fuente */}
                    <span className="cursor-pointer" onClick={handleProductDetails}>
                        {item.productName}
                    </span>
                </h4>
                {/* Display category name with inline-block */}
                <p className="inline-block px-10 py-2 mt-4 cursor-pointer border-2 text-center italic border-green-100 rounded-lg bg-yellow-100 text-gray-500 font-semibold text-base"> {/* Aumentamos el padding y el tamaño del texto */}
                    {item.categoryName.toUpperCase()}
                </p>
            </div>

            <div className="flex-1 text-right">
                <p className="text-2xl font-semibold text-gray-900 dark:text-white"> {/* Aumentamos el tamaño de la fuente */}
                    Quantity: {item.quantity}
                </p>
                <p className="text-xl mt-4 font-medium text-gray-500 dark:text-gray-400"> {/* Aumentamos el tamaño del texto */}
                    Unit Price: ${item.productPrice.toFixed(2)}
                </p>
                <p className="text-2xl font-bold mt-2 text-gray-900 dark:text-white"> {/* Aumentamos el tamaño de la fuente */}
                    Total: ${(item.productPrice * item.quantity).toFixed(2)}
                </p>
            </div>
        </div>
    );
};

OrderItemCard.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        productId: PropTypes.number.isRequired,
        productName: PropTypes.string.isRequired,
        productPrice: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
        categoryName: PropTypes.string.isRequired,
    }).isRequired,
};

export default OrderItemCard;
