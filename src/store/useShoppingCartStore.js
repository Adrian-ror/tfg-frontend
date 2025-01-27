import {create} from 'zustand';
import {devtools} from 'zustand/middleware';
import {addToShoppingCart, removeShoppingCartItem, updateShoppingCartItemQuantity} from '../backend/shoppingService';

export const useShoppingCartStore = create(devtools((set, get) => ({
    shoppingCart: {},

    setShoppingCart: (cart) => {
        set({shoppingCart: cart});
    },

    addItem: (shoppingCartId, productId, quantity, onSuccess, onErrors) => {
        addToShoppingCart(shoppingCartId, productId, quantity,
            (updatedCart) => {
                set({shoppingCart: updatedCart});
                onSuccess();
            },
            onErrors
        );
    },

    updateItemQuantity: (shoppingCartId, productId, quantity, onSuccess, onErrors) => {
        updateShoppingCartItemQuantity(shoppingCartId, productId, quantity,
            (updatedCart) => {
                set({shoppingCart: updatedCart});
                onSuccess();
            },
            onErrors
        );
    },

    removeItem: (shoppingCartId, productId, onSuccess, onErrors) => {
        removeShoppingCartItem(shoppingCartId, productId,
            (updatedCart) => {
                set({shoppingCart: updatedCart});
                onSuccess();
            },
            onErrors
        );
    },

    clearCart: () => {
        set({shoppingCart: []});
    },

    getItemCount: () => {
        return get().shoppingCart.items.length;
    },

    getTotalPrice: () => {
        return get().shoppingCart.totalPrice;
    },

    getShoppingCart: () => get().shoppingCart,

}), {
    name: 'shopping-cart-store'
}));
