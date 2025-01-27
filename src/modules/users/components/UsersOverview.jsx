import {useEffect, useState} from "react";
import {Loader} from "../../common/index.js";
import PropTypes from "prop-types";
import {useUsersStore} from "../../../store/useUsersStore.js";
import UserCard from "./UserCard.jsx";
import useResponseHandler from "../../../hooks/useResponseHandler.js";
import {UsersNotFound} from "../index.js";

const UsersOverview = () => {
    const {state_users, findAllUsers, findActiveUsers, findBannedUsers} = useUsersStore(state => ({
        state_users: state.getUsers(),
        findAllUsers: state.findAllUsers,
        findActiveUsers: state.findAllActiveUsers,
        findBannedUsers: state.findAllBannedUsers,
    }));

    const {handleErrors} = useResponseHandler();

    const [isLoading, setIsLoading] = useState(true);

    const [filter, setFilter] = useState("ALL");

    // Función para obtener los usuarios basados en el filtro
    const fetchUsers = () => {
        setIsLoading(true);

        if (filter === "ACTIVE") {
            findActiveUsers(
                () => setIsLoading(false),
                (error) => {
                    handleErrors(error);
                    setIsLoading(false);
                }
            );
        } else if (filter === "BANNED") {
            findBannedUsers(
                () => setIsLoading(false),
                (error) => {
                    handleErrors(error);
                    setIsLoading(false);
                }
            );
        } else {
            findAllUsers(
                () => setIsLoading(false),
                (error) => {
                    handleErrors(error);
                    setIsLoading(false);
                }
            );
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [filter]);

    if (isLoading) {
        return <Loader/>;
    }

    return (
        <div className="p-10"> {/* Aumentar padding general */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center space-x-6">
                    <label
                        className={`cursor-pointer ${filter === "ALL" ? 'bg-blue-800 text-white' : 'bg-gray-600 text-gray-300'} px-8 py-3 rounded-full hover:bg-blue-700`}>
                        <input
                            type="radio"
                            name="userFilter"
                            value="ALL"
                            checked={filter === "ALL"}
                            onChange={() => setFilter("ALL")}
                            className="hidden"
                        />
                        All Users
                    </label>

                    <label
                        className={`cursor-pointer ${filter === "ACTIVE" ? 'bg-green-800 text-white' : 'bg-gray-600 text-gray-300'} px-8 py-3 rounded-full hover:bg-green-700`}>
                        <input
                            type="radio"
                            name="userFilter"
                            value="ACTIVE"
                            checked={filter === "ACTIVE"}
                            onChange={() => setFilter("ACTIVE")}
                            className="hidden"
                        />
                        Active Users
                    </label>

                    <label
                        className={`cursor-pointer ${filter === "BANNED" ? 'bg-red-800 text-white' : 'bg-gray-600 text-gray-300'} px-8 py-3 rounded-full hover:bg-red-700`}>
                        <input
                            type="radio"
                            name="userFilter"
                            value="BANNED"
                            checked={filter === "BANNED"}
                            onChange={() => setFilter("BANNED")}
                            className="hidden"
                        />
                        Banned Users
                    </label>
                </div>
            </div>

            <h2 className="text-4xl font-extrabold text-center mt-10 mb-10">
                <span className="px-8 py-4 rounded-lg bg-gray-50 shadow-lg border-2 border-gray-300">
                    Available Users
                </span>
            </h2>

            <p className="text-center text-lg font-bold italic text-gray-600 mb-8">
                Manage users, ban or unban users as needed.
            </p>

            {!state_users || state_users.length === 0 ? (
                <UsersNotFound/>
            ) : (
                <div className="flex flex-wrap justify-center gap-8">
                    {state_users.map(user => (
                        <div key={user.id} className="w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6">
                            <UserCard user={user}/>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

UsersOverview.propTypes = {
    users: PropTypes.array,
};

export default UsersOverview;
