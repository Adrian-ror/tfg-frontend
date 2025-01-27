import {Menu, Transition} from "@headlessui/react";
import {Fragment, useEffect, useRef} from "react";
import {useUsersStore} from "../../../store/useUsersStore.js";

const ProfileDropDown = () => {

    //State functions
    const isShopper = useUsersStore(state => state.isShopper());
    const isAdmin = useUsersStore(state => state.isAdmin());
    const {user} = useUsersStore(state => ({
        user: state.getUser()
    }));
    // Helper function to render menu items with active state
    const renderMenuItem = (href, label, active) => (
        <a
            href={href}
            className={`block px-4 py-2 text-lg font-bold text-gray-700 ${active ? 'bg-gray-100' : ''}`}
        >
            {label}
        </a>
    );

    // Track the previous value of user to detect logout
    const prevUserRef = useRef();

    useEffect(() => {
        // Update the previous value of user
        prevUserRef.current = user;
    }, [user]);

    return (

        // Profile dropdown
        <Menu as="div" className=" ml-6 mr-8">
            <div>

                {/* Button to open the user menu */}
                <Menu.Button
                    className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5"/>
                    <span className="sr-only">Open user menu</span>
                    <img
                        className="h-14 w-14 rounded-full"
                        // Display user image or default avatar
                        src={user?.image ? `data:image/jpg;base64,${user.image}` : '/user-not-found.png'}
                        alt="User Profile"
                    />
                </Menu.Button>

            </div>

            {/* Transition for dropdown menu */}
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >

                {/* Dropdown menu items */}
                <Menu.Items
                    className="absolute right-0 z-10 mt-3 w-56 h-12 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">

                    {user ? (

                        <div>

                            {/* Menu items for authenticated users */}

                            <Menu.Item>
                                {({active}) => renderMenuItem("/users/update-profile", "Your Profile", active)}
                            </Menu.Item>
                            <Menu.Item>
                                {({active}) => renderMenuItem("/users/change-password", "Change Password", active)}
                            </Menu.Item>


                            {isShopper ? (

                                    <div>

                                        <Menu.Item>
                                            {({active}) => renderMenuItem("/shopping/orders", "Orders", active)}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({active}) => renderMenuItem("/users/cards", "Cards", active)}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({active}) => renderMenuItem("/users/addresses", "Addresses", active)}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({active}) => renderMenuItem("/users/wishList", "Wish List", active)}
                                        </Menu.Item>

                                    </div>

                                ) :
                                null
                            }

                            {!isShopper && !isAdmin ? (
                                    <div>
                                        <Menu.Item>
                                            {({active}) => renderMenuItem("/users/post-products", "Publish Product", active)}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({active}) => renderMenuItem("/users/products", "My Products", active)}
                                        </Menu.Item>
                                    </div>
                                ) :
                                null
                            }

                            {isAdmin ? (

                                    <div>
                                        <Menu.Item>
                                            {({active}) => renderMenuItem("/categories", "Manage categories", active)}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({active}) => renderMenuItem("/users", "Manage users", active)}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({active}) => renderMenuItem("/orders", "Manage orders", active)}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({active}) => renderMenuItem("/reports", "Manage reports", active)}
                                        </Menu.Item>
                                    </div>
                                ) :
                                null
                            }


                            <Menu.Item>
                                {({active}) => renderMenuItem("/users/logout", "Sign out", active)}
                            </Menu.Item>


                        </div>

                    ) : (

                        // Menu item for unauthenticated users
                        <Menu.Item>
                            {({active}) => renderMenuItem("/users/login", "Sign In", active)}
                        </Menu.Item>

                    )}
                </Menu.Items>
            </Transition>
        </Menu>
    );
};


export default ProfileDropDown;
