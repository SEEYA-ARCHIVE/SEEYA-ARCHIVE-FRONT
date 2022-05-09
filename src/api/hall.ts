export type HallListType = {
  concertHallId: number;
  name: string;
  address: string;
  lat: number;
  lng: number;
}[];

export const getHallListAPI = async (): Promise<HallListType> => {
  const url = `${process.env.NEXT_PUBLIC_HOST}/concert_halls`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
