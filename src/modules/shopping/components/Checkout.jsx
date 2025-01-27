import {ShoppingHeader} from "../../common/index.js";
import {useEffect, useState} from "react";
import DeliveryOptions from "./DeliveryOptions.jsx";
import PaymentOptions from "./PaymentOptions.jsx";
import PriceSummary from "./PriceSummary.jsx";
import {useUsersStore} from "../../../store/useUsersStore.js";
import useResponseHandler from "../../../hooks/useResponseHandler.js";
import {useShoppingCartStore} from "../../../store/useShoppingCartStore.js";
import {findPaymentMethods, getDefaultPaymentMethod} from "../../../backend/paymentService.js";
import {getShippingMethods} from "../../../backend/shoppingService.js";
import {findDefaultUserAddress} from "../../../backend/addressService.js";
import {Link} from "react-router-dom";
import CheckoutForm from "./CheckoutForm.jsx";

const Checkout = () => {

    // Hooks para acceder al estado del usuario y el carrito
    const user = useUsersStore(state => state.getUser());

    const {totalPrice} = useShoppingCartStore(state => ({
        totalPrice: state.getTotalPrice()
    }));


    // Use custom hook to handle success responses
    const {handleErrors} = useResponseHandler();

    const [methods, setMethods] = useState([]);
    const [deliveryMethods, setDeliveryMethods] = useState([]);

    const [selectedPayment, setSelectedPayment] = useState(null);

    const [selectedDelivery, setSelectedDelivery] = useState(null);
    const [address, setAddress] = useState(null);


    // Efecto para cargar métodos de pago y el método de pago por defecto
    useEffect(() => {
        findPaymentMethods(user.id,
            (methods) => setMethods(methods),
            (errors) => handleErrors(errors));

        getDefaultPaymentMethod(user.id,
            (defaultMethod) => {
                setSelectedPayment(defaultMethod?.id || null);
            },
            (errors) => handleErrors(errors)
        );
        findDefaultUserAddress(
            (address) => setAddress(address),
            (errors) => handleErrors(errors));

        getShippingMethods(
            (shippingMethods) => setDeliveryMethods(shippingMethods),
            (errors) => handleErrors(errors)
        );

    }, []);

    // Renderizar la interfaz de checkout
    return (
        <div className="flex w-full items-center justify-center min-h-screen">
            <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
                <form noValidate className="mx-auto w-full px-4 2xl:px-0">
                    <ShoppingHeader
                        isCartCompleted={true}
                        isCheckoutCompleted={true}
                        isOrderSummaryCompleted={false}
                    />
                    <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
                        <div className="min-w-0 flex-1 space-y-8">
                            {address ? (
                                <CheckoutForm formData={address}/>
                            ) : (
                                <div>
                                    <h3 className="text-xl font-manrope text-center font-extrabold mb-4 text-gray-900 dark:text-white">No
                                        Address By Default </h3>
                                </div>
                            )}
                            <Link to="/users/addresses">
                                <button
                                    className="mt-4 w-full bg-blue-600 text-xl text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
                                    Manage your addresses
                                </button>
                            </Link>

                            {methods ? (
                                <>
                                    <PaymentOptions
                                        selectedPayment={selectedPayment}
                                        setSelectedPayment={setSelectedPayment}
                                        methods={methods}
                                    />
                                    {selectedPayment == null &&
                                        <p className="text-red-500 text-lg mt-2">No default card selected</p>
                                    }
                                </>

                            ) : (
                                <div>
                                    <h3 className="text-xl font-manrope text-center font-extrabold mb-4 text-gray-900 dark:text-white">
                                        No payment methods found
                                    </h3>
                                </div>
                            )}

                            <Link to="/users/cards">
                                <button
                                    className="mt-4 w-full text-xl bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
                                    Manage your payment methods
                                </button>
                            </Link>

                            {deliveryMethods ? (
                                <>
                                    <DeliveryOptions
                                        shippingMethods={deliveryMethods}
                                        selectedDelivery={selectedDelivery}
                                        setSelectedDelivery={setSelectedDelivery}
                                    />
                                    {selectedDelivery == null &&
                                        <p className="text-red-500 text-lg mt-2">No delivery method selected</p>
                                    }
                                </>
                            ) : (
                                <div>
                                    <h3 className="text-lg font-manrope text-center font-extrabold mb-4 text-gray-900 dark:text-white">
                                        No delivery methods found
                                    </h3>
                                </div>
                            )}

                        </div>
                        <div className="mt-8 lg:mt-0 lg:ml-8 max-w-xl">
                            <PriceSummary
                                subtotal={totalPrice}
                                paymentMethod={selectedPayment}
                                pickup={selectedDelivery}
                                userAddress={address?.id}
                                total={totalPrice + (selectedDelivery?.shippingCost || 0) + 199}
                            />
                        </div>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default Checkout;
