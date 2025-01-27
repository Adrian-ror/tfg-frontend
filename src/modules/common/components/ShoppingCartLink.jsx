import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartShopping} from "@fortawesome/free-solid-svg-icons";
import {useShoppingCartStore} from "../../../store/useShoppingCartStore.js";

const ShoppingCartLink = () => {

    // Destructure totalQuantity directly from shoppingCart
    const {totalQuantity} = useShoppingCartStore(state => ({
        totalQuantity: state.getItemCount()
    }));

    return (

        <Link
            to="/shopping/shopping-cart" // Route to navigate to shopping cart
            className="relative flex rounded-full bg-gray-500 text-sm focus:outline-none mr-2"
            aria-label="Open shopping cart" // Accessible label for the link
        >
            {/* Span for focus effect */}
            <span className="absolute -inset-1.5"/>

            {/* FontAwesome shopping cart icon */}
            <FontAwesomeIcon icon={faCartShopping} className="h-10"/>

            {/* Show quantity badge if total quantity is greater than zero */}
            {totalQuantity > 0 && (
                <span
                    className="absolute top-0 right-0 flex h-6 w-7  text-lg items-center justify-center rounded-full bg-red-500  text-white -mr-1 -mt-1">
                    {totalQuantity}
                </span>
            )}
        </Link>
    );
};

export default ShoppingCartLink;
