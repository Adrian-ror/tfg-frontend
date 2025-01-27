import {appFetch, config} from "./appFetch.js";
import {uploadImageToImgBB} from "./imageUpload.js";


function addMainSuffixIfNotExists(url) {
    // Verificar si la URL ya contiene "_main" antes de la extensión
    if (!/_main\.[\w\d_-]+$/i.test(url)) {
        // Agregar "_main" antes de la extensión de la URL
        return url.replace(/(\.[\w\d_-]+)$/i, '_main$1');
    } else {
        // Retornar la URL original si ya contiene "_main"
        return url;
    }
}

export const postProduct = async (
    userId,
    title,
    shortDescription,
    description,
    mainImage,
    secondaryImages,
    price,
    discount,
    stock,
    isService,
    brand,
    length,
    width,
    height,
    weight,
    categoryId,
    onSuccess,
    onErrors
) => {
    try {

        const mainImageUrl = await uploadImageToImgBB(mainImage);
        const mainImageUrlModified = mainImageUrl.replace(/(\.[\w\d_-]+)$/i, '_main$1');

        const secondaryImageUrls = await Promise.all(
            Array.from(secondaryImages).map(uploadImageToImgBB)
        );

        const imageUrls = [mainImageUrlModified, ...secondaryImageUrls];

        const productData = {
            title: title,
            shortDescription: shortDescription,
            description: description,
            price: price,
            discount: discount,
            stock: stock,
            rating: 0,
            isService,
            brand: brand,
            length: length,
            width: width,
            height: height,
            weight: weight,
            categoryId: categoryId,
            images: imageUrls
        };

        await appFetch(`/sellers/products`, config('POST', productData), onSuccess, onErrors);
    } catch (error) {
        onErrors(error);
    }
};


export const deleteProduct = async (productId, onSuccess, onErrors) => {
    try {
        await appFetch(`/sellers/products/${productId}`, config('DELETE', null), onSuccess, onErrors);
    } catch (error) {
        onErrors(error);
    }
};


export const getAllProducts = async (onSuccess, onErrors) => {
    try {
        await appFetch(`/sellers/products`, config('GET', null), onSuccess, onErrors);
    } catch (error) {
        onErrors(error);
    }
};

// Función para actualizar un producto
export const updateProduct = async (
    id,
    title,
    shortDescription,
    description,
    mainImage,
    secondaryImages,
    price,
    discount,
    stock,
    isService,
    brand,
    length,
    width,
    height,
    weight,
    categoryId,
    onSuccess,
    onErrors
) => {
    try {
        // Subir imagen principal
        const mainImageUrl = await uploadImageToImgBB(mainImage);
        const mainImageUrlModified = addMainSuffixIfNotExists(mainImageUrl);

        const secondaryImageUrls = secondaryImages.length !== 0
            ? await Promise.all(Array.from(secondaryImages).map(uploadImageToImgBB))
            : [];

        const imageUrls = [mainImageUrlModified, ...secondaryImageUrls];


        const productData = {
            title: title,
            shortDescription: shortDescription,
            description: description,
            price: price,
            discount: discount,
            stock: stock,
            isService: isService,
            brand: brand,
            length: length,
            width: width,
            height: height,
            weight: weight,
            categoryId: categoryId,
            images: imageUrls
        };

        await appFetch(`/sellers/products/${id}`, config('PUT', productData), onSuccess, onErrors);
    } catch (error) {
        onErrors(error);
    }
};

