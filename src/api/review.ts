import { IReviewListResponse } from 'src/types/api';
import { sampleThumbnail } from 'src/components/common/image/imagePath';

const MOCK_REVIEW_DATA = {
  count: 15,
  next: null,
  previous: null,
  results: [
    {
      id: 7,
      createAt: '2022-02-13T00:47:28+09:00',
      images: {
        previewImages: sampleThumbnail.src,
        numImages: 2,
      },
    },
    {
      id: 27,
      createAt: '2015-02-27T15:37:30+09:00',
      images: {
        previewImages: sampleThumbnail.src,
        numImages: 1,
      },
    },
    {
      id: 29,
      createAt: '2022-02-08T16:02:11+09:00',
      images: {
        previewImages: sampleThumbnail.src,
        numImages: 4,
      },
    },
    {
      id: 48,
      createAt: '2022-01-07T12:18:44+09:00',
      images: {
        previewImages: sampleThumbnail.src,
        numImages: 1,
      },
    },
    {
      id: 53,
      createAt: '2019-04-10T23:58:02+09:00',
      images: {
        previewImages: sampleThumbnail.src,
        numImages: 1,
      },
    },
    {
      id: 8,
      createAt: '2022-02-13T00:47:28+09:00',
      images: {
        previewImages: sampleThumbnail.src,
        numImages: 2,
      },
    },
    {
      id: 28,
      createAt: '2015-02-27T15:37:30+09:00',
      images: {
        previewImages: sampleThumbnail.src,
        numImages: 1,
      },
    },
    {
      id: 200,
      createAt: '2022-02-08T16:02:11+09:00',
      images: {
        previewImages: sampleThumbnail.src,
        numImages: 4,
      },
    },
    {
      id: 498,
      createAt: '2022-01-07T12:18:44+09:00',
      images: {
        previewImages: sampleThumbnail.src,
        numImages: 1,
      },
    },
    {
      id: 582,
      createAt: '2019-04-10T23:58:02+09:00',
      images: {
        previewImages: sampleThumbnail.src,
        numImages: 1,
      },
    },
    {
      id: 72,
      createAt: '2022-02-13T00:47:28+09:00',
      images: {
        previewImages: sampleThumbnail.src,
        numImages: 2,
      },
    },
    {
      id: 217,
      createAt: '2015-02-27T15:37:30+09:00',
      images: {
        previewImages: sampleThumbnail.src,
        numImages: 1,
      },
    },
    {
      id: 289,
      createAt: '2022-02-08T16:02:11+09:00',
      images: {
        previewImages: sampleThumbnail.src,
        numImages: 4,
      },
    },
    {
      id: 438,
      createAt: '2022-01-07T12:18:44+09:00',
      images: {
        previewImages: sampleThumbnail.src,
        numImages: 1,
      },
    },
    {
      id: 5222,
      createAt: '2019-04-10T23:58:02+09:00',
      images: {
        previewImages: sampleThumbnail.src,
        numImages: 1,
      },
    },
  ],
};

export const getReviewListAPI = (seatId: number, page: number): Promise<IReviewListResponse> => {
  return new Promise((resolve) => setTimeout(() => resolve(MOCK_REVIEW_DATA), 500));
};
