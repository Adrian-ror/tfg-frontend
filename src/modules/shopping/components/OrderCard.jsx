import PropTypes from 'prop-types';
import {useUsersStore} from "../../../store/useUsersStore.js";
import ChangeOrderStatus from "../../orders/components/ChangeOrderStatus.jsx";
import {useState} from "react";

const OrderCard = ({order}) => {
    const {isAdmin} = useUsersStore(state => ({
        isAdmin: state.isAdmin()
    }));

    const formattedDate = new Date(order.date).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });

    const getStateClass = (state) => {
        switch (state) {
            case 'CONFIRMED':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            case 'IN_TRANSIT':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
            case 'PRE-ORDER':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
        }
    };

    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const StatusIcon = ({state}) => {
        const icons = {
            CONFIRMED: (
                <svg className="me-1 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                     height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M5 11.917 9.724 16.5 19 7.5"/>
                </svg>
            ),
            IN_TRANSIT: (
                <svg className="me-1 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                     height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"/>
                </svg>
            ),
            PRE_ORDER: (
                <svg className="me-1 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                     height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M18.5 4h-13m13 16h-13M8 20v-3.333a2 2 0 0 1 .4-1.2L10 12.6a1 1 0 0 0 0-1.2L8.4 8.533a2 2 0 0 1-.4-1.2V4h8v3.333a2 2 0 0 1-.4 1.2L13.957 11.4a1 1 0 0 0 0 1.2l1.643 2.867a2 2 0 0 1 .4 1.2V20H8Z"/>
                </svg>
            ),
            default: null,
        };
        return icons[state] || null;
    };

    return (
        <div
            className="flex flex-wrap items-center justify-between py-8 gap-y-6"> {/* Aumentamos los márgenes y el padding */}
            <dl className="flex-1 min-w-[250px] sm:w-1/4">
                <dt className="text-lg font-medium text-gray-500 dark:text-gray-400">Order ID:</dt>
                {/* Aumentamos el tamaño del texto */}
                <dd className="mt-2 text-lg font-semibold text-gray-900 dark:text-white"> {/* Aumentamos el tamaño del texto */}
                    <a href={`/shopping/orders/${order.id}`} className="hover:underline">#{order.id}</a>
                </dd>
            </dl>

            <dl className="flex-1 min-w-[250px] sm:w-1/4">
                <dt className="text-lg font-medium text-gray-500 dark:text-gray-400">Date:</dt>
                <dd className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">{formattedDate}</dd>
            </dl>

            <dl className="flex-1 min-w-[250px] sm:w-1/4">
                <dt className="text-lg font-medium text-gray-500 dark:text-gray-400">Price:</dt>
                <dd className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">${order.totalPrice}</dd>
            </dl>

            <dl className="flex-1 min-w-[250px] sm:w-1/4">
                <dt className="text-lg font-medium text-gray-500 dark:text-gray-400">Status:</dt>
                <dd className={`me-2 mt-2 inline-flex items-center rounded px-4 py-1.5 text-sm font-medium ${getStateClass(order.state)}`}>
                    <StatusIcon state={order.state}/>
                    {order.state}
                </dd>
            </dl>

            <dl>
                <div className="flex gap-6 w-full sm:w-auto justify-end">
                    {isAdmin && order.state !== 'CONFIRMED' && (
                        <>
                            <button
                                type="button"
                                onClick={() => openModal()}
                                className="min-w-[10rem] rounded-lg px-10 py-3 text-center text-base font-medium bg-red-700 text-white hover:bg-red-800 focus:ring-red-300"
                            >
                                Change status
                            </button>
                            <ChangeOrderStatus isOpen={isOpen} onClose={closeModal} order={order}/>
                        </>
                    )}
                    <a
                        href={`/shopping/orders/${order.id}`}
                        className="min-w-[10rem] flex justify-center text-center rounded-lg border border-gray-200 bg-white px-10 py-3 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                    >
                        View details
                    </a>
                </div>
            </dl>
        </div>
    );
};

OrderCard.propTypes = {
    order: PropTypes.shape({
        id: PropTypes.number.isRequired,
        date: PropTypes.number.isRequired,
        totalPrice: PropTypes.number.isRequired,
        state: PropTypes.string.isRequired,
    }).isRequired,
};

export default OrderCard;
