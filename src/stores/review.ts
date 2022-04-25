import { selectorFamily } from 'recoil';
import { getReviewListAPI } from 'src/api/review';

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
