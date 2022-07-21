import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { getReviewDetailAPI } from 'src/api/review';
import { Header } from 'src/components/common/header/Header';
import { ImgViewer } from 'src/components/common/imgViewer/ImgViewer';
import Review from 'src/components/reviewDetail/review/Review';
import { ReviewDetailType } from 'src/types/api/review';
import styled from 'styled-components';

interface Props {
  seatAreaId: number;
  reviewId: number;
  reviewData: ReviewDetailType;
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const seatAreaId = Number(query.seatAreaId);
  const reviewId = Number(query.reviewId);

  try {
    const reviewData = await getReviewDetailAPI(seatAreaId, reviewId);
    return { props: { seatAreaId, reviewId, reviewData } };
  } catch {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  }
};

const ReviewPage: NextPage<Props> = ({ seatAreaId, reviewId, reviewData }) => {
  return (
    <Wrapper>
      <Head>
        <title>시야아카이브 - {reviewData.concertHallName}</title>
      </Head>
      <Header />
      <ImgViewer imgList={reviewData.imageUrlArray} userId="시야봇" />
      <ReviewWrapper>
        <Review
          reviewId={reviewId}
          reviewText={reviewData.review}
          concertHall={reviewData.concertHallName}
          seatArea={reviewData.seatArea}
          createAt={reviewData.createAt}
        />
      </ReviewWrapper>
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

const ReviewWrapper = styled.div`
  border-radius: 20px;
  box-shadow: ${({ theme }) => theme.boxShadow.normal};
`;
