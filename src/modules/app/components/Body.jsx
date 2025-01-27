import {Route, Routes} from 'react-router-dom';
import Home from './Home';
import {ChangePassword, Login, Logout, SignUp, UpdateProfile, UsersOverview, WishList} from '../../users';

import {CardGallery, CreditCardForm, UpdateCard} from '../../payment';

import {useUsersStore} from "../../../store/useUsersStore.js";
import {Checkout, OrderDetails, Orders, Reviews, ShoppingCart} from "../../shopping";

import {PostProduct, ProductDetails} from "../../products";

import {AboutUs, ContactUs, CreateReportForm, PrivacyPolicy} from "../../common/index.js";
import CategoriesOverview from "../../categories/components/CategoriesOverview.jsx";
import CategoryDetails from "../../categories/components/CategoryDetails.jsx";
import CategoryForm from "../../categories/components/CategoryForm.jsx";
import SubCategoryForm from "../../categories/components/SubCategoryForm.jsx";
import ProductsUser from "../../products/components/ProductsUser.jsx";
import UpdateProduct from "../../products/components/UpdateProduct.jsx";
import {Chat} from "../../chat/index.js";
import AddressGallery from "../../address/components/AddressGallery.jsx";
import UserAddressForm from "../../address/components/UserAddressForm.jsx";
import UpdateUserAddress from "../../address/components/UpdateUserAddress.jsx";
import {AllOrders} from "../../orders/index.js";
import {ReviewForm} from "../../shopping/index.js";
import Reports from "../../common/components/Reports.jsx";

const Body = () => {

    const user = useUsersStore(state => state.getUser());

    const loggedIn = user !== null;

    return (

        <div className="container mx-auto flex-grow mb-16">

            <Routes>
                {/* Public Routes */}
                <Route path="/*" element={<Home/>}/>
                <Route path="/about-us" element={<AboutUs/>}/>
                <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
                <Route path="/contact-us" element={<ContactUs/>}/>
                {!loggedIn && <Route path="/users/login" element={<Login/>}/>}
                {!loggedIn && <Route path="/users/signup" element={<SignUp/>}/>}

                {/* Product Routes */}
                <Route path="/product/:id" element={<ProductDetails/>}/>

                {/* Shopping Routes */}
                {loggedIn && <Route path="/shopping/shopping-cart" element={<ShoppingCart/>}/>}
                {loggedIn && <Route path="/shopping/checkout" element={<Checkout/>}/>}
                {loggedIn && <Route path="/products/:productId/review" element={<ReviewForm/>}/>}
                {loggedIn && <Route path="/products/:productId/reviews" element={<Reviews/>}/>}
                {loggedIn && <Route path="/products/:productId/reviews" element={<Reviews/>}/>}
                {loggedIn && <Route path="/reports/" element={<Reports/>}/>}
                {loggedIn && <Route path="/reports/product/:productId" element={<CreateReportForm/>}/>}
                {loggedIn && <Route path="/reports/user/:userId" element={<CreateReportForm/>}/>}


                {loggedIn && <Route path="/shopping/orders" element={<Orders/>}/>}
                {loggedIn && <Route path="/orders" element={<AllOrders/>}/>}

                {loggedIn && <Route path="/shopping/orders/:id" element={<OrderDetails/>}/>}

                {/* User Profile Routes */}
                {loggedIn && <Route path="/users/update-profile" element={<UpdateProfile/>}/>}
                {loggedIn && <Route path="/users/change-password" element={<ChangePassword/>}/>}
                {loggedIn && <Route path="/users/cards" element={<CardGallery/>}/>}
                {loggedIn && <Route path="/users/wishList" element={<WishList/>}/>}

                {/* Product Management Routes */}
                {loggedIn && <Route path="/users/post-products" element={<PostProduct/>}/>}
                {loggedIn && <Route path="/users/products/:id" element={<UpdateProduct/>}/>}
                {loggedIn && <Route path="/users/products" element={<ProductsUser/>}/>}
                {loggedIn && <Route path="/categories" element={<CategoriesOverview/>}/>}
                {loggedIn && <Route path="/categories/:id" element={<CategoryDetails/>}/>}
                {loggedIn && <Route path="/categories/new" element={<CategoryForm/>}/>}
                {loggedIn && <Route path="/categories/:id/subCategories/new" element={<SubCategoryForm/>}/>}
                {loggedIn && <Route path="/messages/:chat?" element={<Chat/>}/>}
                {loggedIn && <Route path="/users" element={<UsersOverview/>}/>}
                {loggedIn && <Route path="/users/addresses" element={<AddressGallery/>}/>}

                {loggedIn && <Route path="/users/addresses/new" element={<UserAddressForm/>}/>}
                {loggedIn && <Route path="/users/addresses/:id" element={<UpdateUserAddress/>}/>}

                {/* Payment Methods Routes */}
                {loggedIn && <Route path="/users/creditCardForm" element={<CreditCardForm/>}/>}
                {loggedIn && <Route path="/users/updateCard/:id" element={<UpdateCard/>}/>}

                {/* Logout Route */}
                {loggedIn && <Route path="/users/logout" element={<Logout/>}/>}
            </Routes>

        </div>
    );

};

export default Body;
