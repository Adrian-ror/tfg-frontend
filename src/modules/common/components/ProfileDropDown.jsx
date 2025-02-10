import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useUsersStore } from "../../../store/useUsersStore.js";

const ProfileDropDown = () => {
    const isShopper = useUsersStore((state) => state.isShopper());
    const isAdmin = useUsersStore((state) => state.isAdmin());
    const { user } = useUsersStore((state) => ({ user: state.getUser() }));

    const renderMenuItem = (to, label, active) => (
        <Link
            to={to}
            className={`block px-4 py-2 text-lg font-bold text-gray-700 ${active ? "bg-gray-100" : ""}`}
        >
            {label}
        </Link>
    );

    const prevUserRef = useRef();
    useEffect(() => {
        prevUserRef.current = user;
    }, [user]);

    return (
        <Menu as="div" className="ml-6 mr-8">
            <div>
                <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img
                        className="h-14 w-14 rounded-full"
                        src={user?.image ? `data:image/jpg;base64,${user.image}` : "/user-not-found.png"}
                        alt="User Profile"
                    />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 mt-3 w-56 h-12 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {user ? (
                        <div>
                            <Menu.Item>{({ active }) => renderMenuItem("/users/update-profile", "Your Profile", active)}</Menu.Item>
                            <Menu.Item>{({ active }) => renderMenuItem("/users/change-password", "Change Password", active)}</Menu.Item>
                            {isShopper && (
                                <>
                                    <Menu.Item>{({ active }) => renderMenuItem("/shopping/orders", "Orders", active)}</Menu.Item>
                                    <Menu.Item>{({ active }) => renderMenuItem("/users/cards", "Cards", active)}</Menu.Item>
                                    <Menu.Item>{({ active }) => renderMenuItem("/users/addresses", "Addresses", active)}</Menu.Item>
                                    <Menu.Item>{({ active }) => renderMenuItem("/users/wishList", "Wish List", active)}</Menu.Item>
                                </>
                            )}
                            {!isShopper && !isAdmin && (
                                <>
                                    <Menu.Item>{({ active }) => renderMenuItem("/users/post-products", "Publish Product", active)}</Menu.Item>
                                    <Menu.Item>{({ active }) => renderMenuItem("/users/products", "My Products", active)}</Menu.Item>
                                </>
                            )}
                            {isAdmin && (
                                <>
                                    <Menu.Item>{({ active }) => renderMenuItem("/categories", "Manage categories", active)}</Menu.Item>
                                    <Menu.Item>{({ active }) => renderMenuItem("/users", "Manage users", active)}</Menu.Item>
                                    <Menu.Item>{({ active }) => renderMenuItem("/orders", "Manage orders", active)}</Menu.Item>
                                    <Menu.Item>{({ active }) => renderMenuItem("/reports", "Manage reports", active)}</Menu.Item>
                                </>
                            )}
                            <Menu.Item>{({ active }) => renderMenuItem("/users/logout", "Sign out", active)}</Menu.Item>
                        </div>
                    ) : (
                        <Menu.Item>{({ active }) => renderMenuItem("/users/login", "Sign In", active)}</Menu.Item>
                    )}
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default ProfileDropDown;