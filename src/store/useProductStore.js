import {create} from 'zustand';
import {devtools} from 'zustand/middleware';
import {findAllProducts, findByProductId, findProducts} from "../backend/catalogService.js";
import {postProduct} from "../backend/sellerService.js";
import {useCategoryStore} from "./useCategoryStore.js";

export const useProductStore = create(devtools((set, get) => ({
    productSearch: [],
    product: null,
    searchKeywords: "",
    totalItems: 0,
    currentPage: 1,
    moreProducts: false,
    rating: 0,
    loading: false,
    noResults: false,

    // Función para buscar productos
    findProducts: (categoryId, keywords, rating, page, onSuccess) => {
        set({loading: true, noResults: false});

        findProducts(
            {categoryId, keywords, rating, page: page - 1},
            (result) => {
                set({
                    productSearch: result.items,
                    totalItems: result.totalItems,
                    moreProducts: result.existsMoreItems,
                    loading: false,
                    noResults: result.items.length === 0
                });
                if (onSuccess) onSuccess(result);
            }
        );
    },

    // Función para obtener todos los productos con filtros
    findAllProducts: (categoryId, keywords, rating, page, size, onSuccess) => {
        set({loading: true, noResults: false});
        findAllProducts({categoryId, keywords, rating, page, size}, (result) => {
            set({
                productSearch: result.items,
                totalItems: result.totalItems,
                moreProducts: result.existsMoreItems,
                loading: false,
                noResults: result.items.length === 0
            });
            if (onSuccess) onSuccess(result);
        });
    },

    // Función para obtener un producto por su ID
    findByProductId: (id, onSuccess, onErrors) => {
        findByProductId(id, (product) => {
            set({product});
            if (onSuccess) onSuccess(product);
        }, onErrors);
    },

    // Paginación hacia la página anterior
    previousFindProductsResultPage: () => {
        const newPage = Math.max(1, get().currentPage - 1);
        set({currentPage: newPage});

        const {selectedCategoryId} = useCategoryStore.getState();

        get().findProducts(
            selectedCategoryId,
            get().searchKeywords,
            get().rating,
            newPage
        );
    },

    // Paginación hacia la siguiente página
    nextFindProductsResultPage: () => {
        const newPage = get().currentPage + 1;
        set({currentPage: newPage});

        const {selectedCategoryId} = useCategoryStore.getState();

        get().findProducts(
            selectedCategoryId,
            get().searchKeywords,
            get().rating,
            newPage
        );
    },

    // Función para crear un nuevo producto
    postProduct: async (id, title, description, images, price, categoryName, onSuccess, onErrors) => {
        try {
            await postProduct(id, title, description, images, price, categoryName, onSuccess, onErrors);
        } catch (error) {
            onErrors(error);
        }
    },

    // Establecer palabras clave de búsqueda
    setSearchKeywords: (searchKeywords) => {
        set({searchKeywords});
    },
    // Establecer la página actual
    setCurrentPage: (page) => {
        set({currentPage: page});
    },

    setRating: (newRating) => set({rating: newRating}),

    // Obtener los productos filtrados
    getProducts: () => get().productSearch,

    // Obtener el producto seleccionado
    getSelectedProduct: () => get().product,

    // Contar los productos encontrados
    getProductsCount: () => get().productSearch.length,

    // Obtener la página actual
    getCurrentPage: () => get().currentPage,

    // Obtener el total de productos
    getTotalItems: () => get().totalItems,

    // Obtener las palabras clave de búsqueda
    getSearchKeywords: () => get().searchKeywords,

    getRating: () => get().rating,

    // Obtener el estado de carga
    getLoading: () => get().loading,

    // Obtener el estado de resultados vacíos
    getNoResults: () => get().noResults,

    // Limpiar el producto seleccionado
    clearSelectedProduct: () => {
        set({product: null});
    },

    // Limpiar los resultados de la búsqueda de productos
    clearProductSearch: () => {
        set({productSearch: [], totalItems: 0, currentPage: 1, moreProducts: false});
    },

    // Obtener si hay más productos para cargar
    getMoreProducts: () => get().moreProducts,

}), {
    name: 'product-store'
}));
