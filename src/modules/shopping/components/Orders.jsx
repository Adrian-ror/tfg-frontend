import {faBackward} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useEffect, useState} from "react";
import OrderCard from "./OrderCard.jsx"; // Asegúrate de que esta importación siga siendo válida
import {Pager} from "../../common/index.js";
import {useOrderStore} from "../../../store/useOrderStore.js"; // Asegúrate de que esta importación siga siendo válida

const Orders = () => {
    const {findOrders, filterOrdersCombined, totalOrders} = useOrderStore(state => ({
        findOrders: state.findOrders,
        filterOrdersCombined: state.filterOrdersCombined,
        totalOrders: state.getTotalOrders(),
    }));

    const [orders, setOrders] = useState([]);

    const orderTypes = [
        {value: '', label: 'All orders'},
        {value: 'PRE_ORDER', label: 'Pre-order'},
        {value: 'IN_TRANSIT', label: 'In transit'},
        {value: 'CONFIRMED', label: 'Confirmed'},
        {value: 'CANCELLED', label: 'Cancelled'},
    ];

    const [selectedType, setSelectedType] = useState('');


    useEffect(() => {

        const filteredOrders = filterOrdersCombined(selectedType);
        setOrders(filteredOrders);

    }, [selectedType])

    useEffect(() => {
        findOrders(0, (orders) => setOrders(orders.items));
    }, []);

    return (
        <div className="flex flex-col">
            <div className="flex-grow py-8">
                <div className="container mx-auto px-4">
                    <button
                        className="px-10 py-4 ml-6 text-white bg-indigo-400 rounded-md hover:bg-indigo-800 transition duration-300 ease-in-out"
                        onClick={() => window.history.back()}
                    >
                        <FontAwesomeIcon icon={faBackward} className="h-6"/>
                    </button>

                    <section className="bg-white w-full py-8 antialiased dark:bg-gray-900 md:py-16">
                        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                            <div className="flex flex-col w-full items-center">
                                <h1 className="text-5xl font-extrabold font-sans text-center text-gray-800 mb-4 pb-2">
                                    Orders
                                </h1>

                                <div className="mt-6 flow-root w-full sm:mt-8">
                                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {orders.map((order, index) => (
                                            <OrderCard key={index} order={order}/>
                                        ))}
                                    </div>
                                    <Pager totalItems={totalOrders} currentPage={0}/>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Orders;
