import {create} from 'zustand';
import {devtools} from 'zustand/middleware';
import {
    addCategory,
    addSubcategory,
    deleteCategory,
    findCategoryById,
    findParentCategories,
    updateCategory
} from '../backend/catalogService';

export const useCategoryStore = create(devtools((set, get) => ({
    categories: [],
    selectedCategory: null,

    findCategories: (onSuccess, onErrors) => {
        findParentCategories((categories) => {
            set({categories});
            if (onSuccess) onSuccess(categories);
        }, onErrors);
    },
    findCategoryById: (id, onSuccess, onErrors) => {
        findCategoryById(id, (category) => {
            if (onSuccess) onSuccess(category);
        }, onErrors);
    },

    addNewCategory: (name, onSuccess, onErrors) => {
        addCategory(name, (category) => {
            set((state) => ({
                categories: [...state.categories, category]
            }));
            if (onSuccess) onSuccess(category);
        }, onErrors);
    },

    updateExistingCategory: (id, name, onSuccess, onErrors) => {
        updateCategory(id, name, (category) => {
            set((state) => ({
                categories: state.categories.map(cat =>
                    cat.id === category.id ? category : cat
                )
            }));
            if (onSuccess) onSuccess(category);
        }, onErrors);
    },

    deleteExistingCategory: (id, onSuccess, onErrors) => {
        deleteCategory(id, (categories) => {
            set(() => ({
                categories: categories,
                selectedCategory: null
            }));
            onSuccess(categories)
        }, onErrors);
    },
// Agregar una subcategoría
    addSubcategory: (parentId, subcategoryName, onSuccess, onErrors) => {
        addSubcategory(parentId, subcategoryName, (parentCategory) => {
            set((state) => {
                // Crear una nueva lista de categorías, reemplazando solo la categoría padre actualizada
                const updatedCategories = state.categories.map(category =>
                    category.id === parentId ? parentCategory : category
                );

                return {categories: updatedCategories};
            });

            if (onSuccess) onSuccess(parentCategory.subcategories);
        }, onErrors);
    },


    getCategories: () => get().categories,

    getSelectedCategory: () => get().selectedCategory,

    setSelectedCategory: (category) => {
        set({selectedCategory: category});
    },

    clearCategories: () => {
        set({categories: []});
    },

    clearCategory: () => {
        set({selectedCategory: null});
    },

    getCategoriesCount: () => get().categories.length

}), {
    name: 'category-store'
}));
