import NetworkError from './NetworkError';

export const isJson = (response) => {
    const contentType = response.headers.get("content-type");
    return contentType && contentType.indexOf("application/json") !== -1;
};

export const handleOkResponse = async (response, onSuccess) => {
    if (!response.ok) return false;

    if (!onSuccess) return true;

    if (response.status === 204) {
        onSuccess();
        return true;
    }

    if (isJson(response)) {
        const payload = await response.json();
        onSuccess(payload);
    }
    return true;
};

export const handle4xxResponse = async (response, onErrors, reauthenticationCallback) => {
    if (response.status < 400 || response.status >= 500) return false;

    if (response.status === 401 && reauthenticationCallback) {
        reauthenticationCallback();
        return true;
    }

    if (!isJson(response)) throw new NetworkError();

    if (onErrors) {
        const payload = await response.json();
        console.log(payload)
        if (payload.globalError || payload.fieldErrors) {
            onErrors(payload);
        }
    }
    return true;
};

export const handleResponse = async (response, onSuccess, onErrors, reauthenticationCallback) => {
    if (await handleOkResponse(response, onSuccess)) return;
    if (await handle4xxResponse(response, onErrors, reauthenticationCallback)) return;
    throw new NetworkError();
};
