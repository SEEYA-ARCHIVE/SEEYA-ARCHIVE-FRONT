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
  const [selectedSeatArea, setSelectedSeatArea] = useState<{ floor: number; area: string }>();
  const [seatsData, setSeatsData] = useState<SeatAreaType[]>([]);

  const setSelectedArea = (floor: number, area: string) => {
    setSelectedSeatArea({ floor, area });
  };

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
      <SeatDetailWrap>
        <Select
          value={selectedHall + ''}
          onChange={(selectHallId) => {
            setSelectedHall(+selectHallId);
          }}
          options={hallList.map((hall) => ({ label: hall.name, value: hall.concertHallId + '' }))}
        />
        {selectedSeatArea && (
          <SeatDetail>
            {selectedSeatArea.floor}층 {selectedSeatArea.area.toUpperCase()}
          </SeatDetail>
        )}
      </SeatDetailWrap>
      <UploadSeats
        hallId={selectedHall ?? 1}
        data={uploadOlympicData}
        seatsData={seatsData}
        onChangeSeatAreaId={onChangeSeatAreaId}
        setSelectedArea={setSelectedArea}
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

const SeatDetailWrap = styled.div`
  display: flex;
  align-items: center;
`;

const SeatDetail = styled.div`
  margin-left: 8px;
  font-weight: 700;
  font-size: 14px;
`;
