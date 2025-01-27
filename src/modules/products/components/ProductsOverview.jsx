import PropTypes from "prop-types";
import {useProductStore} from "../../../store/useProductStore.js";
import {ProductCard} from "../index.js";
import {Pager} from "../../common/index.js";

const ProductsOverview = ({products}) => {
    const {
        totalItems,
    } = useProductStore(state => ({
        totalItems: state.getTotalItems(),
    }));

    return (
        <div className="p-8">

            <div className="p-5 grid grid-cols-3 gap-6 items-center justify-center">
                {products.map((product, index) => (
                    <div className="transform transition duration-500 hover:scale-105">
                        <ProductCard key={index} product={product}/>
                    </div>
                ))}
            </div>
            <Pager totalItems={totalItems}/>
        </div>
    );
};

ProductsOverview.propTypes = {
    products: PropTypes.array
};

export default ProductsOverview;
