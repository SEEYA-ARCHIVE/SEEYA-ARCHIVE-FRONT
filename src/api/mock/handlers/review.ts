import { rest } from 'msw';
import sampleImage from '../../../../public/assets/image/sample.jpeg';

const REVIEW_LIST_MOCK = {
  count: 10,
  next: '???',
  previous: '1',
  results: [
    {
      id: 1,
      createAt: '2021-09-22T16:15:45+09:00',
      previewImage: sampleImage,
      artist: 'seeya-tester',
      author: 'seeya-tester',
    },
  ],
};

const REVIEW_MOCK = {
  id: 1,
  concertHall: '올림픽홀',
  createAt: '2021-09-22T16:15:45+09:00',
  updateAt: '2021-09-22T16:15:45+09:00',
  seatArea: 'B1',
  images: [sampleImage, '/media/review-images/05_2021-09-22T07:15:45.000Z_.jpg'],
  artist: null,
  nextId: 13,
  previousId: null,
};

// export const getReviewDetailAPI = async (seatAreaId: number, reviewId: number): Promise<ReviewDetailType> => {
//   const { data } = await axios.get(`/seat_areas/${seatAreaId}/reviews/${reviewId}`);

//   return data;
// };

// export const getReviewListAPI = async (seatId: number, page: number): Promise<ReviewListType> => {
//   const { data } = await axios.get(`/seat_areas/${seatId}/reviews?page=${page}`);

//   return data;
// };

// export const getReviewCommentListAPI = async (reviewId: number): Promise<ReviewCommentType[]> => {
//   const { data } = await axios.get(`/reviews/${reviewId}/comments`);

//   return data;
// };

// export const writeReviewCommentAPI = async (reviewId: number, comment: string) => {
//   await axios.post(`/reviews/${reviewId}/comments`, {
//     comment,
//   });
// };

export const getReviewListAPIHandler = rest.get(
  `${process.env.NEXT_PUBLIC_HOST}/seat_areas/:seatId/reviews`,
  (req, res, ctx) => {
    return res(ctx.json(REVIEW_LIST_MOCK));
  },
);
// export const reviewHandlers = [
// rest.get(`${process.env.NEXT_PUBLIC_HOST}/seat_areas/:seatAreaId/reviews`, (req, res, ctx) => {
//   return res(ctx.json({ results: [REVIEW_MOCK] }));
// }),
// rest.get(`${process.env.NEXT_PUBLIC_HOST}/seat_areas/:seatAreaId/reviews`, (req, res, ctx) => {
//   return res(ctx.json({ results: [REVIEW_MOCK] }));
// }),
// rest.get(`${process.env.NEXT_PUBLIC_HOST}/seat_areas/:seatAreaId/reviews`, (req, res, ctx) => {
//   return res(ctx.json({ results: [REVIEW_MOCK] }));
// }),
// ];
