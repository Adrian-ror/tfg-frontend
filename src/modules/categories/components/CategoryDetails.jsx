import CategoryCard from "./CategoryCard.jsx";
import {useParams} from "react-router-dom";
import {useCategoryStore} from "../../../store/useCategoryStore.js";
import useResponseHandler from "../../../hooks/useResponseHandler.js";
import {useEffect, useState} from "react";
import {Loader} from "../../common/index.js";
import CategoriesNotFound from "./CategoriesNotFound.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBackward, faList} from "@fortawesome/free-solid-svg-icons";

const CategoryDetails = () => {

    // Handle backend responses
    const {handleSuccess, handleErrors} = useResponseHandler();

    // Get product ID from URL parameters
    const {id} = useParams();

    const {findCategoryById, updateExistingCategory, addSubcategory} = useCategoryStore(state => ({
        findCategoryById: state.findCategoryById,
        updateExistingCategory: state.updateExistingCategory,
        addSubcategory: state.addSubcategory
    }));

    // State variables
    const [category, setCategory] = useState(null);
    const [subcategories, setSubcategories] = useState(null);

    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [newSubcategory, setNewSubcategory] = useState(null);
    const [isNew, setIsNew] = useState(true);

    const handleEditClick = (e) => {
        e.stopPropagation();
        setIsEditing(true);
    };

    const handleSaveChanges = () => {
        if (categoryName !== category.name) {
            updateExistingCategory(category.id, categoryName,
                () => handleSuccess('Modified', location.pathname),
                handleErrors
            );
        }
    };

    const handleInputChange = (e) => {
        setCategoryName(e.target.value);
    };

    const handleInputBlur = () => {
        setIsEditing(false);
        handleSaveChanges();
    };

    const handleInputKeyDown = (e) => {
        if (e.key === 'Enter') {
            setIsEditing(false);
            handleSaveChanges();
        }
    };

    // Fetch product details from backend when component mounts or ID changes
    useEffect(() => {
        const categoryId = Number(id);
        if (!Number.isNaN(categoryId)) {
            setIsLoading(true); // Show loader when page changes

            findCategoryById(id, (category) => {
                setCategory(category);
                setCategoryName(category.name);
                setSubcategories(category.subcategories);
            }, handleErrors);

            const timer = setTimeout(() => {
                setIsLoading(false); // Stop loading after 2 seconds
            }, 1000);

            return () => clearTimeout(timer); // Cleanup the timeout on unmount
        }
    }, [id]);

    if (isLoading) {
        return <Loader/>;
    }

    // Handle the creation of a new empty subcategory card
    const handleCreateSubcategory = () => {
        const emptySubcategory = {id: Date.now(), name: ''};
        setNewSubcategory(emptySubcategory);
    };

    // Function to save the new subcategory name
    const handleSaveNewSubcategory = (name) => {

        if (!name.trim()) {
            setNewSubcategory(null)
            return
        }

        addSubcategory(id, name, (newSubcategories) => {
            setSubcategories(newSubcategories)
            setNewSubcategory(null)
            handleSuccess('Created', `/categories/${id}`)
        }, handleErrors);

        setIsNew(true)
    };

    return (
        <div className="p-6">
            <button
                className="px-10 py-4 ml-6 text-white bg-indigo-400 rounded-md hover:bg-indigo-800 transition duration-300 ease-in-out"
                onClick={() => window.history.back()}
            >
                <FontAwesomeIcon icon={faBackward} className="h-6"/>
            </button>
            <h1 className="text-5xl font-extrabold font-sans text-center italic mb-10">
                <span className="bg-yellow-600 w-full px-8 py-3 shadow-lg rounded-lg border-2 border-gray-300">
                    {isEditing ? (
                        <input
                            type="text"
                            value={categoryName}
                            onChange={handleInputChange}
                            onBlur={handleInputBlur}
                            onKeyDown={handleInputKeyDown}
                            className="text-center text-xl font-extrabold bg-yellow-600 border-none focus:outline-none"
                            autoFocus
                        />
                    ) : (
                        <span onClick={handleEditClick} className="cursor-pointer">
                            {categoryName}
                        </span>
                    )}
                </span>
            </h1>

            <div className="container mx-auto mb-6 shadow-lg rounded-lg border-2 bg-gray-50 p-6">
                <h2 className="text-3xl font-extrabold text-center mb-6">
                    <span className="text-black">
                        Subcategories
                        <FontAwesomeIcon icon={faList} className="ml-4 h-8"/>
                    </span>
                    <div className="flex justify-end mb-4">
                        <button
                            className="bg-teal-500 text-white text-xl font-bold px-5 py-3 rounded-lg border border-black hover:bg-green-800"
                            onClick={handleCreateSubcategory}
                        >
                            Create Subcategory
                        </button>
                    </div>
                </h2>
                <div className="flex flex-wrap justify-center gap-6">
                    {category && subcategories && subcategories.length > 0 ? (
                        subcategories.map((subcategory) => (
                            <div key={subcategory.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                                <CategoryCard category={subcategory} showDetails={false}
                                />
                            </div>
                        ))
                    ) : (
                        <div className="mt-8">
                            <CategoriesNotFound/>
                        </div>
                    )}

                    {newSubcategory && (
                        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                            <CategoryCard
                                category={newSubcategory}
                                isNew={isNew}
                                onSave={handleSaveNewSubcategory}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoryDetails;
