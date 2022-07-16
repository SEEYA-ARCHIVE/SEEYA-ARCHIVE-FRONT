import { MOCK_SEAT_AREA } from './mock/seat_areas';

export interface CompareSeatAreaType {
  id: number;
  userNickname: string;
  thumbnailImage: string;
  seatAreaName: string;
  review: string;
  createAt: string;
  countLikeUsers: number;
  countComments: number;
}

// https://api.seeya-archive.com/compare?concert_hall_id=1&floor=1&seat_area_name=d1
export const getCompareSeatAreaAPI = async (
  param: {
    hallId: number;
    floor: number;
    area: string;
  } | null,
): Promise<CompareSeatAreaType[]> => {
  if (!param) return [];
  const { hallId, floor, area } = param;
  const url = `${process.env.NEXT_PUBLIC_HOST}/compare?concert_hall_id=${hallId}&floor=${floor}&seat_area_name=${area}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
