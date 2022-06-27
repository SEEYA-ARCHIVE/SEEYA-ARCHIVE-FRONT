import React, { useEffect, useRef } from 'react';
import Head from 'next/head';
import { GetServerSideProps, NextPage } from 'next';

import { SeatInfo } from 'src/components/seatPage/seatInfo/SeatInfo';
import { getSeatAreaAPI, SeatAreaType } from 'src/api/seat';
import { Header } from 'src/components/common/header/Header';
import styled from 'styled-components';

import { ThumbnailList } from 'src/components/comparePage/thumbnailViewer/ThumbnailList';

import oylmpicData from 'src/components/common/seats/data/miniSeatOlympic.json';

/**MOCK */
import { reviewList1 } from 'src/api/mock/compareReviewList';
import { getSvgData } from 'src/utils/svg';
import { Seats } from 'src/components/common/seats/Seats';

interface Props {
  hallId: number;
  seatsData: SeatAreaType[];
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const hallId = Number(query.hallId) ?? 1;
  const seatsData = await getSeatAreaAPI(hallId);

  if (!seatsData) {
    return {
      redirect: {
        destination: `/seat?hallId=${hallId}`,
        permanent: false,
      },
    };
  }

  return { props: { hallId, seatsData } };
};

const Compare: NextPage<Props> = ({ hallId, seatsData }) => {
  const k = useRef<any>(null);
  console.log('??', k.current);
  useEffect(() => {
    getSvgData(k.current);
  });
  return (
    <ComparePageWrapper>
      <Head>
        <title>시야 아카이브 - 좌석 비교</title>
      </Head>
      <Header />
      <ComparePageContents>
        <SeatInfo hallId={hallId} seatsData={seatsData} mode="compare" />
        <ReviewList>
          <ThumbnailList reviewList={reviewList1} />
          <ThumbnailList reviewList={[]} />
        </ReviewList>
      </ComparePageContents>
      <Seats hallId={hallId} seatsData={seatsData} data={oylmpicData} className="seats" />
    </ComparePageWrapper>
  );
};

const ComparePageWrapper = styled.div`
  padding-top: 120px;
  padding-left: 50px;
`;

const ComparePageContents = styled.div`
  display: flex;
`;

const ReviewList = styled.div`
  display: flex;
  margin-left: 60px;
  & > div {
    margin-right: 16px;
  }
`;

export default Compare;
