import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { getReviewDetailAPI } from 'src/api/review';
import { Header } from 'src/components/common/header/Header';
import { ImgViewer } from 'src/components/common/imgViewer/ImgViewer';
import Review from 'src/components/reviewDetail/review/Review';
import { ReviewDetailType } from 'src/types/api/review';
import styled from 'styled-components';

interface Props {
  reviewData: ReviewDetailType;
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const seatAreaId = Number(query.seatAreaId);
  const reviewId = Number(query.reviewId);
  const reviewData = await getReviewDetailAPI(seatAreaId, reviewId);

  if (!reviewData) {
    return {
      redirect: {
        destination: `/seat`,
        permanent: false,
      },
    };
  }

  return { props: { reviewData } };
};

const ReviewPage: NextPage<Props> = ({ reviewData }) => {
  return (
    <Wrapper>
      <Header />
      <ImgViewer imgList={reviewData.images} userId="시야봇" />
      <Review
        reviewId={reviewData.id}
        reviewText={reviewData.review}
        concertHall={reviewData.concertHallName}
        seatArea={reviewData.seatArea}
        createAt={reviewData.createAt}
      />
    </Wrapper>
  );
};

export default ReviewPage;

const Wrapper = styled.div`
  padding-top: 120px;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;

  position: relative;
`;
