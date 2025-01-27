import {create} from 'zustand';
import {devtools} from 'zustand/middleware';
import {findOrder, findOrders} from '../backend/shoppingService';

export const useOrderStore = create(devtools((set, get) => ({

    orders: [],
    totalOrders: 0,

    findOrders: (page = 0, onSuccess, onErrors) => {
        findOrders(page, (response) => {
            set({orders: response.items, totalOrders: response.totalItems});
            if (onSuccess) onSuccess(response);
        }, (error) => {
            if (onErrors) onErrors(error);
        });
    },

    findOrder: (orderId, onSuccess, onErrors) => {
        findOrder(orderId, (order) => {
            set((state) => ({
                orders: state.orders.map(o => o.id === order.id ? order : o)
            }));
            if (onSuccess) onSuccess(order);
        }, (error) => {
            if (onErrors) onErrors(error);
        });
    },

    clearOrders: () => {
        set({orders: [], totalOrders: 0});
    },

    getOrdersCount: () => get().orders.length,

    getOrders: () => get().orders,

    getTotalOrders: () => get().totalOrders,


    filterOrdersCombined: (orderType, duration) => {
        let filteredOrders = get().orders;

        // Filtrar por tipo de orden
        if (orderType) {
            filteredOrders = filteredOrders.filter(order => order.state === orderType);
        }

        // Filtrar por rango de fechas
        const currentDate = new Date();
        filteredOrders = filteredOrders.filter(order => {
            const orderDate = new Date(order.date); // Asegúrate de que 'date' sea un campo válido en tu orden

            switch (duration) {
                case '':
                    return orderDate >= new Date(currentDate.setMinutes(currentDate.getMinutes() - 60)); // Filtrar por la última hora
                case 'this week':
                    return orderDate >= new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));
                case 'this month':
                    return orderDate >= new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
                case 'last 3 months':
                    return orderDate >= new Date(currentDate.setMonth(currentDate.getMonth() - 3));
                case 'last 6 months':
                    return orderDate >= new Date(currentDate.setMonth(currentDate.getMonth() - 6));
                case 'this year':
                    return orderDate >= new Date(currentDate.getFullYear(), 0, 1);
                default:
                    return true; // Si no hay filtro, retornar todas las órdenes
            }
        });

        return filteredOrders; // Retornar las órdenes filtradas
    },

}), {
    name: 'order-store'
}));
