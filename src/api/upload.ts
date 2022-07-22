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

interface uploadReviewAPIRequest {
  imageUrlArray: string[];
  seatAreaId?: number;
  review: string;
}
interface uploadReviewAPIResponse {
  id: number;
  imageUrlArray: string[];
  seatArea: number;
  review: string;
}

export const uploadReviewAPI = async (uploadReivewData: uploadReviewAPIRequest) => {
  const data = (await axios.post)<uploadReviewAPIResponse>(
    `seat_areas/${uploadReivewData.seatAreaId}/reviews`,
    uploadReivewData,
  );
  return data;
};
