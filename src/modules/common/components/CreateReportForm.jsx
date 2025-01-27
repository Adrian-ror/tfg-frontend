import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import useResponseHandler from "../../../hooks/useResponseHandler.js";
import {createReport} from "../../../backend/reportService.js";
import {useUsersStore} from "../../../store/useUsersStore.js";

const CreateReportForm = () => {

    const [reportedProductId, setReportedProductId] = useState("");
    const [reportedUserId, setReportedUserId] = useState("");
    const [reportType, setReportType] = useState("SPAM"); // default value
    const [description, setDescription] = useState("");
    const [error, setError] = useState(null);

    // Get productId or userId from URL parameters
    const {productId, userId} = useParams();
    const {handleSuccess, handleErrors} = useResponseHandler();

    const {user} = useUsersStore(state => ({
        user: state.getUser()
    }));

    // Use useEffect to set the reported IDs based on URL params
    useEffect(() => {
        if (productId) {
            setReportedProductId(productId);
            setReportType('PRODUCT');
        }
        if (userId) {
            setReportedUserId(userId);
            setReportType('USER');
        }
    }, [productId, userId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a report object based on whether productId or userId is provided
        const reportData = {
            reportedProductId: reportedProductId || null,
            reportedUserId: reportedUserId || null,
            reportType,
            description
        };

        createReport(user.id, reportData,
            () => handleSuccess('Reported!', '/'),
            (errors) => handleErrors(errors)
        );
    };

    return (
        <div className="container mx-auto flex items-center justify-center p-8">
            <div className="mx-auto bg-gray-100 shadow-lg rounded-lg p-10 w-full max-w-xl border">
                <h2 className="text-4xl font-bold text-center mb-8">Create Report</h2>

                {error && <p className="text-red-500 text-center mb-6">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Reported Product ID */}
                    {productId && (
                        <div className="flex flex-col">
                            <label htmlFor="reportedProductId" className="text-xl font-semibold">Reported Product
                                ID</label>
                            <input
                                type="number"
                                id="reportedProductId"
                                value={reportedProductId}
                                required
                                disabled
                                className="border px-5 py-3 mt-3 rounded-lg text-lg"
                            />
                        </div>
                    )}

                    {/* Reported User ID */}
                    {userId && (
                        <div className="flex flex-col">
                            <label htmlFor="reportedUserId" className="text-xl font-semibold">Reported User ID</label>
                            <input
                                type="number"
                                id="reportedUserId"
                                value={reportedUserId}
                                disabled
                                required
                                className="border px-5 py-3 mt-3 rounded-lg text-lg"
                            />
                        </div>
                    )}

                    {/* Report Type */}
                    <div className="flex flex-col">
                        <label htmlFor="reportType" className="text-xl font-semibold">Report Type</label>
                        <input
                            type="text"
                            id="reportType"
                            value={reportType}
                            required
                            disabled
                            className="border px-5 py-3 mt-3 rounded-lg text-lg"
                        />
                    </div>

                    {/* Description */}
                    <div className="flex flex-col">
                        <label htmlFor="description" className="text-xl font-semibold">Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="border px-5 py-3 mt-3 rounded-lg text-lg"
                            rows="6"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 mt-6 rounded-lg text-xl hover:bg-blue-600"
                    >
                        Submit Report
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateReportForm;
