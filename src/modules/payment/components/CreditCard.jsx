import PropTypes from "prop-types";
import useResponseHandler from "../../../hooks/useResponseHandler.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCreditCard, faPenToSquare} from "@fortawesome/free-solid-svg-icons";

const CreditCard = ({card}) => {
    console.log(card);
    const {id, last4, byDefault} = card;

    // Using response handlers for success and error messages
    const {handleSuccess} = useResponseHandler();

    const handleEdit = (event) => {
        event.preventDefault();
        handleSuccess('', `/users/updateCard/${id}`);
    };

    return (
        <div
            className={`flex-shrink-0 ml-8 mt-4 relative overflow-hidden rounded-lg max-w-lg group bg-yellow-600`}
            style={{width: '500px', height: '300px'}} // Aumentamos el tamaño del contenedor
        >
            {/* Botón de edición en la esquina superior derecha con más margen */}
            <button
                className="absolute top-0 right-0 m-4 p-4 px-6 bg-gray-500 text-white rounded-md flex items-center justify-center transition duration-300 ease-in-out hover:bg-yellow-900 hover:scale-105 z-10" // Aumentamos el padding y el margen
                onClick={handleEdit}
            >
                <FontAwesomeIcon icon={faPenToSquare} className="mr-3"/>
                Modify
            </button>

            {/* Decoración SVG */}
            <svg
                className="absolute bottom-0 left-0 mb-10 scale-150 group-hover:scale-[1.75] transition-transform"
                viewBox="0 0 450 283"
                fill="none"
                style={{opacity: 0.1}}
            >
                <rect
                    x="200"
                    y="150"
                    width="180"
                    height="180"
                    rx="8"
                    transform="rotate(-45 200 150)"
                    fill="white"
                />
                <rect
                    x="-30"
                    y="120"
                    width="180"
                    height="180"
                    rx="8"
                    transform="rotate(-45 -30 120)"
                    fill="white"
                />
            </svg>

            {/* Imagen de la tarjeta con más margen superior */}
            <div
                className="relative pt-20 px-12 flex items-center justify-center group-hover:scale-110 transition-transform"
            >
                <FontAwesomeIcon icon={faCreditCard} className="w-24 h-24"
                                 style={{color: '#fbc900'}}/> {/* Aumentamos el tamaño del ícono */}
            </div>

            {/* Información de la tarjeta */}
            <div className="relative text-white px-8 pb-8 mt-8"> {/* Aumentamos el padding */}
                <span
                    className="block opacity-75 font-bold text-xl -mb-2">CARD</span> {/* Aumentamos el tamaño del texto */}
                <div className="flex justify-between mb-6"> {/* Aumentamos el margen entre elementos */}
                    <span
                        className="block font-semibold text-2xl">{`**** **** **** ${last4}`}</span> {/* Aumentamos el tamaño del texto */}
                    {byDefault && (
                        <span
                            className="block bg-white rounded-full ml-4 text-black text-sm font-bold px-4 py-3 leading-none items-center"
                        >
                            Default
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

CreditCard.propTypes = {
    card: PropTypes.shape({
        id: PropTypes.number.isRequired,
        last4: PropTypes.string.isRequired,
        byDefault: PropTypes.bool,
    }).isRequired
};

export default CreditCard;
