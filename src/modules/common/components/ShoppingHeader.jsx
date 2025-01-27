import PropTypes from 'prop-types';

const ShoppingHeader = ({isCartCompleted, isCheckoutCompleted, isOrderSummaryCompleted}) => {
    const steps = [
        {label: 'Cart', isCompleted: isCartCompleted},
        {label: 'Checkout', isCompleted: isCheckoutCompleted},
        {label: 'Order summary', isCompleted: isOrderSummaryCompleted},
    ];

    return (
        <ol className="items-center flex w-full max-w-2xl text-center text-3xl font-medium text-gray-500 dark:text-gray-400">
            {steps.map((step, index) => (
                <li
                    key={index}
                    className={`w-full flex items-center ${index < steps.length - 1 ? 'after:border-1 after:mx-6 after:w-24 after:border-b after:border-gray-200 dark:after:border-gray-700' : ''}`}
                >
                    <span
                        className={`flex items-center whitespace-nowrap ${step.isCompleted ? 'text-yellow-500 dark:text-primary-500' : ''}`}>
                        <svg
                            className="me-2 h-4 w-4 sm:h-5 sm:w-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                        </svg>
                        {step.label}
                    </span>
                </li>
            ))}
        </ol>
    );
};

ShoppingHeader.propTypes = {
    isCartCompleted: PropTypes.bool.isRequired,
    isCheckoutCompleted: PropTypes.bool.isRequired,
    isOrderSummaryCompleted: PropTypes.bool.isRequired,
};

export default ShoppingHeader;
