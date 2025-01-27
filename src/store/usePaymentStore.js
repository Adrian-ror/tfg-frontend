import {create} from 'zustand';
import {devtools} from 'zustand/middleware';
import {
    addCreditCard,
    findPaymentMethodById,
    findPaymentMethods,
    getDefaultPaymentMethod,
    removePaymentMethod,
    updateCreditCard,
} from '../backend/paymentService';
import {buy} from "../backend/shoppingService.js";


export const usePaymentStore = create(devtools((set, get) => ({
    paymentMethods: [],
    paymentMethod: null,
    defaultPaymentMethod: null,

    setPaymentMethods: (methods) => set({paymentMethods: methods}),

    addCreditCard: (userId, token, byDefault, onSuccess, onErrors) => {
        addCreditCard(userId, token, byDefault,
            (newPaymentMethod) => {
                set((state) => ({
                    paymentMethods: [...state.paymentMethods, newPaymentMethod]
                }));
                onSuccess();
            },
            onErrors
        );
    },

    updateCreditCard: (userId, paymentMethodId, month, year, byDefault, onSuccess, onErrors) => {
        updateCreditCard(userId, paymentMethodId, month, year, byDefault,
            (updatedPaymentMethod) => {
                set((state) => ({
                    paymentMethods: state.paymentMethods.map(pm =>
                        pm.paymentMethodId === paymentMethodId ? updatedPaymentMethod : pm
                    )
                }));
                onSuccess();
            },
            onErrors
        );
    },


    removePaymentMethod: (userId, paymentMethodId, type, onSuccess, onErrors) => {
        removePaymentMethod(userId, paymentMethodId, type,
            () => {
                set((state) => ({
                    paymentMethods: state.paymentMethods.filter(pm => pm.paymentMethodId !== paymentMethodId)
                }));
                onSuccess();
            },
            onErrors
        );
    },

    findPaymentMethods: (userId, onSuccess, onErrors) => {
        findPaymentMethods(userId,
            (paymentMethods) => {
                set({paymentMethods});
                onSuccess();
            },
            onErrors
        );
    },

    findPaymentMethodById: (paymentMethodId, onSuccess, onErrors) => {
        findPaymentMethodById(paymentMethodId,
            (paymentMethod) => {
                set({paymentMethod});
                onSuccess(paymentMethod);
            },
            onErrors
        );
    },

    findDefaultPaymentMethod: (userId, onSuccess, onErrors) => {
        getDefaultPaymentMethod(userId,
            (defaultPaymentMethod) => {
                set({defaultPaymentMethod});
                onSuccess(defaultPaymentMethod);
            },
            onErrors
        );
    },

    buy: (shoppingCartId, paymentMethodId, postalAddress, postalCode, onSuccess, onErrors) => {
        buy(shoppingCartId, paymentMethodId, postalAddress, postalCode,
            (response) => {
                onSuccess(response);
            },
            onErrors
        );
    },

    getPaymentMethods: () => get().paymentMethods,

    getPaymentMethod: () => get().paymentMethod,

    getDefaultPaymentMethod: () => get().defaultPaymentMethod,

    getPaymentMethodCount: () => get().paymentMethods.length

}), {
    name: 'payment-store'
}));
