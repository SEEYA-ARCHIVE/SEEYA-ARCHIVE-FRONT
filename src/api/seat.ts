import { MOCK_SEAT_AREA } from './mock/seat_areas';

export interface SeatAreaType {
  seatAreaId: number;
  floor: number;
  area: string;
  countReviews: number;
}
export const getSeatAreaAPI = async (hallId: number): Promise<SeatAreaType[]> => {
  // return MOCK_SEAT_AREA;
  const url = `${process.env.NEXT_PUBLIC_HOST}/concert_halls/${hallId}/seat_areas`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
