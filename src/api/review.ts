import { IReviewListType } from 'src/types/api/review';
import axios from 'axios';
export const getReviewListAPI = async (seatId: number, page: number): Promise<IReviewListType> => {
  const { data } = await axios.get(`http://3.36.62.207/seat_areas/${seatId}/reviews?page=${page}`);

  return data;
};
