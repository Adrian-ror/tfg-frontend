import PropTypes from 'prop-types';
import DeliveryOption from "./DeliveryOption.jsx";

const DeliveryOptions = ({shippingMethods, selectedDelivery, setSelectedDelivery}) => {
    return (

        <div>
            <h3 className="text-2xl font-manrope font-extrabold mb-4 text-gray-900 dark:text-white">Delivery
                Methods
            </h3>
            <div className="flex flex-col md:flex-row gap-4">
                {shippingMethods.map((method) => (
                    <DeliveryOption
                        key={method.id}
                        id={method.name}
                        label={method.name}
                        description={method.shippingCost + ' - ' + method.description}
                        value={method}
                        checked={selectedDelivery?.id === method.id}
                        onChange={() => setSelectedDelivery(method)}
                    />
                ))}
            </div>
        </div>
    );
};

DeliveryOptions.propTypes = {
    shippingMethods: PropTypes.array,
    selectedDelivery: PropTypes.object,
    setSelectedDelivery: PropTypes.func.isRequired,
};

export default DeliveryOptions;
