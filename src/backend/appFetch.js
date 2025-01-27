import {REACT_APP_BACKEND_URL, SERVICE_TOKEN_NAME} from './config';
import {handleResponse} from './responseHandlers';

let networkErrorCallback;
let reauthenticationCallback;

export const init = (callback) => networkErrorCallback = callback;
export const setReauthenticationCallback = (callback) => reauthenticationCallback = callback;

export const setServiceToken = (serviceToken) => {
    sessionStorage.setItem(SERVICE_TOKEN_NAME, serviceToken);
};

export const getServiceToken = () => sessionStorage.getItem(SERVICE_TOKEN_NAME);
export const removeServiceToken = () => sessionStorage.removeItem(SERVICE_TOKEN_NAME);

/**
 * Configures the fetch request options.
 */
// Configuration for fetch request options
export const config = (method, body) => {
    const config = {method};
    if (body) {

        if (body instanceof FormData) {
            config.body = body;
        } else {
            config.headers = {'Content-Type': 'application/json'};
            config.body = JSON.stringify(body);
        }
    }

    let serviceToken = getServiceToken();

    if (serviceToken) {

        if (config.headers) {
            config.headers['Authorization'] = `Bearer ${serviceToken}`;
        } else {
            config.headers = {'Authorization': `Bearer ${serviceToken}`};
        }

    }

    return config;
};

export const appFetch = async (path, options, onSuccess, onErrors) => {
    try {
        const response = await fetch(`${REACT_APP_BACKEND_URL}${path}`, options);
        await handleResponse(response, onSuccess, onErrors, reauthenticationCallback);
    } catch (error) {
        console.log(error);
    }
};
