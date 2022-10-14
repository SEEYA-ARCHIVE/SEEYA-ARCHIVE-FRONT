import { rest } from 'msw';
import { ReviewDetailType } from 'src/types/api/review';
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

const REVIEW_DETAIL_MOCK: ReviewDetailType = {
  id: 1,
  user: {
    id: 12,
    email: 'seeya@gmail.com',
    kakaoId: 'seeya',
    nickname: 'seeya-tester',
  },
  concertHallName: '올림픽홀',
  imageUrlArray: [sampleImage.src, sampleImage.src],
  images: [sampleImage.src, sampleImage.src],
  createAt: '2021-09-22T16:15:45+09:00',
  updateAt: '2021-09-22T16:15:45+09:00',
  seatArea: 'B1',
  artist: 'seeya-singer',
  review: '너무 좋아요',
  comments: ['리뷰 테스트1', '리뷰 테스트2', '리뷰 테스트3'],
  likeUsers: [],
  nextId: 13,
  previousId: 2,
};

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

export const getReviewDetailAPIHandler = rest.get(
  `${process.env.NEXT_PUBLIC_HOST}/seat_areas/:seatAreaId/reviews/:reviewId`,
  (req, res, ctx) => {
    return res(ctx.json(REVIEW_DETAIL_MOCK));
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
