import {imgbbAPIKey, imgbbUploadUrl} from './config';

export const uploadImageToImgBB = async (image) => {
    const formData = new FormData();
    formData.append("image", image);
    const response = await fetch(`${imgbbUploadUrl}?key=${imgbbAPIKey}`, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) throw new Error("Error uploading image to imgBB");

    const data = await response.json();
    return data.data.url;
};
