import axios from 'axios';
import { ReviewListType, ReviewDetailType } from 'src/types/api/review';

export const getReviewDetailAPI = async (seatAreaId: number, reviewId: number): Promise<ReviewDetailType> => {
  const { data } = await axios.get(
    `http://${process.env.NEXT_PUBLIC_HOST}/seat_areas/${seatAreaId}/reviews/${reviewId}`,
  );

  return data;
};

export const getReviewListAPI = async (seatId: number, page: number): Promise<ReviewListType> => {
  const { data } = await axios.get(`http://${process.env.NEXT_PUBLIC_HOST}/seat_areas/${seatId}/reviews?page=${page}`);

  return data;
};
