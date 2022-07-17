import axios from 'axios';

export const uploadImage = async (uploadImageData: FormData): Promise<string[]> => {
  try {
    const { data } = await axios.post<{ imageUrls: { imageUrls: string[] } }>(
      '/s3/upload/review_images',
      uploadImageData,
    );
    return data.imageUrls.imageUrls;
  } catch (error) {
    console.error(error);
    return [];
  }
};
