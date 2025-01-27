import PropTypes from 'prop-types';
import useResponseHandler from "../../../hooks/useResponseHandler.js";
import {useCategoryStore} from "../../../store/useCategoryStore.js";
import {useState} from "react";
import {useLocation} from "react-router-dom";

const CategoryCard = ({category, isNew = false, onSave, showDetails = true}) => {
    const {handleSuccess, handleErrors} = useResponseHandler();

    // Estado para manejar el modo de edición y el nombre actualizado
    const [isEditing, setIsEditing] = useState(isNew);
    const [categoryName, setCategoryName] = useState(category.name || '');
    const location = useLocation();

    const {updateExistingCategory, deleteExistingCategory} = useCategoryStore(state => ({
        updateExistingCategory: state.updateExistingCategory,
        deleteExistingCategory: state.deleteExistingCategory,
    }));

    const handleSaveChanges = () => {
        if (isNew) {
            onSave(categoryName);
        } else if (categoryName !== category.name) {
            updateExistingCategory(category.id, categoryName,
                () => handleSuccess('Modified', location.pathname),
                handleErrors
            );
        }
        setIsEditing(false);
    };

    const handleInputChange = (e) => {
        setCategoryName(e.target.value);
    };

    const handleInputBlur = () => {
        handleSaveChanges();
    };

    const handleInputKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSaveChanges();
        }
    };

    const handleDelete = (event) => {
        event.preventDefault();
        event.stopPropagation();
        deleteExistingCategory(category.id, () => {
            handleSuccess('Deleted', location.pathname);
            window.location.reload();
        }, handleErrors);
    };

    return (
        <div
            className="flex-shrink-0 bg-gray-50 shadow-xl rounded-lg border-2 border-gray-300
                    transition-transform duration-300 ease-in-out hover:scale-110 cursor-pointer
                    w-full sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 flex flex-col items-center justify-between p-6"
        >
            {isEditing ? (
                <input
                    type="text"
                    value={categoryName}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    onKeyDown={handleInputKeyDown}
                    placeholder={"Enter Category Name"}
                    className="block text-gray-800 font-extrabold text-2xl mt-2 w-full p-2 rounded-lg"
                    autoFocus
                />
            ) : (
                <span
                    className="block text-gray-800 font-extrabold text-2xl mt-2 w-full text-center cursor-pointer"
                    onClick={() => setIsEditing(true)} // Cambia a modo edición sin navegar
                >
                    {categoryName}
                </span>
            )}

            {!isNew && (
                <div className="flex flex-col w-full mt-4">
                    {showDetails && (
                        <button
                            onClick={() => handleSuccess('', `/categories/${category.id}`)} // Navega solo al hacer clic en "View Details"
                            className="bg-yellow-600 text-white w-full px-5 py-3 rounded-lg hover:bg-yellow-700 mb-3 text-lg"
                        >
                            View Details
                        </button>
                    )}

                    <button
                        className="bg-red-700 text-white w-full px-5 py-3 rounded-lg hover:bg-red-800 text-lg"
                        onClick={(e) => handleDelete(e)}
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
};

CategoryCard.propTypes = {
    category: PropTypes.object.isRequired,
    isNew: PropTypes.bool,
    onSave: PropTypes.func,
    showDetails: PropTypes.bool
};

export default CategoryCard;
