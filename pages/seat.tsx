import React, { FC } from 'react';
import { FABButton } from 'src/components/common/FABButton/FABButton';
import { Header } from 'src/components/common/header/Header';
import { Seats } from 'src/components/common/seats/Seats';
import { SeatInfo } from 'src/components/seatPage/seatInfo/SeatInfo';
import styled from 'styled-components';

interface Props {}

const Seat: FC<Props> = () => {
  return (
    <SeatPageWrapper>
      <Header />
      <SeatInfo />
      <Seats name="seatsOlympicHall" className="seats" />
      <FABButton value="문의 및 건의" bgColor="mint" position={{ bottom: 135, right: 90 }} />
      <FABButton value="업로드" bgColor="yellow" position={{ bottom: 40, right: 90 }} />
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
  }
`;
