import {useState} from 'react';
import useResponseHandler from "../../../hooks/useResponseHandler.js";
import {useCategoryStore} from "../../../store/useCategoryStore.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBackward, faTrash} from "@fortawesome/free-solid-svg-icons";

const CategoryForm = () => {

    const [name, setName] = useState('');

    const [subcategories, setSubcategories] = useState(['']); // Estado para múltiples subcategorías

    const {handleSuccess, handleErrors} = useResponseHandler();

    const {addNewCategory, addSubcategory} = useCategoryStore(state => ({
        addNewCategory: state.addNewCategory,
        addSubcategory: state.addSubcategory
    }))


    const handleSubmit = (event) => {
        event.preventDefault();

        addNewCategory(name, (category) => {

            subcategories && subcategories.forEach((subcategory) => {
                if (subcategory) {
                    addSubcategory(category.id, subcategory, null, handleErrors);
                }
            });
            handleSuccess(`Category ${category.name} created`, '/categories');

        }, handleErrors);

    };

    const handleSubcategoryChange = (index, value) => {
        const updatedSubcategories = [...subcategories];
        updatedSubcategories[index] = value;
        setSubcategories(updatedSubcategories);
    };

    const addSubcategoryField = () => {
        setSubcategories([...subcategories, '']);
    };

    const removeSubcategoryField = (index) => {
        const updatedSubcategories = subcategories.filter((_, i) => i !== index);
        setSubcategories(updatedSubcategories);
    };


    return (
        <div className="p-10"> {/* Aumento del padding general */}
            <button
                className="px-10 py-4 ml-8 text-white bg-indigo-400 rounded-md hover:bg-indigo-800 transition duration-300 ease-in-out"
                onClick={() => window.history.back()}
            >
                <FontAwesomeIcon icon={faBackward} className="h-6 w-6"/>
            </button>

            <section className="bg-gray-50 dark:bg-gray-900 flex items-center justify-center mt-10">
                <div
                    className="w-full max-w-4xl p-8 bg-white border-2 rounded-lg shadow-xl dark:bg-gray-800"> {/* Aumento del max-width y padding */}
                    <h2 className="text-3xl text-center font-extrabold mb-6">Create a
                        category</h2> {/* Aumento del tamaño de la fuente */}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-10">
                            <label htmlFor="name" className="block text-gray-700 font-semibold text-xl">Category
                                Name</label> {/* Aumento de tamaño de fuente */}
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full p-4 border border-gray-300 rounded-md mt-4 text-lg"
                                placeholder="Enter category name"
                            />
                        </div>

                        <h2 className="text-2xl text-center mt-12 font-extrabold mb-6">Add
                            Subcategories</h2> {/* Aumento del tamaño de la fuente */}
                        {subcategories.map((subcategory, index) => (
                            <div key={index} className="mb-6 flex items-center justify-center">
                                <input
                                    type="text"
                                    value={subcategory}
                                    onChange={(e) => handleSubcategoryChange(index, e.target.value)}
                                    className="w-full p-4 border border-gray-300 rounded-md mt-2 mr-4 text-lg"
                                    placeholder={`Enter subcategory`}
                                />
                                <button
                                    type="button"
                                    onClick={() => removeSubcategoryField(index)}
                                    className="text-center mt-2 ml-4 text-red-600 hover:text-red-800 text-xl"
                                >
                                    <FontAwesomeIcon icon={faTrash} className="h-6 w-6"/>
                                </button>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={addSubcategoryField}
                            className="w-full bg-yellow-600 text-white p-4 rounded-md hover:bg-yellow-800 transition duration-300 mb-6 text-lg"
                        >
                            Add Another Subcategory
                        </button>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white p-4 rounded-md hover:bg-blue-800 transition duration-300 text-lg"
                        >
                            Create
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
}

export default CategoryForm;
