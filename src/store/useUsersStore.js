import {create} from 'zustand';
import {devtools} from 'zustand/middleware';
import {
    banUser,
    changePassword,
    findAllActiveUsers,
    findAllBannedUsers,
    findAllUsers,
    login,
    logout,
    signUp,
    tryLoginFromServiceToken,
    unbanUser,
    updateProfile
} from '../backend/userService';
import {useShoppingCartStore} from "./useShoppingCartStore.js";
import {useWishListStore} from "./useWishListStore.js";

export const useUsersStore = create(devtools((set, get) => ({

    user: null,
    users: [],
    signUp: (userName, password, firstName, lastName, email, image, role, onSuccess, onErrors, reauthenticationCallback) => {
        signUp(userName, password, firstName, lastName, email, image, role,
            (authenticatedUser) => {

                set({user: authenticatedUser.user});
                if (authenticatedUser.shoppingCart) {
                    useShoppingCartStore.getState().setShoppingCart(authenticatedUser.shoppingCart);
                }

                if (authenticatedUser.wishList) {
                    useWishListStore.getState().setWishList(authenticatedUser.wishList);
                }

                onSuccess();
            },
            onErrors,
            reauthenticationCallback
        );
    },

    login: (userName, password, onSuccess, onErrors, reauthenticationCallback) => {
        login(userName, password,
            (authenticatedUser) => {
                set({user: authenticatedUser.user});

                if (authenticatedUser.shoppingCart) {
                    useShoppingCartStore.getState().setShoppingCart(authenticatedUser.shoppingCart);
                }

                if (authenticatedUser.wishList) {
                    useWishListStore.getState().setWishList(authenticatedUser.wishList);
                }
                onSuccess();
            },
            onErrors,
            reauthenticationCallback
        );
    },

    tryLoginFromServiceToken: (reauthenticationCallback) => {
        tryLoginFromServiceToken(
            (authenticatedUser) => {
                if (authenticatedUser) {
                    set({user: authenticatedUser.user});

                    if (authenticatedUser.shoppingCart) {
                        useShoppingCartStore.getState().setShoppingCart(authenticatedUser.shoppingCart);
                    }

                    if (authenticatedUser.wishList) {
                        useWishListStore.getState().setWishList(authenticatedUser.wishList);
                    }
                }
            },
            reauthenticationCallback
        );
    },

    logout: () => {
        logout();
        set({user: null});
        useShoppingCartStore.getState().clearCart();
        useWishListStore.getState().clearWishList();
    },

    updateProfile: (id, firstName, lastName, email, image, onSuccess, onErrors) => {
        updateProfile(id, firstName, lastName, email, image,
            (updatedUser) => {
                set({user: updatedUser});
                onSuccess();
            },
            onErrors
        );
    },

    changePassword: (id, oldPassword, newPassword, onSuccess, onErrors) => {
        changePassword(id, oldPassword, newPassword, onSuccess, onErrors);
    },

    // Agregamos la función para obtener todos los usuarios
    findAllUsers: (onSuccess, onErrors) => {
        findAllUsers(
            (users) => {
                set({users}); // Actualiza el estado con la lista de usuarios
                onSuccess(users); // Llama al callback de éxito
            },
            (error) => {
                onErrors(error); // Llama al callback de error
            }
        );
    },

    // Obtener usuarios activos
    findAllActiveUsers: (onSuccess, onErrors) => {
        findAllActiveUsers(
            (activeUsers) => {
                set({users: activeUsers}); // Actualiza el estado con la lista de usuarios activos
                onSuccess(activeUsers); // Llama al callback de éxito
            },
            (error) => {
                onErrors(error); // Llama al callback de error
            }
        );
    },

    // Obtener usuarios baneados
    findAllBannedUsers: (onSuccess, onErrors) => {
        findAllBannedUsers(
            (bannedUsers) => {
                set({users: bannedUsers}); // Actualiza el estado con la lista de usuarios baneados
                onSuccess(bannedUsers); // Llama al callback de éxito
            },
            (error) => {
                onErrors(error); // Llama al callback de error
            }
        );
    },
// Método para banear usuario
    banUser: (id, onSuccess, onErrors) => {
        banUser(
            id,
            () => {
                // Actualizamos el estado de los usuarios después de banear
                set((state) => {
                    const updatedUsers = state.users.map((user) =>
                        user.id === id ? {...user, status: 'BANNED'} : user
                    );
                    return {users: updatedUsers}; // Actualizamos la lista de usuarios con el nuevo estado
                });
                onSuccess();
            },
            onErrors
        );
    },

// Método para desbanear usuario
    unbanUser: (id, onSuccess, onErrors) => {
        unbanUser(
            id,
            () => {
                // Actualizamos el estado de los usuarios después de desbanear
                set((state) => {
                    const updatedUsers = state.users.map((user) =>
                        user.id === id ? {...user, status: 'ACTIVE'} : user
                    );
                    return {users: updatedUsers}; // Actualizamos la lista de usuarios con el nuevo estado
                });
                onSuccess();
            },
            onErrors
        );
    },

    // Método adicional para obtener usuarios desde el estado
    getUsers: () => get().users,

    getUser: () => get().user,

    isShopper: () => {
        const user = get().user;
        return user ? user.role === 'CLIENT' : false;
    },

    isAdmin: () => {
        const user = get().user;
        return user ? user.role === 'ADMIN' : false;
    },
}), {
    name: 'user-store'
}));
