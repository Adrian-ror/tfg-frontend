import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import useResponseHandler from "../../../hooks/useResponseHandler.js";
import {updateReportStatus} from "../../../backend/reportService.js";

const ChangeReportStatus = ({isOpen, onClose, report}) => {

    const [selectedStatus, setSelectedStatus] = useState(report?.status || null);
    const {handleSuccess, handleErrors} = useResponseHandler();

    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            document.body.classList.add("overflow-hidden");
            window.addEventListener("keydown", handleEscape);
        }

        return () => {
            document.body.classList.remove("overflow-hidden");
            window.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const reportStatuses = [
        {
            status: "PENDING",
            label: "Pending",
            style: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
        },
        {
            status: "IN_PROGRESS",
            label: "In Progress",
            style: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
        },
        {
            status: "RESOLVED",
            label: "Resolved",
            style: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
        },
        {
            status: "REJECTED",
            label: "Rejected",
            style: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
        },
    ];

    const handleConfirm = () => {
        if (selectedStatus) {
            updateReportStatus(report.id, selectedStatus,
                () => {
                    location.reload();
                    handleSuccess('Report status changed successfully', '/reports')
                },
                (errors) => handleErrors(errors));
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{background: "rgba(0, 0, 0, 0.5)"}}>
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        type="button"
                        aria-label="Close status selector"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5 inline-flex items-center"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clipRule="evenodd"/>
                        </svg>
                    </button>
                </div>

                <h2 className="text-2xl font-bold text-center mb-4">Change Report Status</h2>

                {reportStatuses.map(({status, label, style}) => (
                    <div
                        key={status}
                        className={`p-4 rounded-lg cursor-pointer mb-2 shadow-md text-center ${style} ${selectedStatus === status ? "ring-2 ring-blue-500" : ""}`}
                        onClick={() => setSelectedStatus(status)}
                    >
                        <span className="font-semibold text-xl">{label}</span>
                    </div>
                ))}

                <div className="flex justify-between mt-4 space-x-2">
                    <button
                        onClick={onClose}
                        className="bg-gray-200 text-xl hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        disabled={!selectedStatus}
                        className={`${selectedStatus ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-300 cursor-not-allowed"} text-white text-xl font-semibold py-3 px-6 rounded-lg`}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

ChangeReportStatus.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    report: PropTypes.shape({
        id: PropTypes.number.isRequired,
        status: PropTypes.string.isRequired,
    }).isRequired,
};

export default ChangeReportStatus;
