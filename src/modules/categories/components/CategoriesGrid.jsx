import PropTypes from "prop-types";
import CategoryCard from "./CategoryCard.jsx";

const CategoriesGrid = ({categories}) => {
    return (
        <div className=" flex flex-wrap justify-center gap-4 p-6">
            {categories.map((category) => (
                <div key={category.id} className="w-1/4"> {/* Ajusta el ancho para 4 tarjetas por fila */}
                    <CategoryCard
                        category={category}
                    />
                </div>
            ))}
        </div>
    );
};

CategoriesGrid.propTypes = {
    categories: PropTypes.array.isRequired,
};

export default CategoriesGrid;
