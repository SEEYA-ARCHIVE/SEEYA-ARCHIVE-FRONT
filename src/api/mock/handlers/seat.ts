import { rest } from 'msw';

const SEAT_AREA_MOCK = [
  {
    seatAreaId: 28,
    floor: 1,
    area: 'G',
    countReviews: 6,
  },
  {
    seatAreaId: 27,
    floor: 1,
    area: 'B1',
    countReviews: 8,
  },
  {
    seatAreaId: 26,
    floor: 1,
    area: 'B2',
    countReviews: 3,
  },
  {
    seatAreaId: 25,
    floor: 1,
    area: 'D2',
    countReviews: 6,
  },
  {
    seatAreaId: 24,
    floor: 1,
    area: 'C1',
    countReviews: 3,
  },
  {
    seatAreaId: 23,
    floor: 1,
    area: 'H',
    countReviews: 5,
  },
  {
    seatAreaId: 22,
    floor: 2,
    area: 'A1',
    countReviews: 5,
  },
  {
    seatAreaId: 21,
    floor: 2,
    area: 'A3',
    countReviews: 2,
  },
  {
    seatAreaId: 20,
    floor: 2,
    area: 'E1',
    countReviews: 1,
  },
  {
    seatAreaId: 19,
    floor: 2,
    area: 'E2',
    countReviews: 8,
  },
];

export const seatHandler = rest.get(`${process.env.NEXT_PUBLIC_HOST}/concert_halls/0/seat_areas`, (req, res, ctx) => {
  return res(ctx.json(SEAT_AREA_MOCK));
});
