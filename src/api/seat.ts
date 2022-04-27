import { MOCK_SEAT_AREA } from './mock/seat_areas';

export interface SeatAreaType {
  seatAreaId: number;
  floor: number;
  area: string;
  countReviews: number;
}
export const getSeatAreaAPI = (hallId: number): Promise<SeatAreaType[]> => {
  return new Promise((resolve) => resolve(MOCK_SEAT_AREA));
};
