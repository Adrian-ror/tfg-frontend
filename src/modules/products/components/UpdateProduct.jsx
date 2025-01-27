import {useEffect, useState} from "react";
import {useCategoryStore} from "../../../store/useCategoryStore.js";
import CategoryModal from "../../common/components/CategoryModal.jsx";
import useResponseHandler from "../../../hooks/useResponseHandler.js";
import {useProductStore} from "../../../store/useProductStore.js";
import {useParams} from "react-router-dom";
import {Loader} from "../../common/index.js";
import {ProductNotFound} from "../index.js";
import backend from "../../../backend/index.js";

const UpdateProduct = () => {

    const {selectedCategory} = useCategoryStore(state => ({
        selectedCategory: state.getSelectedCategory()
    }));

    const {findByProductId} = useProductStore(state => ({
        findByProductId: state.findByProductId
    }));

    // Handle backend responses
    const {handleSuccess, handleErrors} = useResponseHandler();

    // Get product ID from URL parameters
    const {id} = useParams();

    // State variables
    const [found, setFound] = useState(false);

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


    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // State to manage loading status
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        findByProductId(id, (product) => {
            setTitle(product.name || '');
            setShortDescription(product.shortDescription || '');
            setDescription(product.description || '');
            setPrice(product.price || 0);
            setDiscount(product.discount || 0);
            setStock(product.stock || 0);
            setService(product.service || false);
            setBrand(product.brand || '');
            setLength(product.length || 0);
            setWidth(product.width || 0);
            setHeight(product.height || 0);
            setWeight(product.weight || 0);

            const mainImg = product.images.find(img => img.includes('_main')) || product.images[0];
            setMainImage(mainImg);
            setSecondaryImages(product.images.filter(img => !img.includes('_main')));
            setFound(true)
            setIsLoading(false)
        }, handleErrors);

    }, [id]);


    const handleSubmit = (event) => {
        event.preventDefault();

        backend.sellerService.updateProduct(
            id,
            title.trim(),
            shortDescription,
            description.trim(),
            mainImage,
            secondaryImages,
            price,
            discount === 0 ? null : discount,
            stock,
            service,
            brand,
            length === 0 ? null : length,
            width === 0 ? null : width,
            height === 0 ? null : height,
            weight === 0 ? null : weight,
            selectedCategory.id,
            () => handleSuccess('Product updated successfully', '/'),
            handleErrors  // Error handler
        );

    }

    if (isLoading) return <Loader/>;

    if (!found) return <ProductNotFound/>;

    return (
        <div className="flex items-center mt-8 mb-8 justify-center min-h-screen ">
            <div className="mx-auto p-8 bg-gray-50 rounded-lg shadow-lg max-w-lg w-full">
                <h2 className="text-4xl font-extrabold font-sans text-gray-800 mb-6 text-center">Update Product</h2>
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
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 py-3 px-4 text-xl text-gray-700 outline-none focus:border-blue-500 focus:shadow-md transition"
                    />
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
                        onChange={(e) => setShortDescription(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 py-3 px-4 text-xl text-gray-700 outline-none focus:border-blue-500 focus:shadow-md transition"
                    />
                </div>

                {/* Description */}
                <div className="mb-5">
                    <label htmlFor="description" className="mb-2 block text-xl font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        name="description"
                        id="description"
                        placeholder="Product Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 py-3 px-4 text-xl text-gray-700 outline-none focus:border-blue-500 focus:shadow-md transition"
                        rows="4"
                    />
                </div>


                <div className="mb-5">
                    <label htmlFor="mainImage" className="mb-2 block text-xl font-medium text-gray-700">
                        Main Image
                    </label>
                    <input
                        type="file"
                        name="mainImage"
                        id="mainImage"
                        onChange={(e) => setMainImage(e.target.files[0])}
                        className="block w-full text-xl rounded-lg cursor-pointer border border-gray-300 bg-white px-4 text-gray-500 outline-none focus:border-blue-500 focus:shadow-md"
                    />
                    <p className="mt-1 text-xl  text-gray-500">This will be the main product image.</p>
                    {mainImage && <p>{mainImage.name ? mainImage.name : mainImage}</p>}

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
                        onChange={(e) => setSecondaryImages(Array.from(e.target.files))}
                        className="block w-full rounded-lg cursor-pointer text-xl border border-gray-300 bg-white px-4 text-gray-500 outline-none focus:border-blue-500 focus:shadow-md"
                    />
                    <p className="mt-1 text-xl text-gray-500">Upload additional images to showcase your product.</p>
                    <div className="mt-3">
                        {secondaryImages.map((image, index) => (
                            <p key={index}>{image}</p>
                        ))}
                    </div>

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
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 py-3 px-4 text-xl text-gray-700 outline-none focus:border-blue-500 focus:shadow-md transition"
                            placeholder="0"
                            required
                        />
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
                            onChange={(e) => setDiscount(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 py-3 px-4 text-xl text-gray-700 outline-none focus:border-blue-500 focus:shadow-md transition"
                            placeholder="0"
                        />
                    </div>
                </div>

                {/* Category */}
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
                        onChange={(e) => setBrand(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 py-3 px-4 text-xl text-gray-700 outline-none focus:border-blue-500 focus:shadow-md transition"
                    />
                </div>

                {/* Service Checkbox */}
                <div className="mb-5 flex items-center">
                    <input
                        type="checkbox"
                        name="service"
                        id="service"
                        checked={service}
                        onChange={(e) => setService(e.target.checked)}
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
                                onChange={(e) => setStock(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 py-3 px-4 text-xl text-gray-700 outline-none focus:border-blue-500 focus:shadow-md transition"
                            />
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
                                    onChange={(e) => setLength(e.target.value)}
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
                                    onChange={(e) => setWidth(e.target.value)}
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
                                    onChange={(e) => setHeight(e.target.value)}
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
                                    onChange={(e) => setWeight(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 py-3 px-4 text-xl text-gray-700 outline-none focus:border-blue-500 focus:shadow-md transition"
                                />
                            </div>
                        </div>


                    </>
                )}


                <button
                    type="submit"
                    className="w-full py-3 text-xl px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition"
                    onClick={(e) => handleSubmit(e)}
                >
                    Update Product
                </button>
            </div>
        </div>
    );
};


export default UpdateProduct;
