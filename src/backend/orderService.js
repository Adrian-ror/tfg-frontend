import {appFetch, config} from './appFetch';

// Obtener una orden por su ID
export const findOrderById = (orderId, onSuccess, onErrors) =>
    appFetch(
        `/orders/${orderId}`,
        config('GET', null),
        onSuccess,
        onErrors
    );

// Obtener todas las órdenes de un usuario con paginación
export const findUserOrders = (page = 0, size = 6, onSuccess, onErrors) =>
    appFetch(
        `/orders?page=${page}&size=${size}`,
        config('GET', null),
        onSuccess,
        onErrors
    );

// Obtener órdenes de un usuario por estado con paginación
export const findUserOrdersByState = (state, page = 0, size = 6, onSuccess, onErrors) =>
    appFetch(
        `/orders/state?state=${state}&page=${page}&size=${size}`,
        config('GET', null),
        onSuccess,
        onErrors
    );

// Cambiar el estado de una orden
export const changeOrderState = (orderId, newState, onSuccess, onErrors) =>
    appFetch(
        `/orders/${orderId}/state?newState=${newState}`,
        config('PUT', null),
        onSuccess,
        onErrors
    );

// Obtener todas las órdenes con paginación (para administrador o supervisión)
export const findAllOrders = (page, size, onSuccess, onErrors) => {

    let path = `/orders/all?page=${page}`;

    if (size) path += `&size=${size}`;
    
    appFetch(
        path,
        config('GET', null),
        onSuccess,
        onErrors
    );
}
