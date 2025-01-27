import {EmptyWishList, WishListItem} from "../index.js";
import {faBackward} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import useResponseHandler from "../../../hooks/useResponseHandler.js";
import {useWishListStore} from "../../../store/useWishListStore.js";
import {useShoppingCartStore} from "../../../store/useShoppingCartStore.js";

const WishList = () => {
    const {handleSuccess, handleErrors} = useResponseHandler();

    const {removeWishListItem, wishList} = useWishListStore((state) => ({
        removeWishListItem: state.removeItem,
        wishList: state.getWishList(),
    }));

    const {addToShoppingCart, shoppingCart} = useShoppingCartStore(state => ({
        addToShoppingCart: state.addItem,
        shoppingCart: state.getShoppingCart()
    }));


    const handleAddToCart = (productId) => {
        addToShoppingCart(shoppingCart.id, productId, 1, () => {
            removeWishListItem(wishList.id, productId, () => handleSuccess('', '/shopping/shopping-cart'));
        }, handleErrors);
    };

    const handleDeleteItem = (itemId) => {
        removeWishListItem(wishList.id, itemId, () => handleSuccess('Deleted!', ''));
    };

    if (!wishList.items.length) return <EmptyWishList/>;

    return (
        <div className="flex flex-col">
            <div className="flex-grow py-8">
                <div className="container mx-auto px-4">
                    <button
                        className="px-8 py-3 ml-6 text-white bg-indigo-400 rounded-md hover:bg-indigo-800 transition duration-300 ease-in-out"
                        onClick={() => window.history.back()}
                    >
                        <FontAwesomeIcon icon={faBackward} className="h-8"/>
                    </button>

                    <h1 className="text-5xl font-extrabold font-sans rounded-md text-center mx-auto text-gray-800 mb-4 pb-2">
                        Wish List
                    </h1>

                    <div className="flex flex-col mb-8 mx-4 rounded-lg">
                        <div className="mx-auto rounded-lg">
                            <div className="rounded-lg shadow-xl border p-6 mb-4">
                                <table className="w-full border rounded-lg">
                                    <thead className="bg-green-500 shadow-md border rounded-lg">
                                    <tr className="rounded-lg">
                                        <th className="text-center text-2xl text-white italic font-sans font-bold px-4 py-2 ">Product</th>
                                        <th className="text-center text-2xl text-white italic font-sans font-bold px-4 py-2">Description</th>
                                        <th className="text-center text-2xl text-white italic font-sans font-bold px-4 py-2">Price</th>
                                        <th className="text-center text-2xl text-white italic font-sans font-bold px-4 py-2">Score</th>
                                        <th className="text-center text-2xl text-white italic font-sans font-bold px-4 py-2"></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {wishList.items.map((item) => (
                                        <WishListItem
                                            key={item.productId}
                                            item={item}
                                            handleAddToCart={handleAddToCart}
                                            handleDeleteItem={handleDeleteItem}
                                        />
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WishList;
