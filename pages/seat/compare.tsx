import React from 'react';
import Head from 'next/head';
import { GetServerSideProps, NextPage } from 'next';

import { SeatInfo } from 'src/components/seatPage/seatInfo/SeatInfo';
import { getSeatAreaAPI, SeatAreaType } from 'src/api/seat';
import { Header } from 'src/components/common/header/Header';
import styled from 'styled-components';

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

const compare: NextPage<Props> = ({ hallId, seatsData }) => {
  return (
    <ComparePageWrapper>
      <Head>
        <title>시야 아카이브 - 좌석 비교</title>
      </Head>
      <Header />
      <SeatInfo hallId={hallId} seatsData={seatsData} mode="compare" />
    </ComparePageWrapper>
  );
};

const ComparePageWrapper = styled.div`
  padding-top: 120px;
  padding-left: 50px;
`;

export default compare;
