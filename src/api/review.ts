import { IReviewListResponse } from 'src/types/api';
import axios from 'axios';
export const getReviewListAPI = async (seatId: number, page: number): Promise<IReviewListResponse> => {
  const { data } = await axios.get(`http://3.36.62.207/seat_areas/${seatId}/reviews?page=${page}`);

  return data;
};
