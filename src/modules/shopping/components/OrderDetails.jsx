import {faBackward} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useEffect, useState} from "react";
import {useOrderStore} from "../../../store/useOrderStore.js";
import {useParams} from "react-router-dom";
import {Loader} from "../../common/index.js";
import OrderItemCard from "./OrderItemCard.jsx";

const OrderDetails = () => {
    const {findOrder} = useOrderStore(state => ({
        findOrder: state.findOrder
    }));
    const {id} = useParams();
    const [order, setOrder] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const orderId = Number(id);
        if (!Number.isNaN(orderId)) {
            setIsLoading(true);
            findOrder(id, (order) => {
                setOrder(order);
            });

            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [id, findOrder]);

    if (isLoading) {
        return <Loader/>;
    }

    return (
        <div className="flex flex-col">
            <div className="flex-grow py-10"> {/* Aumentamos el padding */}
                <div className="container mx-auto px-8"> {/* Aumentamos el padding lateral */}
                    <button
                        className="px-10 py-4 ml-8 text-lg text-white bg-indigo-400 rounded-md hover:bg-indigo-800 transition duration-300 ease-in-out"
                        onClick={() => window.history.back()}
                    >
                        <FontAwesomeIcon icon={faBackward} className="h-6"/>
                    </button>

                    <section className="w-full py-10 dark:bg-gray-900 md:py-16">
                        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                            <div className="flex flex-col w-full items-center">
                                <h1 className="text-5xl font-extrabold font-sans text-center text-gray-800 mb-6 pb-3">
                                    Order Items
                                </h1> {/* Aumentamos el tamaño del título */}

                                <div className="mt-8 flow-root w-full sm:mt-10">
                                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {order.items && order.items.map((item, index) => (
                                            <OrderItemCard key={index} item={item}/>
                                        ))}
                                    </div>
                                </div>

                                {/* Display Total Price */}
                                <div
                                    className="mt-10 text-2xl font-bold border shadow-lg px-5 py-3 rounded-lg bg-gray-50 text-gray-800 dark:text-white"
                                >
                                    Total Price: ${order.totalPrice} {/* Aumentamos el tamaño del texto */}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
