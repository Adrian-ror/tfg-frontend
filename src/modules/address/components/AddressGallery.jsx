import {useEffect, useState} from "react";
import {useUsersStore} from "../../../store/useUsersStore";
import useResponseHandler from "../../../hooks/useResponseHandler";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {Loader} from "../../common";
import NoUserAddresses from "./NoUserAddresses.jsx";
import {findUserAddresses} from "../../../backend/addressService.js";
import UserAddress from "./UserAddress.jsx";

const AddressGallery = () => {

    const {handleSuccess, handleErrors} = useResponseHandler();
    const [isLoading, setIsLoading] = useState(true);
    const [addresses, setAddresses] = useState(true);

    const user = useUsersStore(state => state.user);

    useEffect(() => {
        if (user?.id) {
            setIsLoading(true);
            const timer = setTimeout(() => setIsLoading(false), 1000);

            findUserAddresses((userAddresses) => setAddresses(userAddresses),
                (errors) => handleErrors(errors));

            return () => clearTimeout(timer);
        }
    }, []);

    const handleAddAddress = (event) => {
        event.preventDefault();
        handleSuccess("", "/users/addresses/new");
    };

    if (isLoading) {
        return <Loader/>;
    }

    return (
        <div className="p-6 h-screen flex flex-col items-center justify-center">
            <div className="flex flex-wrap items-center justify-center">
                {addresses && addresses.length > 0 ? (
                    addresses.map((address, index) => (
                        <UserAddress key={index} address={address}/>
                    ))
                ) : (
                    <NoUserAddresses/>
                )}
            </div>

            {addresses.length < 3 && (
                <div className="p-10 flex items-center justify-center">
                    <button
                        className="flex items-center p-3 bg-teal-100 border border-gray-300 hover:bg-green-200 text-gray-800 font-bold px-4 rounded-lg transition duration-300 ease-in-out shadow-md transform hover:scale-105"
                        onClick={handleAddAddress}
                        aria-label="Add Address"
                    >
                        <FontAwesomeIcon icon={faPlus} className="mr-3"/>
                        Add Address
                    </button>
                </div>
            )
            }
        </div>
    );
};

export default AddressGallery;
