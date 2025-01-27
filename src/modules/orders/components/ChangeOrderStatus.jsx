import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import useResponseHandler from "../../../hooks/useResponseHandler.js";
import {changeOrderState} from "../../../backend/orderService.js";

const ChangeOrderStatus = ({isOpen, onClose, order}) => {
    const [selectedStatus, setSelectedStatus] = useState(order?.state || null);
    const {handleSuccess, handleErrors} = useResponseHandler();

    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            document.body.classList.add("overflow-hidden"); // Disable body scroll
            window.addEventListener("keydown", handleEscape);
        }

        return () => {
            document.body.classList.remove("overflow-hidden"); // Re-enable body scroll
            window.removeEventListener("keydown", handleEscape); // Clean up the event on close
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const orderStates = [
        {
            state: "CONFIRMED",
            label: "Confirmed",
            style: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
        },
        {
            state: "IN_TRANSIT",
            label: "In Transit",
            style: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
        },
        {
            state: "PRE-ORDER",
            label: "Pre-Order",
            style: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
        }
    ];

    const handleConfirm = () => {
        if (selectedStatus) {
            changeOrderState(order.id, selectedStatus,
                () => {
                    handleSuccess('Status changed', '/orders');
                    location.reload();
                },
                (errors) => handleErrors(errors));
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{background: "rgba(0, 0, 0, 0.7)"}}>
            <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-8"> {/* Aumentado el tamaño del modal */}
                {/* Close button */}
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        type="button"
                        aria-label="Close status selector"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg p-2 inline-flex items-center"
                    >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>

                {/* Modal title */}
                <h2 className="text-2xl font-extrabold text-center mb-6"> {/* Título más grande */}
                    Change Order Status
                </h2>

                {/* Order state options */}
                {orderStates.map(({state, label, style}) => (
                    <div
                        key={state}
                        className={`p-6 rounded-lg cursor-pointer mb-4 shadow-lg text-center ${style} ${
                            selectedStatus === state ? "ring-4 ring-blue-500" : ""
                        }`}
                        onClick={() => setSelectedStatus(state)}
                    >
                        <span className="text-xl font-semibold">{label}</span> {/* Aumentado el tamaño del texto */}
                    </div>
                ))}

                {/* Action buttons */}
                <div className="flex justify-between mt-6 space-x-4">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-6 rounded-lg text-lg"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        disabled={!selectedStatus}
                        className={`${
                            selectedStatus ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-300 cursor-not-allowed"
                        } text-white font-semibold py-3 px-6 rounded-lg text-lg`}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

ChangeOrderStatus.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    order: PropTypes.shape({
        id: PropTypes.number.isRequired,
        state: PropTypes.string.isRequired,
    }).isRequired,
};

export default ChangeOrderStatus;
