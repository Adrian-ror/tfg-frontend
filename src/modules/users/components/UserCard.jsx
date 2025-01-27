import PropTypes from 'prop-types';
import useResponseHandler from "../../../hooks/useResponseHandler.js";
import {useUsersStore} from "../../../store/useUsersStore.js";

const UserCard = ({user}) => {
    const {handleSuccess, handleErrors} = useResponseHandler();
    const {banUser, unbanUser} = useUsersStore();

    const handleBanToggle = (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (user.status === "ACTIVE") {
            banUser(user.id, () => handleSuccess('Banned!', location.pathname), handleErrors);
        } else {
            unbanUser(user.id, () => handleSuccess('UnBanned!', location.pathname), handleErrors);
        }
    };


    return (
        <div
            className="flex-shrink-0 bg-gray-50 shadow-lg rounded-lg border-2 border-gray-300 transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer w-full flex flex-col items-center justify-between p-4">
            <span className="block text-gray-800 font-extrabold underline text-xl mt-2">
                {user.userName}
            </span>
            <div className="flex mb-2 mt-2">
                <div className="mr-5 text-gray-700">
                    <strong>First Name:</strong> {user.firstName}
                </div>
                <div className="text-gray-700">
                    <strong>Last Name:</strong> {user.lastName}
                </div>
            </div>
            <div className="text-gray-700 mb-2">
                <strong>Email:</strong> {user.email}
            </div>
            <div className="text-gray-700 mb-2">
                <strong>Phone:</strong> {user.phoneNumber}
            </div>
            <div className="flex mb-2">
                <div className="text-gray-700 mb-2 mr-5">
                    <strong>Role:</strong> {user.role}
                </div>
                <div className="text-gray-700 mb-2">
                    <strong>Status:</strong> {user.status}
                </div>
            </div>
            <button
                className={`w-full px-4 py-2 rounded ${user.status !== "ACTIVE" ? 'bg-green-600 hover:bg-green-800' : 'bg-red-700 hover:bg-red-800'} text-white hover:bg-opacity-80`}
                onClick={(e) => handleBanToggle(e)}
            >
                {user.status === "ACTIVE" ? 'Ban' : 'UnBan'} User
            </button>
        </div>
    );
};

UserCard.propTypes = {
    user: PropTypes.object.isRequired
};

export default UserCard;
