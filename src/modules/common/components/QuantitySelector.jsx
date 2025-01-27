import PropTypes from "prop-types";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const QuantitySelector = ({quantity, handleIncrement, handleDecrement}) => (
    <div className="flex items-center justify-center w-full">
        <button
            onClick={handleDecrement}
            disabled={quantity <= 0}
            className="px-4 py-2 border border-gray-200 rounded-l-full hover:bg-gray-50"
        >
            <FontAwesomeIcon icon={faMinus} className="h-6"/>
        </button>
        <input
            type="text"
            className="w-16 text-xl text-center border-y border-gray-200 bg-transparent"
            value={quantity}
            readOnly
        />
        <button
            onClick={handleIncrement}
            className="px-4 py-2 border border-gray-200 rounded-r-full hover:bg-gray-50"
        >
            <FontAwesomeIcon icon={faPlus} className="h-6"/>
        </button>
    </div>
);

QuantitySelector.propTypes = {
    quantity: PropTypes.number.isRequired,
    handleIncrement: PropTypes.func.isRequired,
    handleDecrement: PropTypes.func.isRequired,
};

export default QuantitySelector;
