import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPhone} from '@fortawesome/free-solid-svg-icons';
import PropTypes from "prop-types";

const CheckoutForm = ({formData}) => {
    return (
        <div className="space-y-4">
            <h2 className="text-lg font-manrope font-extrabold mb-4 text-gray-900 dark:text-white">
                Delivery Details
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                    <label
                        htmlFor="addressLine1"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Address Line 1 *
                    </label>
                    <input
                        type="text"
                        id="addressLine1"
                        value={formData.addressLine1}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-blue-500 dark:focus:ring-blue-500 transition-all duration-300 ease-in-out"
                        placeholder="Street Address"
                        disabled
                        aria-label="Address line 1"
                    />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Your street address.
                    </p>
                </div>

                <div>
                    <label
                        htmlFor="addressLine2"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Address Line 2 (Optional)
                    </label>
                    <input
                        type="text"
                        id="addressLine2"
                        value={formData.addressLine2}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-blue-500 dark:focus:ring-blue-500 transition-all duration-300 ease-in-out"
                        placeholder="Apartment, suite, etc."
                        disabled
                    />
                </div>

                <div>
                    <label
                        htmlFor="city"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                        City *
                    </label>
                    <input
                        type="text"
                        id="city"
                        value={formData.city}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-blue-500 dark:focus:ring-blue-500 transition-all duration-300 ease-in-out"
                        placeholder="City"
                        disabled
                    />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Your city.
                    </p>
                </div>

                <div>
                    <label
                        htmlFor="state"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                        State/Province *
                    </label>
                    <input
                        type="text"
                        id="state"
                        value={formData.state}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-blue-500 dark:focus:ring-blue-500 transition-all duration-300 ease-in-out"
                        placeholder="State/Province"
                        disabled
                    />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Your state or province.
                    </p>
                </div>

                <div>
                    <label
                        htmlFor="postalCode"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Postal Code *
                    </label>
                    <input
                        type="text"
                        id="postalCode"
                        value={formData.postalCode}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-blue-500 dark:focus:ring-blue-500 transition-all duration-300 ease-in-out"
                        placeholder="12345"
                        disabled
                        aria-label="Postal Code"
                    />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Your postal code.
                    </p>
                </div>

                <div>
                    <label
                        htmlFor="country"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Country *
                    </label>
                    <input
                        type="text"
                        id="country"
                        value={formData.country}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-blue-500 dark:focus:ring-blue-500 transition-all duration-300 ease-in-out"
                        placeholder="Country"
                        disabled
                    />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Your country.
                    </p>
                </div>

                <div>
                    <div className="mb-2 flex items-center gap-2">
                        <label htmlFor="phone"
                               className="block text-sm font-medium text-gray-900 dark:text-white">
                            Phone Number *
                        </label>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                            <FontAwesomeIcon icon={faPhone}/>
                        </div>
                        <input
                            type="text"
                            id="phone"
                            value={formData.phoneNumber}
                            aria-describedby="helper-text-explanation"
                            className="bg-gray-50 border border-gray-300 text-gray-900 p-3 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                            placeholder="123-456-7890"
                            disabled
                        />
                    </div>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Your phone number.
                    </p>
                </div>
            </div>
        </div>
    );
};

CheckoutForm.propTypes = {
    formData: PropTypes.shape({
        addressLine1: PropTypes.string.isRequired,
        addressLine2: PropTypes.string,
        city: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
        postalCode: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired,
        phoneNumber: PropTypes.string.isRequired,
    }).isRequired,
};

export default CheckoutForm;
