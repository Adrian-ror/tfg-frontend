import {useEffect, useState} from "react";
import {Loader} from "../../common/index.js";
import PropTypes from "prop-types";
import {useCategoryStore} from "../../../store/useCategoryStore.js";
import CategoriesGrid from "./CategoriesGrid.jsx";
import useResponseHandler from "../../../hooks/useResponseHandler.js";

const CategoriesOverview = ({categories}) => {

    const {state_categories} = useCategoryStore(state => ({
        state_categories: state.getCategories()
    }));

    // Handle backend responses
    const {handleSuccess} = useResponseHandler();

    // State to manage loading status
    const [isLoading, setIsLoading] = useState(true);

    // Effect to simulate loading when the page changes
    useEffect(() => {
        setIsLoading(true); // Show loader when page changes

        const timer = setTimeout(() => {
            setIsLoading(false); // Stop loading after 2 seconds
        }, 1000);

        // Cleanup the timeout on unmount
        return () => clearTimeout(timer);
    }, [state_categories]); // Trigger on page or products change

    // Show the loader while loading
    if (isLoading) {
        return <Loader/>;
    }

    const handleCreate = (event) => {
        event.preventDefault();
        handleSuccess('', '/categories/new')
    };

    return (
        <div className="p-10">
            <div className="flex justify-end mb-6"> {/* Contenedor flex para alinear el botón */}
                <button
                    className="bg-teal-500 text-white text-lg font-bold px-6 py-4 rounded-lg border-2 border-black hover:bg-teal-800 transition duration-300 ease-in-out" // Estilo del botón
                    onClick={(e) => handleCreate(e)}
                >
                    Create Category
                </button>
            </div>

            {/* Title for the categories grid */}
            <h2 className="text-4xl font-extrabold text-center mb-10">
                <span className="px-6 py-4 rounded-lg bg-gray-50 shadow-lg border-4 border-gray-300">
                    Available Categories
                </span>
            </h2>

            <p className="text-center text-xl font-semibold italic text-gray-700 mb-8">
                Manage product categories, add new ones, or modify existing ones.
            </p>

            {/* Check if categories exist and render accordingly */}
            {!categories || categories.length === 0 ? (
                <div>
                    {/* Render the categories */}
                    <CategoriesGrid categories={state_categories}/>
                </div>
            ) : null}
        </div>
    );
};

// Prop type validation
CategoriesOverview.propTypes = {
    categories: PropTypes.array
};

export default CategoriesOverview;
