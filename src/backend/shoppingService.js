import {appFetch, config} from './appFetch';

export const addToShoppingCart = (shoppingCartId, productId, quantity, onSuccess,
                                  onErrors) =>
    appFetch(`/shopping/shopping-carts/${shoppingCartId}/add`,
        config('POST', {productId, quantity}), onSuccess, onErrors);

export const updateShoppingCartItemQuantity = (shoppingCartId, productId,
                                               quantity, onSuccess, onErrors) =>
    appFetch(`/shopping/shopping-carts/${shoppingCartId}/update`,
        config('POST', {productId, quantity}), onSuccess, onErrors);

export const removeShoppingCartItem = (shoppingCartId, productId, onSuccess,
                                       onErrors) =>
    appFetch(`/shopping/shopping-carts/${shoppingCartId}/remove`,
        config('POST', {productId}), onSuccess, onErrors);

export const buy = (shoppingCartId, paymentMethodId, userAddressId, shippingMethodId, onSuccess, onErrors) =>
    appFetch(`/shopping/shopping-carts/${shoppingCartId}/buy`,
        config('POST', {paymentMethodId, userAddressId, shippingMethodId}), onSuccess, onErrors);


export const findOrder = (orderId, onSuccess, onErrors) =>
    appFetch(`/orders/${orderId}`,
        config('GET'), onSuccess, onErrors);

export const findOrders = (page, onSuccess, onErrors) =>
    appFetch(`/orders?page=${page}`,
        config('GET'), onSuccess, onErrors);

export const addToWishList = (wishListId, productId, onSuccess,
                              onErrors) =>
    appFetch(`/shopping/wish-lists/${wishListId}/add`,
        config('POST', {productId}), onSuccess, onErrors);

export const removeWishListItem = (wishListId, productId, onSuccess,
                                   onErrors) =>
    appFetch(`/shopping/wish-lists/${wishListId}/remove`,
        config('POST', {productId}), onSuccess, onErrors);

export const addProductReview = (productId, rating, comment, onSuccess, onErrors) =>
    appFetch(`/shopping/products/${productId}/review`,
        config('POST', {rating, comment}), onSuccess, onErrors);

export const isProductPurchased = (productId, onSuccess, onErrors) => {
    appFetch(`/shopping/products/${productId}/is-purchased`, config('GET'), onSuccess, onErrors);
};

export const isProductReviewed = (productId, onSuccess, onErrors) => {
    appFetch(`/shopping/products/${productId}/is-reviewed`, config('GET'), onSuccess, onErrors);
};

export const getProductReviews = (productId, onSuccess, onErrors) =>
    appFetch(`/shopping/products/${productId}/reviews`,
        config('GET'), onSuccess, onErrors);

export const getShippingMethods = (onSuccess, onErrors) =>
    appFetch(`/shopping/shipping-methods`,
        config('GET'), onSuccess, onErrors);