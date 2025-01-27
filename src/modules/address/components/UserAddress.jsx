import PropTypes from "prop-types";
import useResponseHandler from "../../../hooks/useResponseHandler.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";

const UserAddress = ({address}) => {

    // Using response handlers for success and error messages
    const {handleSuccess} = useResponseHandler();

    const handleEdit = (event) => {
        event.preventDefault();

        handleSuccess('', `/users/addresses/${address.id}`); // Example of success message
    };

    return (
        <div
            className={`flex-shrink-0 ml-8 relative overflow-hidden rounded-lg max-w-lg group bg-yellow-600`}
            style={{width: '400px', height: '350px'}}
        >


            {/* Información de la dirección */}
            <div className="relative text-white px-8 pb-8 mt-8">
                {/* Nombre de la calle principal */}
                <h3 className="text-xl font-bold uppercase tracking-wide mb-3">{address.addressLine1}</h3>

                {/* Segunda línea de dirección (opcional) */}
                {address.addressLine2 && (
                    <>
                        <h4 className="text-xl font-semibold mt-3">Additional Address Line: {address.addressLine2}</h4>
                    </>
                )}

                {/* Ciudad, Estado y Código Postal */}
                <>
                    <h4 className="text-xl font-semibold mt-4">Location: {`${address.city}, ${address.state} - ${address.postalCode}`}</h4>
                </>

                {/* País */}
                <h4 className="text-xl font-semibold mt-4">Country: {address.country}</h4>

                {/* Número de teléfono */}
                <h4 className="text-xl font-semibold mt-4">Contact: {address.phoneNumber ? `Phone: ${address.phoneNumber}` : 'No phone number specified'}</h4>

                <div className="relative text-white px-8 mt-4">
                    <div className="flex justify-end mb-4">
                        {address.default && (
                            <span
                                className="block bg-white rounded-full ml-4 text-black text-sm font-bold px-4 py-3 leading-none items-center"
                            >
                                Default
                            </span>
                        )}
                    </div>
                </div>

                {/* Botón de edición en la esquina superior derecha con más margen */}
                <button
                    className="mb-8 w-full p-4 px-6 bg-gray-500 text-2xl text-white rounded-md flex items-center justify-center transition duration-300 ease-in-out hover:bg-yellow-900 hover:scale-105 z-10"
                    onClick={handleEdit}
                >
                    <FontAwesomeIcon icon={faPenToSquare} className="mr-3"/>
                    Modify
                </button>

            </div>
        </div>
    );
};

UserAddress.propTypes = {
    address: PropTypes.shape({
        id: PropTypes.number.isRequired,
        addressLine1: PropTypes.string.isRequired,
        addressLine2: PropTypes.string,
        city: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
        postalCode: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired,
        phoneNumber: PropTypes.string.isRequired,
        default: PropTypes.bool.isRequired,
    }).isRequired
};

export default UserAddress;
