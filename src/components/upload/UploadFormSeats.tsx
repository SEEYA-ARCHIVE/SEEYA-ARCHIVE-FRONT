import React, { FC, useState } from 'react';

import { UploadSeats } from '../common/seats/UploadSeats';
import uploadOlympicData from 'src/components/common/seats/data/uploadOlympic.json';
import styled from 'styled-components';
import { Select } from '../common/select/Select';
import { useRecoilValue } from 'recoil';
import { getHallListSelector } from 'src/stores/hall';

interface Props {}

export const UploadFormSeats: FC<Props> = () => {
  const hallList = useRecoilValue(getHallListSelector);
  const [selectedHall, setSelectedHall] = useState<number>();

  if (!hallList.length) return null;

  const hallListOptions = hallList.map((hall) => ({ label: hall.name, value: hall.concertHallId + '' }));

  return (
    <Wrap>
      <Title>공연장</Title>
      <Select
        value={selectedHall + ''}
        onChange={(selectHallId) => {
          setSelectedHall(+selectHallId);
        }}
        options={hallListOptions}
      />
      <UploadSeats hallId={1} data={uploadOlympicData} />
    </Wrap>
  );
};

const Wrap = styled.div`
  padding: 40px 43px 24px 43px;
`;

const Title = styled.div`
  margin-bottom: 12px;
  font-weight: 700;
`;
