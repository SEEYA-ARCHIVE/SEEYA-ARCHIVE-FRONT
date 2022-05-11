import { selectorFamily } from 'recoil';
import { ReviewDetailType } from 'src/types/api/review';
import { getReviewListAPI, getReviewDetailAPI } from 'src/api/review';

export const getReviewList = selectorFamily({
  key: 'GET/reviewList',
  get:
    ([seatId, page]: [number, number]) =>
    async () => {
      try {
        const result = await getReviewListAPI(seatId, page);
        return result;
      } catch (e) {
        return {
          results: [],
          count: 0,
          next: null,
        };
      }
    },
});

export const getReviewDetail = selectorFamily<ReviewDetailType | null, [number, number]>({
  key: 'GET/reviewDetail',
  get:
    ([seatAreaId, reviewId]: [number, number]) =>
    async () => {
      try {
        return await getReviewDetailAPI(seatAreaId, reviewId);
      } catch (err) {
        return null;
      }
    },
});
