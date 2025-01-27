import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComments} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

const MailBoxLink = () => (

    <Link
        to="/messages" //
        className="relative rounded-full mr-8 bg-gray-500 p-1 focus:outline-none"
        aria-label="View messages" // Accessible alternative texte
    >

        {/* Span for focus effect */}
        <span className="absolute -inset-1.5"/>

        {/* Use the envelope icon */}
        <FontAwesomeIcon icon={faComments} className="h-10" aria-hidden="true"/>

    </Link>
);

export default MailBoxLink;
