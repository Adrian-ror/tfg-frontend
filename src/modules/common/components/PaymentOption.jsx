import PropTypes from 'prop-types';

const PaymentOption = ({id, label, description, checked, onChange}) => {
    return (
        <div
            className="rounded-lg border border-gray-200 bg-gray-50 p-2 ps-3 dark:border-gray-700 dark:bg-gray-800 flex-1">
            <div className="flex items-start">
                <div className="flex h-4 items-center">
                    <input
                        id={id}
                        aria-describedby={`${id}-text`}
                        type="radio"
                        name="payment-method"
                        value=""
                        className="h-3 w-3 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                        checked={checked}
                        onChange={onChange}
                    />
                </div>

                <div className="ms-2 text-xs">
                    <label htmlFor={id} className="font-medium leading-none text-gray-900 dark:text-white">
                        {label}
                    </label>
                    <p id={`${id}-text`}
                       className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400 whitespace-nowrap">
                        {description}
                    </p>
                </div>
            </div>

            <div className="mt-2 flex items-center gap-1">
                <button type="button"
                        className="text-xs font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                    Delete
                </button>

                {/* Borde de separación */}
                <div className="h-4 border-l border-gray-700 bg-gray-800 dark:bg-gray-700"></div>

                <button type="button"
                        className="text-xs font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                    Edit
                </button>
            </div>
        </div>
    );
};

// Definición de propTypes
PaymentOption.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default PaymentOption;
