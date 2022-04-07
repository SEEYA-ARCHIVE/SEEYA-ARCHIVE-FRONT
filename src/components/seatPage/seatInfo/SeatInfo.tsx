import React, { FC, useState } from 'react';
import { Select } from 'src/components/common/select/Select';
import styled from 'styled-components';

interface Props {}

//selector로 받아 올 변수
const SEAT_COUNT = 15;
const SEATS_OPTIONS = {
  2: ['B1', 'B2', 'C1', 'C2', 'C3', 'D1', 'D2', 'G', 'H'],
  3: ['A1', 'A2', 'A3', 'A4', 'C1', 'C2', 'C3', 'E1', 'E2', 'E3', 'E4', 'E5'],
};
type SeatType = typeof SEATS_OPTIONS;
type FloorType = keyof SeatType;

export const SeatInfo: FC<Props> = () => {
  const [floor, setFloor] = useState(Object.keys(SEATS_OPTIONS)[0]);
  const [section, setSection] = useState(SEATS_OPTIONS[floor as unknown as FloorType][0]);

  const floorOptions = Object.keys(SEATS_OPTIONS).map((floor) => ({ value: floor, label: `${floor}층` }));
  const sectionOptions = SEATS_OPTIONS[floor as unknown as FloorType].map((section) => ({
    value: section,
    label: section,
  }));

  return (
    <SeatInfoWrapper>
      <h1>올림픽 홀</h1>
      <div>
        <span>총 {SEAT_COUNT}</span>의 사진 리뷰가 있습니다.
      </div>
      <SelectBoxWrapper>
        <Select value={floor} onChange={setFloor} options={floorOptions} />
        <Select value={section} onChange={setSection} options={sectionOptions} />
        구역
      </SelectBoxWrapper>
    </SeatInfoWrapper>
  );
};

const SeatInfoWrapper = styled.div`
  h1 {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 8px;
  }
  font-size: 12px;
`;

const SelectBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  margin-top: 24px;
  & > * {
    margin-right: 10px;
  }
`;
