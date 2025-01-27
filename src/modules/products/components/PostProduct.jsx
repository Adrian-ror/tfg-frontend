import {useState} from "react";
import {useUsersStore} from "../../../store/useUsersStore.js";
import {useCategoryStore} from "../../../store/useCategoryStore.js";
import backend from "../../../backend/index.js";
import CategoryModal from "../../common/components/CategoryModal.jsx";
import useResponseHandler from "../../../hooks/useResponseHandler.js";

const PostProduct = () => {
    const user = useUsersStore(state => state.getUser());

    const {selectedCategory} = useCategoryStore(state => ({
        selectedCategory: state.getSelectedCategory()
    }));


    // Handle backend responses
    const {handleSuccess, handleErrors} = useResponseHandler();

    const [title, setTitle] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [description, setDescription] = useState('');

    const [mainImage, setMainImage] = useState(null);
    const [secondaryImages, setSecondaryImages] = useState([]);


    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [stock, setStock] = useState(0);
    const [service, setService] = useState(false);
    const [brand, setBrand] = useState('');
    const [length, setLength] = useState(0);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errors, setErrors] = useState({});

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);


    const validateForm = () => {
        const newErrors = {};

        if (!title.trim()) newErrors.title = "Title is required.";
        //if (title.trim().length < 5) newErrors.title = "Title must be at least 5 characters.";

        if (!shortDescription.trim()) newErrors.shortDescription = "Short description is required.";
        //if (shortDescription.trim().length < 10) newErrors.shortDescription = "Short description must be at least 10 characters.";

        if (!description.trim()) newErrors.description = "Description is required.";
        //if (description.trim().length < 20) newErrors.description = "Description must be at least 20 characters.";

        if (!mainImage) newErrors.mainImage = "Main image is required.";

        if (parseFloat(price) <= 0) newErrors.price = "Price must be greater than 0.";
        if (parseFloat(discount) < 0) newErrors.discount = "Discount cannot be negative.";
        if (parseFloat(discount) >= parseFloat(price)) newErrors.discount = "Discount must be less than the price.";

        if (stock < 0) newErrors.stock = "Stock cannot be negative.";

        if (length < 0 || width < 0 || height < 0 || weight < 0) newErrors.dimensions = "Dimensions and weight cannot be negative.";

        if (!selectedCategory) newErrors.category = "Please select a category.";
        if (!brand.trim()) newErrors.brand = "Brand is required.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validateForm()) return; // If validation fails, stop the submission

        backend.sellerService.postProduct(
            user.id,
            title.trim(),
            shortDescription,
            description.trim(),
            mainImage,
            secondaryImages,
            price,
            (discount === 0) ? null : discount,
            stock,
            service,
            brand,
            (length === 0) ? null : length,
            (width === 0) ? null : width,
            (height === 0) ? null : height,
            (weight === 0) ? null : weight,
            selectedCategory.id,
            () => handleSuccess('Published', '/'),
            (errors) => handleErrors(errors));

    }

    return (
        <div className="flex items-center mt-8 mb-8 justify-center min-h-screen ">
            <div className="mx-auto p-8 bg-gray-50 rounded-lg shadow-lg max-w-lg w-full">
                <h2 className="text-4xl font-extrabold font-sans text-gray-800 mb-6 text-center">Publish Your
                    Product</h2>
                <div className="mb-5">
                    <label htmlFor="title" className="mb-2 block text-xl font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Product Title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 py-3 px-4 text-xl text-gray-700 outline-none focus:border-blue-500 focus:shadow-md transition"
                    />
                    {errors.title && <p className="text-red-500 text-lg">{errors.title}</p>}

                </div>

                {/* Short Description */}
                <div className="mb-5">
                    <label htmlFor="shortDescription" className="mb-2 block text-xl font-medium text-gray-700">Short
                        Description</label>
                    <input
                        type="text"
                        name="shortDescription"
                        id="shortDescription"
                        placeholder="Short Product Description"
                        value={shortDescription}
                        onChange={e => setShortDescription(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 py-3 px-4 text-xl text-gray-700 outline-none focus:border-blue-500 focus:shadow-md transition"
                    />
                    {errors.shortDescription && <p className="text-red-500 text-lg">{errors.shortDescription}</p>}

                </div>

                <div className="mb-5">
                    <label htmlFor="description" className="mb-2 block text-xl font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        name="description"
                        id="description"
                        placeholder="Product Description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 py-3 px-4 text-xl text-gray-700 outline-none focus:border-blue-500 focus:shadow-md transition"
                        rows="4"
                    />
                    {errors.description && <p className="text-red-500 text-lg">{errors.description}</p>}

                </div>


                <div className="mb-5">
                    <label htmlFor="mainImage" className="mb-2 block text-xl font-medium text-gray-700">
                        Main Image
                    </label>
                    <input
                        type="file"
                        name="mainImage"
                        id="mainImage"
                        onChange={e => setMainImage(e.target.files[0])}
                        className="block w-full text-xl rounded-lg cursor-pointer border border-gray-300 bg-white px-4 text-gray-500 outline-none focus:border-blue-500 focus:shadow-md"
                    />
                    <p className="mt-1 text-xl text-gray-500">This will be the main product image.</p>
                    {errors.mainImage && <p className="text-red-500 text-lg">{errors.mainImage}</p>}

                </div>

                <div className="mb-5">
                    <label htmlFor="secondaryImages" className="mb-2 block text-xl font-medium text-gray-700">
                        Secondary Images
                    </label>
                    <input
                        type="file"
                        name="secondaryImages"
                        id="secondaryImages"
                        multiple
                        onChange={e => setSecondaryImages(Array.from(e.target.files))}
                        className="block text-xl w-full rounded-lg cursor-pointer border border-gray-300 bg-white px-4 text-gray-500 outline-none focus:border-blue-500 focus:shadow-md"
                    />
                    <p className="mt-1 text-xl text-gray-500">Upload additional images to showcase your product.</p>

                </div>

                <div className="flex space-x-4 mb-5">
                    <div className="w-1/2">
                        <label htmlFor="price" className="mb-2 block text-xl font-medium text-gray-700">
                            Price
                        </label>
                        <input
                            type="number"
                            name="price"
                            id="price"
                            min={0}
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 py-3 px-4 text-xl text-gray-700 outline-none focus:border-blue-500 focus:shadow-md transition"
                            placeholder="0"
                            required
                        />
                        {errors.price && <p className="text-red-500 text-lg">{errors.price}</p>}
                    </div>

                    {/* Discount */}
                    <div className="mb-5">
                        <label htmlFor="discount" className="mb-2 block text-xl font-medium text-gray-700">Price with
                            discount</label>
                        <input
                            type="number"
                            name="discount"
                            id="discount"
                            min={0}
                            value={discount}
                            onChange={e => setDiscount(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 py-3 px-4 text-xl text-gray-700 outline-none focus:border-blue-500 focus:shadow-md transition"
                            placeholder="0"
                        />
                        {errors.discount && <p className="text-red-500 text-lg">{errors.discount}</p>}
                    </div>
                </div>


                <div className="mb-5">
                    <label htmlFor="categories" className="mb-2 block text-xl font-medium text-gray-700">
                        Category
                    </label>
                    <button
                        id="categories"
                        className="w-full rounded-lg border border-gray-300 py-3 px-4 text-xl text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        onClick={openModal}
                    >
                        {selectedCategory ? selectedCategory.name : 'Select Category'}
                    </button>
                    {errors.category && <p className="text-red-500 text-lg">{errors.category}</p>}
                    <CategoryModal isOpen={isModalOpen} onClose={closeModal}/>
                </div>


                {/* Brand */}
                <div className="mb-5">
                    <label htmlFor="brand" className="mb-2 block text-xl font-medium text-gray-700">Brand</label>
                    <input
                        type="text"
                        name="brand"
                        id="brand"
                        value={brand}
                        onChange={e => setBrand(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 py-3 px-4 text-base text-gray-700 outline-none focus:border-blue-500 focus:shadow-md transition"
                    />
                    {errors.brand && <p className="text-red-500 text-lg">{errors.brand}</p>}
                </div>


                {/* Service Checkbox */}
                <div className="mb-5 flex items-center">
                    <input
                        type="checkbox"
                        name="service"
                        id="service"
                        checked={service}
                        onChange={e => setService(e.target.checked)}
                        className="mr-2 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 transition"
                    />
                    <label htmlFor="service" className="text-xl font-medium text-gray-700">
                        {service ? 'This product includes a service' : 'This product does not include a service'}
                    </label>
                </div>


                {/* Conditionally render fields for non-service products */}
                {!service && (
                    <>

                        {/* Stock */}
                        <div className="mb-5">
                            <label htmlFor="stock"
                                   className="mb-2 block text-xl font-medium text-gray-700">Stock</label>
                            <input
                                type="number"
                                name="stock"
                                id="stock"
                                min={0}
                                value={stock}
                                onChange={e => setStock(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 py-3 px-4 ttext-xl text-gray-700 outline-none focus:border-blue-500 focus:shadow-md transition"
                            />
                            {errors.stock && <p className="text-red-500 text-lg">{errors.stock}</p>}
                        </div>


                        {/* Dimensions */}
                        <div className="mb-5 grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="length"
                                       className="mb-2 block text-xl font-medium text-gray-700">Length</label>
                                <input
                                    type="number"
                                    name="length"
                                    id="length"
                                    value={length}
                                    min={0}
                                    onChange={e => setLength(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 py-3 px-4 text-xl text-gray-700 outline-none focus:border-blue-500 focus:shadow-md transition"
                                />
                            </div>
                            <div>
                                <label htmlFor="width"
                                       className="mb-2 block text-xl font-medium text-gray-700">Width</label>
                                <input
                                    type="number"
                                    name="width"
                                    id="width"
                                    value={width}
                                    min={0}
                                    onChange={e => setWidth(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 py-3 px-4 text-xl text-gray-700 outline-none focus:border-blue-500 focus:shadow-md transition"
                                />
                            </div>
                            <div>
                                <label htmlFor="height"
                                       className="mb-2 block text-xl font-medium text-gray-700">Height</label>
                                <input
                                    type="number"
                                    name="height"
                                    id="height"
                                    value={height}
                                    min={0}
                                    onChange={e => setHeight(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 py-3 px-4 text-xl text-gray-700 outline-none focus:border-blue-500 focus:shadow-md transition"
                                />
                            </div>
                            <div>
                                <label htmlFor="weight"
                                       className="mb-2 block text-xl font-medium text-gray-700">Weight</label>
                                <input
                                    type="number"
                                    name="weight"
                                    id="weight"
                                    value={weight}
                                    min={0}
                                    onChange={e => setWeight(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 py-3 px-4 text-xl text-gray-700 outline-none focus:border-blue-500 focus:shadow-md transition"
                                />
                            </div>
                        </div>
                        {errors.dimensions && <p className="text-red-500 text-lg">{errors.dimensions}</p>}


                    </>
                )}
                <button
                    type="submit"
                    className="w-full py-3 px-6 bg-blue-600 text-xl text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition"
                    onClick={handleSubmit}
                >
                    Publish Product
                </button>
            </div>
        </div>
    );
}

export default PostProduct;
