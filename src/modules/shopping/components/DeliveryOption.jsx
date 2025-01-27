import PropTypes from 'prop-types';

const DeliveryOption = ({id, label, description, value, checked, onChange}) => {
    return (
        <div
            className="rounded-lg border border-gray-200 bg-gray-50 p-6 ps-6 dark:border-gray-700 dark:bg-gray-800 flex-1"
        >
            <div className="flex items-start">
                <div className="flex h-6 items-center">
                    <input
                        id={id}
                        aria-describedby={`${id}-text`}
                        type="radio"
                        name="delivery-method"
                        value={value}
                        checked={checked}
                        onChange={onChange}
                        className="h-6 w-6 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                    />
                </div>
                <div className="ms-4 text-lg">
                    <label
                        htmlFor={id}
                        className="font-semibold leading-none text-gray-900 dark:text-white whitespace-nowrap"
                    >
                        {label}
                    </label>
                    <p
                        id={`${id}-text`}
                        className="mt-4 text-base font-normal text-gray-500 dark:text-gray-400"
                    >
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
};

DeliveryOption.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    value: PropTypes.object.isRequired,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default DeliveryOption;
