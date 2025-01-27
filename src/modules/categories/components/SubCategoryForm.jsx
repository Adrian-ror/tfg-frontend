import {useEffect, useState} from 'react';
import useResponseHandler from "../../../hooks/useResponseHandler.js";
import {useCategoryStore} from "../../../store/useCategoryStore.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBackward} from "@fortawesome/free-solid-svg-icons";
import {useParams} from "react-router-dom";
import {Loader} from "../../common/index.js";

const SubCategoryForm = () => {

    // Handle backend responses
    const {handleSuccess, handleErrors} = useResponseHandler();

    // Get product ID from URL parameters
    const {id} = useParams();

    const {findCategoryById} = useCategoryStore(state => ({
        findCategoryById: state.findCategoryById
    }));

    //State variables
    const [category, setCategory] = useState(null);
    const [name, setName] = useState('');


    const {addSubcategory} = useCategoryStore(state => ({
        addNewCategory: state.addNewCategory,
        addSubcategory: state.addSubcategory
    }))

    // State to manage loading status
    const [isLoading, setIsLoading] = useState(true);

    // Fetch product details from backend when component mounts or ID changes
    useEffect(() => {
        const categoryId = Number(id);
        if (!Number.isNaN(categoryId)) {

            setIsLoading(true); // Show loader when page changes

            findCategoryById(id, (category) => {
                setCategory(category)
            }, handleErrors);

            const timer = setTimeout(() => {
                setIsLoading(false); // Stop loading after 2 seconds
            }, 1000);

            // Cleanup the timeout on unmount
            return () => clearTimeout(timer);
        }
    }, [id]);


    if (isLoading) {
        return <Loader/>;
    }


    const handleSave = (event) => {
        event.preventDefault();
        addSubcategory(id, name, () => {
            handleSuccess('Created', `/categories/${id}`)
        }, handleErrors);

    };


    return (
        <div className="p-6">
            <button
                className="px-8 py-2 ml-6 text-white bg-indigo-400 rounded-md hover:bg-indigo-800 transition duration-300 ease-in-out"
                onClick={() => window.history.back()}
            >
                <FontAwesomeIcon icon={faBackward}/>
            </button>

            <section className="bg-gray-50 dark:bg-gray-900  flex items-center justify-center">

                <div className="w-full max-w-xl p-6 bg-white border-2 rounded-lg shadow-lg dark:bg-gray-800">


                    <h2 className="text-2xl text-center font-extrabold mb-4">Create a subcategory
                        for {category.name}</h2>
                    <form onSubmit={(e) => handleSave(e)}>
                        <div className="mb-8">
                            <label htmlFor="name" className="block text-gray-700 font-semibold">Category Name</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full p-2 border border-gray-300 rounded-md mt-2"
                                placeholder="Enter category name"
                            />
                        </div>


                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-800 transition duration-200"
                        >
                            Create
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
}

export default SubCategoryForm;
