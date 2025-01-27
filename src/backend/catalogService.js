import {appFetch, config} from './appFetch';

export const findAllCategories = (onSuccess) =>
    appFetch('/catalog/categories', config('GET', null), onSuccess, null);

export const findParentCategories = (onSuccess) =>
    appFetch('/catalog/parent_categories', config('GET', null), onSuccess, null);

export const findCategoryById = (id, onSuccess) =>
    appFetch(`/catalog/categories/${id}`, config('GET', null), onSuccess, null);

export const addCategory = (name, onSuccess) =>
    appFetch('/catalog/categories/new', config('POST', {name}), onSuccess, null);

export const updateCategory = (id, name, onSuccess) =>
    appFetch(`/catalog/categories/${id}/update`, config('PUT', {name}), onSuccess, null);

export const deleteCategory = (id, onSuccess, onErrors) =>
    appFetch(`/catalog/categories/${id}/delete`, config('DELETE', null), onSuccess, onErrors);

export const addSubcategory = (parentId, subcategoryName, onSuccess) =>
    appFetch(`/catalog/categories/${parentId}/subcategories`, config('POST', {name: subcategoryName}), onSuccess, null);

export const findProducts = ({categoryId, keywords, rating, page}, onSuccess) => {
    let path = `/catalog/products?page=${page}`;

    if (categoryId) path += `&categoryId=${categoryId}`;
    if (keywords && keywords.length > 0) path += `&keywords=${encodeURIComponent(keywords)}`;
    if (rating) path += `&rating=${rating}`;

    appFetch(path, config('GET', null), onSuccess, null);
};

export const findByProductId = (id, onSuccess) =>
    appFetch(`/catalog/products/${id}`, config('GET', null), onSuccess, null);

export const findAllProducts = ({categoryId, keywords, rating, page, size}, onSuccess) => {
    let path = `/catalog/all-products?page=${page}&size=${size}`;

    if (categoryId) path += `&categoryId=${categoryId}`;
    if (keywords && keywords.length > 0) path += `&keywords=${encodeURIComponent(keywords)}`;
    if (rating) path += `&rating=${rating}`;

    appFetch(path, config('GET', null), onSuccess, null);
};
