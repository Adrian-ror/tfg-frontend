import PropTypes from 'prop-types';
import PaymentOption from "./PaymentOption.jsx";

const PaymentOptions = ({selectedPayment, setSelectedPayment, methods}) => {
    return (
        <div className="space-y-4">
            <h3 className="text-2xl font-manrope font-extrabold mb-4 text-gray-900 dark:text-white">Payment</h3>
            <div className="flex flex-col md:flex-row gap-4">
                {methods.map((method) => (
                    <PaymentOption
                        key={method.id}
                        id={method.id}
                        label={`**** **** **** ${method.last4}`}
                        description={'Pay with your card'}
                        checked={selectedPayment === method.id}
                        onChange={() => setSelectedPayment(method.id)}
                    />
                ))}
            </div>
        </div>
    );
};

// Definición de propTypes
PaymentOptions.propTypes = {
    selectedPayment: PropTypes.number, // Cambiado a string para que coincida con el id del método
    setSelectedPayment: PropTypes.func.isRequired,
    methods: PropTypes.array.isRequired,
};

export default PaymentOptions;
