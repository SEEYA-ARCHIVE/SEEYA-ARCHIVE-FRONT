import { IReviewListType } from 'src/types/api/review';
import axios from 'axios';

export interface ReviewDetailType {
  id: number;
  concertHall: string;
  createAt: string;
  updateAt: string;
  seatArea: string;
  images: string[];
  artist: string | null;
  nextId: number | null;
  previousId: number | null;
}

export const getReviewDetailAPI = (seatAreaId: number, reviewId: number): Promise<ReviewDetailType> => {
  return new Promise((resolve) => resolve(MOCK_REVIEW));
};


export const getReviewListAPI = async (seatId: number, page: number): Promise<IReviewListType> => {
  const { data } = await axios.get(`http://3.36.62.207/seat_areas/${seatId}/reviews?page=${page}`);

  return data;
};
