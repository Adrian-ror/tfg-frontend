import {useUsersStore} from "../../../store/useUsersStore.js";
import {Disclosure} from '@headlessui/react';
import {MailBoxLink, NavigationLinks, ProfileDropDown, SearchBar, ShoppingCartLink} from "../../common/index.js";
import {useCategoryStore} from "../../../store/useCategoryStore.js";
import {useEffect} from "react";

const Header = () => {
    const {user, isShopper} = useUsersStore((state) => ({
        user: state.getUser(),
        isShopper: state.isShopper(),
    }));

    const {findCategories} = useCategoryStore((state) => ({
        findCategories: state.findCategories,
    }));

    // Fetch categories when the component mounts
    useEffect(() => {
        findCategories();
    }, []);

    return (
        <Disclosure as="nav" className="bg-gray-500">
            {() => (
                <div className="mx-auto">
                    <div className="flex items-center justify-between h-24">

                        {/* Left Section: Navigation Links */}
                        <div className="flex ml-8 mr-5 items-center space-x-8">
                            <NavigationLinks/>
                        </div>

                        {/* Center Section: Search Bar */}
                        <div className="flex-grow mx-4">
                            <SearchBar/>
                        </div>

                        {/* Right Section: User Actions */}
                        <div className="flex items-center ml-4 mr-5">
                            {user && <MailBoxLink/>}
                            {user && isShopper ? <ShoppingCartLink/> : null}
                            <ProfileDropDown/>
                        </div>
                    </div>
                </div>
            )}
        </Disclosure>
    );
};

export default Header;
