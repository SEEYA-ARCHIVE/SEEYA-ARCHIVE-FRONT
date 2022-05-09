import React, { FC } from 'react';
import styled from 'styled-components';
import { NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';

import { FABButton } from 'src/components/common/FABButton/FABButton';
import { Header } from 'src/components/common/header/Header';
import { Seats } from 'src/components/common/seats/Seats';

import { FABCompareBox } from 'src/components/seatPage/FABCompareBox/FABCompareBox';
import { SeatInfo } from 'src/components/seatPage/seatInfo/SeatInfo';

import oylmpicData from 'src/components/common/seats/data/seatOlympic.json';
import { getSeatAreaAPI, SeatAreaType } from 'src/api/seat';

interface Props {
  hallId: number;
  seatsData: SeatAreaType[];
}

const Seat: NextPage<Props> = ({ hallId, seatsData }) => {
  return (
    <SeatPageWrapper>
      <Header />
      <SeatInfo hallId={hallId} />
      <Seats hallId={hallId} seatsData={seatsData} data={oylmpicData} className="seats" />
      <FABButton value="문의 및 건의" bgColor="mint" position={{ bottom: 135, right: 90 }} />
      <FABButton value="업로드" bgColor="yellow" position={{ bottom: 40, right: 90 }} />
    </SeatPageWrapper>
  );
};

Seat.getInitialProps = async ({ query }) => {
  const hallId = Number(query.hallId) ?? 1;
  const seatsData = await getSeatAreaAPI(hallId);

  return { hallId, seatsData };
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
  }
`;
