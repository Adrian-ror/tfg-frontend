import PropTypes from 'prop-types';
import useResponseHandler from "../../../hooks/useResponseHandler.js";
import {useShoppingCartStore} from "../../../store/useShoppingCartStore.js";
import {buy} from "../../../backend/shoppingService.js";

const PriceSummary = ({subtotal, paymentMethod, pickup, userAddress, total}) => {

    // Use custom hook to handle success responses
    const {handleSuccess, handleErrors} = useResponseHandler();

    const {shoppingCart} = useShoppingCartStore(state => ({
        shoppingCart: state.getShoppingCart()
    }));

    // Function to handle the checkout process
    const handlePayment = (e) => {
        e.preventDefault();

        if (paymentMethod && userAddress && pickup) {
            buy(shoppingCart.id, paymentMethod, userAddress, pickup.id,
                () => handleSuccess('Payment completed successfully!', '/'),
                (errors) => handleErrors(errors))
        }
    };

    return (
        <div
            className="mt-8 w-full space-y-8 sm:mt-10 lg:mt-0 lg:max-w-xl xl:max-w-2xl bg-white rounded-lg border shadow-md p-8 dark:bg-gray-800"
        >
            <div className="flow-root">
                <div className="-my-4 divide-y divide-gray-200 dark:divide-gray-700">
                    <dl className="flex items-center justify-between gap-6 py-4">
                        <dt className="text-lg font-semibold text-gray-500 dark:text-gray-400">Subtotal</dt>
                        <dd className="text-lg font-semibold text-gray-900 dark:text-white">${subtotal.toFixed(2)}</dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-6 py-4">
                        <dt className="text-lg font-semibold text-gray-500 dark:text-gray-400">Store Pickup</dt>
                        <dd className="text-lg font-semibold text-gray-900 dark:text-white">${pickup?.shippingCost.toFixed(2) || 0}</dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-6 py-4">
                        <dt className="text-2xl font-bold text-gray-900 dark:text-white">Total</dt>
                        <dd className="text-2xl font-bold text-gray-900 dark:text-white">${total.toFixed(2)}</dd>
                    </dl>
                </div>
            </div>

            <div className="space-y-6">
                <button
                    type="submit"
                    onClick={handlePayment}
                    disabled={paymentMethod === null || pickup === null || userAddress === null}
                    className={`w-full flex items-center justify-center rounded-lg ${(paymentMethod && pickup && userAddress) ? 'bg-yellow-500 hover:bg-yellow-900' : 'bg-gray-600'} px-8 py-4 text-lg font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-700 dark:hover:bg-blue-600 dark:focus:ring-blue-900 transition-all`}
                >
                    Proceed to Payment
                </button>

                <p className="text-base font-medium text-gray-500 dark:text-gray-400">
                    To complete your purchase, review and confirm the items in your cart.
                </p>
            </div>
        </div>
    );
};

PriceSummary.propTypes = {
    subtotal: PropTypes.number.isRequired,
    paymentMethod: PropTypes.number,
    pickup: PropTypes.object,
    userAddress: PropTypes.number,
    total: PropTypes.number.isRequired,
};

export default PriceSummary;
