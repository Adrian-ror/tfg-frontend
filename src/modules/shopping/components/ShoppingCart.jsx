import {ShoppingCartItem} from "../index.js";
import {EmptyShoppingCart} from "../../users/index.js";
import useResponseHandler from "../../../hooks/useResponseHandler.js";
import {faArrowRightLong} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ShoppingHeader} from "../../common/index.js";
import {useShoppingCartStore} from "../../../store/useShoppingCartStore.js";

function ShoppingCart() {

    // Use custom hook to handle success responses
    const {handleSuccess} = useResponseHandler();

    // Retrieve shopping cart data and remove function from the store
    const {removeShoppingCartItem, shoppingCart, totalPrice, itemCount} = useShoppingCartStore(state => ({
        removeShoppingCartItem: state.removeItem,
        shoppingCart: state.getShoppingCart(),
        totalPrice: state.getTotalPrice(),
        itemCount: state.getItemCount()
    }));


    // Function to handle the checkout process
    const handleCheckout = () => {
        handleSuccess('', "/shopping/checkout");
    };

    // Function to render the shopping cart items
    const renderCartItems = () => (
        <div>

            <div className="flex items-center justify-center mt-8 ">
                {/* Shopping Header */}
                <ShoppingHeader
                    isCartCompleted={true}
                    isCheckoutCompleted={false}
                    isOrderSummaryCompleted={false}
                />
            </div>
            {/* Page Title */}
            <h2 className="title font-manrope font-extrabold mt-8 text-5xl leading-10 mb-8 text-center text-black">
                Shopping Cart
            </h2>
            {/* Table Headers */}
            <div className="rounded-lg border-2 border-gray-500 bg-red-50 hidden lg:grid grid-cols-2 py-2">
                <div className="font-extrabold text-2xl text-center leading-8 text-gray-500">Product</div>
                <div className="font-extrabold text-2xl leading-8 text-gray-500 flex items-center">
                    <span className="w-full flex items-center justify-center text-center">Quantity</span>
                    <span className="w-full flex items-center justify-center text-center">Total</span>
                </div>
            </div>

            {/* Map through shopping cart items and render each item */}
            {shoppingCart.items.map(item => (
                <ShoppingCartItem
                    key={item.productId}
                    shoppingItemListId={shoppingCart.id}
                    item={item}
                    onRemoveItem={removeShoppingCartItem}
                />
            ))}

            {/* Display subtotal, delivery charge, and total */}
            <div
                className="bg-gray-50 rounded-xl shadow-lg border-2 p-6 w-full mb-8 max-lg:max-w-xl max-lg:mx-auto mt-4">

                {/* Subtotal */}
                <div className="flex items-center justify-between w-full mb-6">
                    <p className="font-extrabold font-sans text-2xl leading-8 text-gray-500">Sub Total</p>
                    <h6 className="font-extrabold font-sans text-2xl leading-8 text-gray-500">
                        ${totalPrice.toFixed(2)}
                    </h6>
                </div>

                {/* Delivery Charge */}
                <div className="flex items-center justify-between w-full mb-6">
                    <p className="font-extrabold font-sans text-2xl leading-8 text-gray-500">Delivery Charge</p>
                    <h6 className="font-extrabold font-sans text-2xl leading-8 text-gray-500">$5.00</h6>
                </div>

                {/* Total */}
                <div className="flex items-center justify-between w-full py-4">
                    <p className="font-manrope font-extrabold font-sans text-3xl leading-9 text-gray-900 underline">Total</p>
                    <h6 className="font-manrope font-extrabold font-sans text-3xl leading-9 underline">
                        ${(totalPrice + 5).toFixed(2)}
                    </h6>
                </div>
            </div>
        </div>
    );

    // Function to render the checkout button
    const renderButtons = () => (
        <div className="flex items-center flex-col sm:flex-row justify-center gap-3 mt-8">
            <button
                onClick={handleCheckout}
                className="rounded-lg w-full max-w-[320px] py-4 text-center bg-yellow-600 font-semibold text-2xl text-white flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                aria-label="Continue to Checkout"
            >
                Continue to Checkout
                <FontAwesomeIcon icon={faArrowRightLong} className="ml-3"/>
            </button>
        </div>
    );

    return (
        <section className="relative">
            <div className="w-full p-10 lg:6 mx-auto">
                {/* Render empty cart component or cart items based on the cart state */}
                {itemCount === 0 ? <EmptyShoppingCart/> : renderCartItems()}
                {itemCount > 0 && renderButtons()}
            </div>
        </section>
    );
}

export default ShoppingCart;
