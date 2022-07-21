import axios from 'axios';
import { ReviewListType, ReviewDetailType, ReviewCommentType } from 'src/types/api/review';

export const getReviewDetailAPI = async (seatAreaId: number, reviewId: number): Promise<ReviewDetailType> => {
  const { data } = await axios.get(`/seat_areas/${seatAreaId}/reviews/${reviewId}`);

  return data;
};

export const getReviewListAPI = async (seatId: number, page: number): Promise<ReviewListType> => {
  const { data } = await axios.get(`/seat_areas/${seatId}/reviews?page=${page}`);

  return data;
};

export const getReviewCommentListAPI = async (reviewId: number): Promise<ReviewCommentType[]> => {
  const { data } = await axios.get(`/reviews/${reviewId}/comments`);

  return data;
};

export const writeReviewCommentAPI = async (reviewId: number, userId: number, comment: string) => {
  await axios.post(`/reviews/${reviewId}/comments`, {
    review: reviewId,
    user: userId,
    comment,
  });
};
