import PropTypes from 'prop-types';
import {useUsersStore} from "../../../store/useUsersStore.js";
import {useState} from "react";
import ChangeReportStatus from "./ChangeReportStatus.jsx";

const ReportCard = ({report}) => {
    const {isAdmin} = useUsersStore(state => ({
        isAdmin: state.isAdmin()
    }));

    const formattedDate = new Date(report.reportedAt).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });

    const reportTypes = {
        PRODUCT: "Product Report",
        USER: "User Report"
    };

    const reportStatuses = {
        PENDING: "Pending",
        IN_PROGRESS: "In Progress",
        RESOLVED: "Resolved",
        REJECTED: "Rejected"
    };

    const getStateClass = (state) => {
        switch (state) {
            case 'REJECTED':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
            case 'RESOLVED':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            case 'IN_PROGRESS':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
            case 'PENDING':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
        }
    };

    // State to control the visibility of the modal
    const [isOpen, setIsOpen] = useState(false);

    // Functions to open/close the modal
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <div className="flex flex-wrap items-center justify-between py-8 gap-y-6">
            <dl className="flex-1 min-w-[250px] sm:w-1/4">
                <dt className="text-lg font-medium text-gray-500 dark:text-gray-400">Report ID:</dt>
                <dd className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
                    <a href={`/reports/${report.id}`} className="hover:underline">#{report.id}</a>
                </dd>
            </dl>

            <dl className="flex-1 min-w-[250px] sm:w-1/4">
                <dt className="text-lg font-medium text-gray-500 dark:text-gray-400">Reported At:</dt>
                <dd className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">{formattedDate}</dd>
            </dl>

            <dl className="flex-1 min-w-[250px] sm:w-1/4">
                <dt className="text-lg font-medium text-gray-500 dark:text-gray-400">Report Type:</dt>
                <dd className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
                    {reportTypes[report.reportType]}
                </dd>
            </dl>

            <dl className="flex-1 min-w-[250px] sm:w-1/4">
                <dt className="text-lg font-medium text-gray-500 dark:text-gray-400">Status:</dt>
                <dd className={`me-2 mt-2 inline-flex items-center rounded px-3 py-1 text-sm font-medium ${getStateClass(report.status)}`}>
                    {reportStatuses[report.status]}
                </dd>
            </dl>

            <dl className="flex-1 min-w-[250px] sm:w-1/4">
                <dt className="text-lg font-medium text-gray-500 dark:text-gray-400">Description:</dt>
                <dd className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">{report.description}</dd>
            </dl>

            <dl>
                <div className="flex gap-6 w-full sm:w-auto justify-end">
                    {isAdmin && report.status !== 'RESOLVED' && (
                        <>
                            <button
                                type="button"
                                onClick={() => openModal()}
                                className="min-w-[10rem] rounded-lg px-10 py-3 text-center text-lg font-medium bg-red-700 text-white hover:bg-red-800 focus:ring-red-300"
                            >
                                Change status
                            </button>
                            <ChangeReportStatus isOpen={isOpen} onClose={closeModal} report={report}/>
                        </>
                    )}
                </div>
            </dl>
        </div>
    );
};

ReportCard.propTypes = {
    report: PropTypes.shape({
        id: PropTypes.number.isRequired,
        reportedAt: PropTypes.number.isRequired,
        reportType: PropTypes.oneOf(['PRODUCT', 'USER']).isRequired,
        description: PropTypes.string.isRequired,
        status: PropTypes.oneOf(['PENDING', 'IN_PROGRESS', 'RESOLVED', 'REJECTED']).isRequired,
    }).isRequired,
};

export default ReportCard;
