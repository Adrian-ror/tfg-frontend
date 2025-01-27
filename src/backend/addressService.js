import {appFetch, config} from './appFetch';

// Agregar una dirección de usuario
export const addUserAddress = (addressParams, onSuccess, onErrors) =>
    appFetch(
        '/user-addresses',
        config('POST', {...addressParams}),
        onSuccess,
        onErrors
    );

// Actualizar una dirección de usuario
export const updateUserAddress = (addressId, addressParams, onSuccess, onErrors) =>
    appFetch(
        `/user-addresses/${addressId}`,
        config('PUT', {...addressParams}),
        onSuccess,
        onErrors
    );

// Eliminar una dirección de usuario
export const removeUserAddress = (addressId, onSuccess, onErrors) =>
    appFetch(
        `/user-addresses/${addressId}`,
        config('DELETE', null),
        onSuccess,
        onErrors
    );

// Obtener la dirección de usuario por defecto
export const findDefaultUserAddress = (onSuccess, onErrors) =>
    appFetch(
        '/user-addresses/default',
        config('GET', null),
        onSuccess,
        onErrors
    );

// Buscar dirección de usuario por ID
export const findUserAddressById = (addressId, onSuccess, onErrors) =>
    appFetch(
        `/user-addresses/${addressId}`,
        config('GET', null),
        onSuccess,
        onErrors
    );

// Obtener todas las direcciones del usuario
export const findUserAddresses = (onSuccess, onErrors) =>
    appFetch(
        '/user-addresses',
        config('GET', null),
        onSuccess,
        onErrors
    );
