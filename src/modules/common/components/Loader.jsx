import { Spinner } from "@material-tailwind/react";
import PropTypes from "prop-types";

const Loader = ({ size = "h-16 w-16", color = "text-gray-900/50", message = "Loading..." }) => {
    return (
        <div className="flex flex-col h-screen text-center items-center justify-center space-y-2">

            {/* Spinner component */}
            <Spinner className={`${size} ${color}`} />

            {/* Optional loading message */}
            <span className="text-gray-700 text-lg font-semibold">{message}</span>

        </div>
    );
}


// Prop type validation
Loader.propTypes = {
    size: PropTypes.string,
    color: PropTypes.string,
    message: PropTypes.string
};

export default Loader;
