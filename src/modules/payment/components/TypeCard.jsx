import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const TypeCard = ({iconColor, label, name, icon, onClick}) => {

    return (
        <div
            className="flex-shrink-0 bg-gray-50 shadow-lg rounded-lg border-2 border-gray-300
                   transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer" // Ajusta el tamaño del contenedor
            onClick={onClick} // Llama a onClick si no es PayPal
        >
            <div className="w-full h-full flex items-center justify-center">
                <FontAwesomeIcon icon={icon} className="w-16 h-16" style={{color: iconColor}}/>
            </div>
            <div className="px-2 pb-1 mt-2 text-center"> {/* Ajusta el espaciado aquí */}
                <span className="block text-gray-800 font-bold text-lg">{label}</span>
                <span className="block mt-1 text-gray-700 font-semibold text-sm">{name}</span>
            </div>
        </div>
    );
};

TypeCard.propTypes = {
    iconColor: PropTypes.string,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    onClick: PropTypes.func.isRequired
};

export default TypeCard;
