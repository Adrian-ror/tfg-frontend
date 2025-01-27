import {faBackward} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useEffect, useState} from "react";
import ProductUserCard from "./ProductUserCard.jsx";
import backend from "../../../backend/index.js";
import useResponseHandler from "../../../hooks/useResponseHandler.js"; // Asegúrate de que esta importación siga siendo válida

const Products = () => {

    const [products, setProducts] = useState([]);


    // Handle backend responses
    const {handleErrors} = useResponseHandler();

    useEffect(() => {
        backend.sellerService.getAllProducts(
            (products) => setProducts(products),
            (errors) => handleErrors(errors));
    }, []);

    console.log(products)
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
                                    My Products
                                </h1>

                                <div className="mt-6 flow-root w-full sm:mt-8">
                                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {products.map((product, index) => (
                                            <ProductUserCard key={index} product={product}/>
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

export default Products;
