import {create} from 'zustand';
import {devtools} from 'zustand/middleware';
import {addToWishList, removeWishListItem} from '../backend/shoppingService';

export const useWishListStore = create(devtools((set, get) => ({
    wishList: [],

    setWishList: (list) => {
        set({wishList: list});
    },

    addItem: (wishListId, productId, onSuccess, onErrors) => {
        addToWishList(wishListId, productId,
            (updatedWishList) => {
                set({wishList: updatedWishList});
                onSuccess();
            },
            onErrors
        );
    },

    removeItem: (wishListId, productId, onSuccess, onErrors) => {
        removeWishListItem(wishListId, productId,
            (updatedWishList) => {
                set({wishList: updatedWishList});
                onSuccess();
            },
            onErrors
        );
    },

    clearWishList: () => {
        set({wishList: []});
    },

    getWishList: () => get().wishList,

    getItemCount: () => {
        return get().wishList.length;
    }
}), {
    name: 'wish-list-store'
}));
