import {faBackward} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useEffect, useState} from "react";
import {findAllReports} from "../../../backend/reportService.js";
import useResponseHandler from "../../../hooks/useResponseHandler.js";
import ReportCard from "./ReportCard.jsx";

const Reports = () => {

    const [reports, setReports] = useState([]);

    const reportTypes = [
        {value: '', label: 'All reports'},
        {value: 'PENDING', label: 'Pending'},
        {value: 'IN_PROGRESS', label: 'In progress'},
        {value: 'RESOLVED', label: 'Resolved'},
        {value: 'REJECTED', label: 'Rejected'},
    ];

    const [selectedType, setSelectedType] = useState('');
    const {handleErrors} = useResponseHandler();


    useEffect(() => {
        findAllReports((reports) => setReports(reports),
            (errors) => handleErrors(errors))
    }, []);

    return (
        <div className="flex flex-col">
            <div className="flex-grow py-8">
                <div className="container mx-auto px-4">
                    <button
                        className="px-10 py-3 ml-6 text-white bg-indigo-400 rounded-md hover:bg-indigo-800 transition duration-300 ease-in-out"
                        onClick={() => window.history.back()}
                    >
                        <FontAwesomeIcon icon={faBackward} className="h-6"/>
                    </button>

                    <section className="bg-white w-full py-8 antialiased dark:bg-gray-900 md:py-16">
                        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                            <div className="flex flex-col w-full items-center">
                                <h1 className="text-5xl font-extrabold font-sans text-center text-gray-800 mb-4 pb-2">
                                    Manage Reports
                                </h1>

                                <div className="mt-6 flow-root w-full sm:mt-8">
                                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {reports.map((report, index) => (
                                            <ReportCard key={index} report={report}/>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Reports;
