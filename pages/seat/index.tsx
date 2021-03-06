import React from 'react';
import styled from 'styled-components';
import { GetServerSideProps, NextPage } from 'next';

import { FABButton } from 'src/components/common/FABButton/FABButton';
import { Header } from 'src/components/common/header/Header';
import { Seats } from 'src/components/common/seats/Seats';

import { SeatInfo } from 'src/components/seatPage/seatInfo/SeatInfo';

import oylmpicData from 'src/components/common/seats/data/seatOlympic.json';
import { getSeatAreaAPI, SeatAreaType } from 'src/api/seat';
import { media } from 'src/styles/theme';
import Head from 'next/head';
import { UploadButton } from 'src/components/common/FABButton/UploadButton';

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

const Seat: NextPage<Props> = ({ hallId, seatsData }) => {
  const clickQnAButton = () => {
    window.open('https://forms.gle/NXi2paRYy2TX3FN57');
  };

  return (
    <SeatPageWrapper>
      <Head>
        <title>시야 아카이브 - 좌석 비교</title>
      </Head>
      <Header />
      <SeatInfo hallId={hallId} seatsData={seatsData} mode="seat" />
      <Seats hallId={hallId} seatsData={seatsData} data={oylmpicData} className="seats" />
      <FABButton
        value="문의 및 건의"
        bgColor="mint"
        position={{ bottom: 135, right: 90 }}
        className="qa_btn"
        onClick={clickQnAButton}
      />
      <UploadButton />
    </SeatPageWrapper>
  );
};

export default Seat;

const SeatPageWrapper = styled.div`
  padding-top: 120px;
  padding-left: 50px;

  .seats {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    ${media.tablet} {
      top: 250px;
      left: 50px;
      transform: none;
    }

    ${media.mobile} {
      left: 10px;
    }
  }

  .qa_btn {
    ${media.tablet} {
      bottom: 30px;
      right: 30px;
    }
  }
  .upload_btn {
    ${media.tablet} {
      right: 30px;
      bottom: -65px;
    }
  }
`;
