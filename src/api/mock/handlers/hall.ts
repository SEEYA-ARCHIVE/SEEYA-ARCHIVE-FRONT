import { rest } from 'msw';
import { HallListType } from '../../hall';

const HALL_LISTS_MOCK: HallListType = [
  {
    concertHallId: 0,
    name: '올림픽홀',
    address: '올림픽 공원',
    lat: 38,
    lng: 37,
  },
  {
    concertHallId: 1,
    name: '고척 스카이돔',
    address: '고척 스카이돔',
    lat: 38,
    lng: 37,
  },
  {
    concertHallId: 2,
    name: '화정 체육관',
    address: '화정 체육관',
    lat: 38,
    lng: 37,
  },
];

export const hallHandlers = rest.get(`${process.env.NEXT_PUBLIC_HOST}/concert_halls`, (req, res, ctx) => {
  return res(ctx.json(HALL_LISTS_MOCK));
});
