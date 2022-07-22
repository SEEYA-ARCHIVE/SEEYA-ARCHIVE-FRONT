import React, { FC, useEffect, useState } from 'react';

import { UploadSeats } from '../common/seats/UploadSeats';
import uploadOlympicData from 'src/components/common/seats/data/uploadOlympic.json';
import styled from 'styled-components';
import { Select } from '../common/select/Select';
import { getHallListAPI, HallListType } from 'src/api/hall';
import { getSeatAreaAPI, SeatAreaType } from 'src/api/seat';

interface Props {
  onChangeSeatAreaId: (value: number) => void;
}

export const UploadFormSeats: FC<Props> = ({ onChangeSeatAreaId }) => {
  const [hallList, setHallList] = useState<HallListType>([]);
  const [selectedHall, setSelectedHall] = useState<number>();
  const [seatsData, setSeatsData] = useState<SeatAreaType[]>([]);

  const getHallList = async () => {
    const data = await getHallListAPI();
    setHallList(data);
  };

  const getSeatsData = async (hallId: number) => {
    const seatsData = await getSeatAreaAPI(hallId);

    setSeatsData(seatsData);
  };

  useEffect(() => {
    getHallList();
  }, []);

  useEffect(() => {
    getSeatsData(selectedHall ?? 1);
  }, [selectedHall]);

  return (
    <Wrap>
      <Title>공연장</Title>
      <Select
        value={selectedHall + ''}
        onChange={(selectHallId) => {
          setSelectedHall(+selectHallId);
        }}
        options={hallList.map((hall) => ({ label: hall.name, value: hall.concertHallId + '' }))}
      />
      <UploadSeats
        hallId={selectedHall ?? 1}
        data={uploadOlympicData}
        seatsData={seatsData}
        onChangeSeatAreaId={onChangeSeatAreaId}
      />
    </Wrap>
  );
};

const Wrap = styled.div`
  padding: 40px 43px 24px 43px;
  min-height: 349px;
`;

const Title = styled.div`
  margin-bottom: 12px;
  font-weight: 700;
`;
