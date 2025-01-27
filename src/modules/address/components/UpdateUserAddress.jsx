import useResponseHandler from "../../../hooks/useResponseHandler.js";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {findUserAddressById, removeUserAddress, updateUserAddress} from "../../../backend/addressService.js";

const UpdateUserAddress = () => {

    // Using response handlers for success and error messages
    const {handleSuccess, handleErrors} = useResponseHandler();

    const {id} = useParams();
    const [address, setAddress] = useState(null);

    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isDefault, setIsDefault] = useState(false);
    const [errors, setErrors] = useState({});

    const hasChanges = address && (
        addressLine1 !== address?.addressLine1 ||
        addressLine2 !== address?.addressLine2 ||
        city !== address?.city ||
        state !== address?.state ||
        postalCode !== address?.postalCode ||
        country !== address?.country ||
        phoneNumber !== address?.phoneNumber ||
        isDefault !== address?.default
    );


    useEffect(() => {
        if (!Number.isNaN(Number(id))) {
            findUserAddressById(id, (address) => {
                if (address) {
                    setAddress(address);
                    setAddressLine1(address.addressLine1 || '');
                    setAddressLine2(address.addressLine2 || '');
                    setCity(address.city || '');
                    setState(address.state || '');
                    setPostalCode(address.postalCode || '');
                    setCountry(address.country || '')
                    setPhoneNumber(address.phoneNumber || '');
                    setIsDefault(address.default || false)

                }
            }, (errors) => handleErrors(errors));
        }
    }, [id]);

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        if (!addressLine1) {
            newErrors.addressLine1 = 'Street address is required.';
            isValid = false;
        }
        if (!city) {
            newErrors.city = 'City is required.';
            isValid = false;
        }
        if (!state) {
            newErrors.state = 'State is required.';
            isValid = false;
        }
        if (!postalCode) {
            newErrors.postalCode = 'Postal code is required.';
            isValid = false;
        }
        if (!country) {
            newErrors.country = 'Country is required.';
            isValid = false;
        }
        if (!/^\d{10}$/.test(phoneNumber)) {
            newErrors.phoneNumber = 'Phone number must be 10 digits.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        if (!hasChanges) {
            handleErrors({globalError: 'No changes detected.'}, '');
            return;
        }

        const formData = {
            addressLine1,
            addressLine2,
            city,
            state,
            postalCode,
            country,
            phoneNumber,
            default: isDefault,
        };

        if (validateForm()) {
            updateUserAddress(
                id,
                formData,
                () => handleSuccess('Updated successfully!', '/users/addresses'),
                (errors) => handleErrors(errors)
            );
        }

    };

    const handleDelete = (e) => {
        e.preventDefault();
        removeUserAddress(
            id,
            () => handleSuccess('Deleted successfully!', '/users/addresses'),
            (errors) => handleErrors(errors)
        );
    };

    return (
        <div className="flex items-center justify-center p-6">
            <div className="mx-auto bg-gray-100 shadow-lg rounded-lg p-8 w-full max-w-lg border">
                <h2 className="text-2xl font-extrabold text-center text-gray-800 mb-6">
                    Update Address
                </h2>

                <form>
                    <div className="mb-5">
                        <label className="block text-base font-medium text-[#07074D]">Street Address</label>
                        <input
                            type="text"
                            name="addressLine1"
                            value={addressLine1}
                            onChange={(e) => setAddressLine1(e.target.value)}
                            className={`w-full rounded-md border bg-white py-3 px-6 text-base font-medium ${errors.addressLine1 ? 'border-red-500' : ''}`}
                            placeholder="Main street address"
                        />
                        {errors.addressLine1 && <p className="text-red-500 text-sm mt-1">{errors.addressLine1}</p>}
                    </div>

                    <div className="mb-5">
                        <label className="block text-base font-medium text-[#07074D]">Additional Address Line</label>
                        <input
                            type="text"
                            name="addressLine2"
                            value={addressLine2}
                            onChange={(e) => setAddressLine2(e.target.value)}
                            className="w-full rounded-md border bg-white py-3 px-6 text-base font-medium"
                            placeholder="Apartment, suite, etc. (optional)"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-5">
                        <div>
                            <label className="block text-base font-medium text-[#07074D]">City</label>
                            <input
                                type="text"
                                name="city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className={`w-full rounded-md border bg-white py-3 px-6 text-base font-medium ${errors.city ? 'border-red-500' : ''}`}
                                placeholder="City"
                            />
                            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                        </div>

                        <div>
                            <label className="block text-base font-medium text-[#07074D]">State</label>
                            <input
                                type="text"
                                name="state"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                className={`w-full rounded-md border bg-white py-3 px-6 text-base font-medium ${errors.state ? 'border-red-500' : ''}`}
                                placeholder="State"
                            />
                            {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-5">
                        <div>
                            <label className="block text-base font-medium text-[#07074D]">Postal Code</label>
                            <input
                                type="text"
                                name="postalCode"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                className={`w-full rounded-md border bg-white py-3 px-6 text-base font-medium ${errors.postalCode ? 'border-red-500' : ''}`}
                                placeholder="Postal Code"
                            />
                            {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
                        </div>

                        <div>
                            <label className="block text-base font-medium text-[#07074D]">Country</label>
                            <input
                                type="text"
                                name="country"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                className={`w-full rounded-md border bg-white py-3 px-6 text-base font-medium ${errors.country ? 'border-red-500' : ''}`}
                                placeholder="Country"
                            />
                            {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
                        </div>
                    </div>

                    <div className="mb-5">
                        <label className="block text-base font-medium text-[#07074D]">Phone Number</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className={`w-full rounded-md border bg-white py-3 px-6 text-base font-medium ${errors.phoneNumber ? 'border-red-500' : ''}`}
                            placeholder="10-digit phone number"
                        />
                        {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
                    </div>

                    <div className="mb-5 items-center">
                        <label className="mb-3 flex justify-center items-center text-base font-medium text-[#07074D]">
                            Set as Default Address?
                        </label>
                        <div className="flex  justify-center items-center gap-4">
                            <button
                                type="button"
                                onClick={() => setIsDefault(true)}
                                className={`py-2 px-6 rounded-md text-base font-semibold transition-all duration-200 
                                ${isDefault === true ? 'bg-yellow-600 text-white' : 'bg-white text-yellow-600 border border-yellow-600 hover:bg-yellow-100'}`}
                            >
                                Yes
                            </button>

                            <button
                                type="button"
                                onClick={() => setIsDefault(false)}
                                className={`py-2 px-6 rounded-md text-base font-semibold transition-all duration-200 
                                ${isDefault === false ? 'bg-yellow-600 text-white' : 'bg-white text-yellow-600 border border-yellow-600 hover:bg-yellow-100'}`}
                            >
                                No
                            </button>
                        </div>
                    </div>

                    {/* Save and Cancel Buttons */}
                    <div className="flex gap-4 mb-5">
                        <button
                            type="button"
                            onClick={() => handleSuccess('', '/users/addresses')}
                            className="w-full rounded-md bg-gray-400 py-3 px-6 text-base font-semibold text-black outline-none hover:bg-gray-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            onClick={(e) => handleUpdate(e)}
                            className={`w-full rounded-md ${!hasChanges ? 'bg-gray-400' : 'bg-yellow-600 hover:bg-yellow-700'}  py-3 px-6 text-base font-semibold text-white outline-none`}
                        >
                            Update Address
                        </button>
                    </div>
                    {/* Delete Button */}
                    <div className="mt-5">
                        <button
                            type="button"
                            onClick={(e) => handleDelete(e)}
                            className="w-full rounded-md bg-red-700 py-3 px-6 text-base font-semibold text-white outline-none hover:bg-red-800"
                        >
                            Delete Address
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default UpdateUserAddress;