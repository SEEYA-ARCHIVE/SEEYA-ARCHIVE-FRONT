import { rest } from 'msw';
import sampleImage from '../../../../public/assets/image/sample.jpeg';

const COMPARE_SEAT_AREA_MOCK = [
  {
    id: 0,
    userNickname: 'seeya',
    thumbnailImage: sampleImage,
    review: '아~~~주 잘보입니다!',
    createAt: '2022.12.12',
    countLikeUsers: 12,
    countComments: 12,
  },
  {
    id: 1,
    userNickname: 'seeya',
    thumbnailImage: sampleImage,
    review: '아~~~주 잘보입니다요!',
    createAt: '2022.12.12',
    countLikeUsers: 10,
    countComments: 10,
  },
  {
    id: 2,
    userNickname: 'seeya',
    thumbnailImage: sampleImage,
    review: '아~~~주 잘보입니다yo!',
    createAt: '2022.12.12',
    countLikeUsers: 132,
    countComments: 132,
  },
  {
    id: 3,
    userNickname: 'seeya',
    thumbnailImage: sampleImage,
    review: '아~~~주 잘보입니다you!',
    createAt: '2022.12.12',
    countLikeUsers: 42,
    countComments: 42,
  },
];

export const seatHandler = rest.get(`${process.env.NEXT_PUBLIC_HOST}/compare`, (req, res, ctx) => {
  return res(ctx.json(COMPARE_SEAT_AREA_MOCK));
});
