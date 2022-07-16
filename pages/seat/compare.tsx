import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { GetServerSideProps, NextPage } from 'next';
import styled from 'styled-components';

import { SeatInfo } from 'src/components/seatPage/seatInfo/SeatInfo';
import { getSeatAreaAPI, SeatAreaType } from 'src/api/seat';
import { Header } from 'src/components/common/header/Header';
import { MiniSeats } from 'src/components/common/seats/MiniSeats';

import { ThumbnailList } from 'src/components/comparePage/thumbnailViewer/ThumbnailList';

import oylmpicData from 'src/components/common/seats/data/miniSeatOlympic.json';

/**MOCK */
import { reviewList1 } from 'src/api/mock/compareReviewList';
import { getSvgData } from 'src/utils/svg';
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { compareSeatState, getCompareSeatAreaSelector } from 'src/stores/compare';
import { CompareSeatAreaType, getCompareSeatAreaAPI } from 'src/api/compare';

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
  const selectedCompareArea = useRecoilValue(compareSeatState);
  const [leftCompareData, setLeftCompareData] = useState<CompareSeatAreaType[]>([]);
  const [rightCompareData, setRightCompareData] = useState<CompareSeatAreaType[]>([]);

  useEffect(() => {
    if (!selectedCompareArea.left) setLeftCompareData([]);
    (async () => {
      const res = await getCompareSeatAreaAPI(selectedCompareArea.left);
      setLeftCompareData(res);
    })();
  }, [selectedCompareArea.left]);

  useEffect(() => {
    if (!selectedCompareArea.right) setRightCompareData([]);
    (async () => {
      const res = await getCompareSeatAreaAPI(selectedCompareArea.right);
      setRightCompareData(res);
    })();
  }, [selectedCompareArea.right]);

  return (
    <ComparePageWrapper>
      <Head>
        <title>시야 아카이브 - 좌석 비교</title>
      </Head>
      <Header />
      <ComparePageContents>
        <SeatInfo hallId={hallId} seatsData={seatsData} mode="compare" />
        <ReviewList>
          <ThumbnailList reviewList={leftCompareData} type="left" />
          <ThumbnailList reviewList={rightCompareData} type="right" />
        </ReviewList>
      </ComparePageContents>
      <MiniSeats hallId={hallId} seatsData={seatsData} data={oylmpicData} className="seats" />
    </ComparePageWrapper>
  );
};

const ComparePageWrapper = styled.div`
  padding-top: 120px;
`;

const ComparePageContents = styled.div`
  display: flex;
  padding-left: 50px;
`;

const ReviewList = styled.div`
  display: flex;
  margin-left: 60px;
  & > div {
    margin-right: 16px;
  }
`;

export default Compare;
