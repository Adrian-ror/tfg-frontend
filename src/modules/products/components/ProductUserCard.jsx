import PropTypes from 'prop-types';

const ProductUserCard = ({product}) => {
    return (
        <div className="flex flex-wrap items-center justify-between py-8 gap-y-6">
            <dl className="flex-1 min-w-[250px] sm:w-1/4 flex items-center">
                <div>
                    <dt className="text-xl font-medium text-gray-500 dark:text-gray-400">Product:</dt>
                    <dd className="mt-2 flex items-center text-lg font-semibold text-gray-900 dark:text-white">
                        <img className=" w-36 object-cover" src={product.image} alt={product.name}/>
                    </dd>
                    <span className="flex font-bold text-2xl items-center justify-center mt-2">
                                           {product.name}
                    </span>

                </div>
            </dl>

            <dl className="flex-1 min-w-[250px] sm:w-1/4">
                <dt className="text-xl font-medium text-gray-500 dark:text-gray-400">Category:</dt>
                <dd className="mt-2 text-xl font-semibold text-gray-900 dark:text-white">
                    {product.categoryName}
                </dd>
            </dl>

            <dl className="flex-1 min-w-[250px] sm:w-1/4">
                <dt className="text-xl font-medium text-gray-500 dark:text-gray-400">Price:</dt>
                <dd className="mt-2 text-xl font-semibold text-gray-900 dark:text-white">
                    ${product.price.toFixed(2)}
                </dd>
            </dl>

            <dl className="flex-1 min-w-[250px] sm:w-1/4">
                <dt className="text-xl font-medium text-gray-500 dark:text-gray-400">Rating:</dt>
                <dd className="mt-2 text-xl font-semibold text-gray-900 dark:text-white">
                    {product.rating.toFixed(1)} ★
                </dd>
            </dl>

            <dl className="flex-1 min-w-[250px] sm:w-1/4">
                <dt className="text-xl font-medium text-gray-500 dark:text-gray-400">Type:</dt>
                <dd className={`me-2 mt-2 inline-flex items-center rounded px-3 py-1 text-xl font-medium ${product.service ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'}`}>
                    {product.service ? 'Service' : 'Physical'}
                </dd>
            </dl>

            <dl className="flex-1 min-w-[250px] sm:w-1/4">
                <dt className="text-xl font-medium text-gray-500 dark:text-gray-400">Status:</dt>
                <dd className={`me-2 mt-2 inline-flex items-center rounded px-3 py-1 text-xl font-medium ${product.visible ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'}`}>
                    {product.visible ? 'Visible' : 'Hidden'}
                </dd>
            </dl>

            <dl>
                <div className="flex gap-6 w-full sm:w-auto justify-end">
                    {/* Button to view details or manage the product */}
                    <a
                        href={`/product/${product.id}`}
                        className="min-w-[10rem] flex justify-center text-center rounded-lg border border-gray-200 bg-white px-10 py-3 text-xl font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                    >
                        View details
                    </a>
                </div>
            </dl>
        </div>
    );
};

ProductUserCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        shortDescription: PropTypes.string,
        image: PropTypes.string.isRequired,
        categoryName: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        rating: PropTypes.number.isRequired,
        visible: PropTypes.bool.isRequired,
        service: PropTypes.bool,
    }).isRequired,
};

export default ProductUserCard;
