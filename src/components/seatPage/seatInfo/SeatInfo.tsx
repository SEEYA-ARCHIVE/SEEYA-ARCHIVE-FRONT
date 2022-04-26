import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

import { useRecoilValueLoadable } from 'recoil';
import { MOCK_SEAT_AREA } from 'src/api/mock/seat_areas';
import { Select } from 'src/components/common/select/Select';
import { getSeatArea } from 'src/stores/seat';

import oylmpicData from 'src/components/common/seats/data/seatOlympic.json';

interface Props {
  hallId: number;
}

//selector로 받아 올 변수
const SEAT_COUNT = 15;

const mock = MOCK_SEAT_AREA;
const MOCK_SEAT_DATA = oylmpicData;

export const SeatInfo: FC<Props> = ({ hallId }) => {
  const seatArea = useRecoilValueLoadable(getSeatArea(hallId));

  const [floor, setFloor] = useState('2');
  const [section, setSection] = useState('');
  /**
   * TODO: 비동기 값적용
   */
  const sectionOptions = MOCK_SEAT_DATA.word.reduce((acc, { floor, area }) => {
    if (!floor || !area) return acc;

    const areaUppserCase = area.toUpperCase();
    if (floor in acc) {
      acc[floor].push({ value: areaUppserCase, label: areaUppserCase });
    } else {
      acc[floor] = [{ value: areaUppserCase, label: areaUppserCase }];
    }
    return acc;
  }, {} as Record<string, { value: string; label: string }[]>);

  const floorOptions = Object.keys(sectionOptions).map((floor) => {
    return { value: floor, label: `${floor}층` };
  });

  return (
    <SeatInfoWrapper>
      <h1>올림픽 홀</h1>
      <SelectBoxWrapper>
        <Select value={floor} onChange={setFloor} options={floorOptions} />
        <Select
          value={section}
          onChange={setSection}
          options={sectionOptions[floor].sort((a, b) => a.label.localeCompare(b.label))}
        />
        구역
      </SelectBoxWrapper>
      <div>
        <span className="highlight">총 {SEAT_COUNT}</span>의 사진 리뷰가 있습니다.
      </div>
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
  .highlight {
    color: ${({ theme }) => theme.fontColor.mint};
  }
`;

const SelectBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  margin-bottom: 18px;
  & > * {
    margin-right: 10px;
  }
`;
