import {
    appFetch,
    config,
    getServiceToken,
    removeServiceToken,
    setReauthenticationCallback,
    setServiceToken
} from './appFetch';
import {uploadImageToImgBB} from "./imageUpload.js";

/**
 * Appends key-value pairs to FormData, ignoring empty values.
 */
const appendToFormData = (formData, fields) => {
    Object.entries(fields).forEach(([key, value]) => {
        if (value) formData.append(key, value);
    });
};


/**
 * Handles user authentication by setting the service token and reauthentication callback.
 */
const handleAuthentication = (authenticatedUser, reauthenticationCallback, onSuccess) => {
    setServiceToken(authenticatedUser.serviceToken);
    setReauthenticationCallback(reauthenticationCallback);
    onSuccess(authenticatedUser);
};

/**
 * Registers a new user.
 */
export const signUp = async (userName, password, firstName, lastName, email, image, role, onSuccess, onErrors, reauthenticationCallback) => {

    try {
        let mainImageUrl;
        if (image) {
            mainImageUrl = await uploadImageToImgBB(image);
        } else {
            mainImageUrl = null;
        }

        const formData = {
            userName: userName,
            password: password,
            firstName: firstName,
            lastName: lastName,
            email: email,
            image: mainImageUrl,
            role: role
        }

        await appFetch(
            '/users/signUp',
            config('POST', formData),
            (authenticatedUser) => handleAuthentication(authenticatedUser, reauthenticationCallback, onSuccess),
            onErrors
        );
    } catch (error) {
        onErrors(error);
    }
};


/**
 * Logs in a user.
 */
export const login = (userName, password, onSuccess, onErrors, reauthenticationCallback) => {
    appFetch(
        '/users/login',
        config('POST', {userName, password}),
        (authenticatedUser) => handleAuthentication(authenticatedUser, reauthenticationCallback, onSuccess),
        onErrors
    );
};

/**
 * Attempts to log in using the service token.
 */
export const tryLoginFromServiceToken = (onSuccess, reauthenticationCallback) => {
    const serviceToken = getServiceToken();

    if (!serviceToken) {
        onSuccess();
        return;
    }

    setReauthenticationCallback(reauthenticationCallback);

    appFetch(
        '/users/loginFromServiceToken',
        config('POST'),
        (authenticatedUser) => onSuccess(authenticatedUser),
        () => removeServiceToken()
    );
};

/**
 * Logs out the user by removing the service token.
 */
export const logout = () => removeServiceToken();

/**
 * Updates user profile.
 */
export const updateProfile = (id, firstName, lastName, email, image, onSuccess, onErrors) => {
    const formData = new FormData();
    appendToFormData(formData, {firstName, lastName, email, image});

    appFetch(
        `/users/${id}`,
        config('PUT', formData),
        onSuccess,
        onErrors
    );
};

/**
 * Changes the user's password.
 */
export const changePassword = (id, oldPassword, newPassword, onSuccess, onErrors) => {
    appFetch(
        `/users/${id}/changePassword`,
        config('POST', {oldPassword, newPassword}),
        onSuccess,
        onErrors
    );
};

export const findAllUsers = (onSuccess, onErrors) => {
    appFetch(
        '/users/list',
        config('GET', null),
        onSuccess,
        onErrors
    );
};

/**
 * Ban a user by changing their status to BANNED.
 */
export const banUser = (id, onSuccess, onErrors) => {
    appFetch(
        `/users/${id}/ban`,
        config('POST'),
        onSuccess,
        onErrors
    );
};

/**
 * Unban a user by changing their status to ACTIVE.
 */
export const unbanUser = (id, onSuccess, onErrors) => {
    appFetch(
        `/users/${id}/unban`,
        config('POST'),
        onSuccess,
        onErrors
    );
};

/**
 * Get a list of all active users.
 */
export const findAllActiveUsers = (onSuccess, onErrors) => {
    appFetch(
        '/users/active',
        config('GET', null),
        onSuccess,
        onErrors
    );
};

/**
 * Get a list of all banned users.
 */
export const findAllBannedUsers = (onSuccess, onErrors) => {
    appFetch(
        '/users/banned',
        config('GET', null),
        onSuccess,
        onErrors
    );
};
