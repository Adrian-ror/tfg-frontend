import {appFetch, config} from './appFetch';

// Utility function to handle appFetch calls
const fetchPaymentMethod = (url, method, data = null, onSuccess, onErrors) => {
    if (data !== null) {
        appFetch(url, config(method, data), onSuccess, onErrors);
    } else {
        appFetch(url, config(method), onSuccess, onErrors);
    }

};

// Add Payment Methods
export const addCreditCard = (id, token, byDefault, onSuccess, onErrors) => {

    fetchPaymentMethod(`/paymentMethods/add`, 'POST', {
        stripeId: token.id,                    // ID del método de pago en Stripe
        brand: token.card.brand,               // Marca de la tarjeta (e.g., "Visa")
        country: token.card.country,           // País de la tarjeta (e.g., "US")
        expMonth: token.card.exp_month,        // Mes de vencimiento
        expYear: token.card.exp_year,          // Año de vencimiento
        last4: token.card.last4,               // Últimos 4 dígitos de la tarjeta
        funding: token.card.funding,           // Tipo de tarjeta (e.g., "credit" o "debit")
        fingerprint: token.card.fingerprint,   // Huella digital de la tarjeta
        byDefault                              // Si esta tarjeta es el método de pago por defecto
    }, onSuccess, onErrors);
};


// Update Payment Methods
export const updateCreditCard = (id, paymentMethodId, month, year, byDefault, onSuccess, onErrors) => {

    fetchPaymentMethod(`/paymentMethods/update/${paymentMethodId}`, 'PUT', {
        expMonth: month,
        expYear: year,
        byDefault
    }, onSuccess, onErrors);
};


// Find Payment Methods
export const findPaymentMethods = (id, onSuccess, onErrors) => {
    fetchPaymentMethod(`/paymentMethods/list`, 'GET', null, onSuccess, onErrors);
};

export const findPaymentMethodById = (methodId, onSuccess, onErrors) => {
    fetchPaymentMethod(`/paymentMethods/get/${methodId}`, 'GET', null, onSuccess, onErrors);
};

// Get Default Payment Method
export const getDefaultPaymentMethod = (id, onSuccess, onErrors) => {
    fetchPaymentMethod(`/paymentMethods/default`, 'GET', null, onSuccess, onErrors);
};

// Remove Payment Method
export const removePaymentMethod = (id, paymentMethodId, type, onSuccess, onErrors) => {
    fetchPaymentMethod(`/paymentMethods/${id}/deletePaymentMethod/${paymentMethodId}/${type}`, 'DELETE', null, onSuccess, onErrors);
};
