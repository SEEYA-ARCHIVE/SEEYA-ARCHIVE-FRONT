import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

import { MOCK_SEAT_AREA } from 'src/api/mock/seat_areas';
import { Select } from 'src/components/common/select/Select';

import oylmpicData from 'src/components/common/seats/data/seatOlympic.json';
import { Button } from 'src/components/common/button/Button';
import { SeatAreaType } from 'src/api/seat';
import useModal from 'src/hooks/useModal';
import { AlertModal } from 'src/components/common/modal/AlertModal';
import { useRecoilState } from 'recoil';
import { selectSeatAtom } from 'src/stores/seat';
import ReviewListModal from 'src/components/common/modal/ReviewListModal';

interface Props {
  hallId: number;
  seatsData: SeatAreaType[];
}

export const SeatInfo: FC<Props> = ({ seatsData }) => {
  const { openModal } = useModal();
  const [selectSeat, setSelectSeat] = useRecoilState(selectSeatAtom);

  const totalReviewCount = seatsData.reduce((acc, cur) => acc + cur.countReviews, 0);

  /**
   * TODO: 서버에서 배치도 데이터 받아오면 그때 적용
   */
  const areaOptions = oylmpicData.word.reduce((acc, { floor, area }) => {
    if (!floor || !area) return acc;

    const areaUppserCase = area.toUpperCase();
    if (floor in acc) {
      acc[floor].push({ value: areaUppserCase, label: areaUppserCase });
    } else {
      acc[floor] = [{ value: areaUppserCase, label: areaUppserCase }];
    }
    return acc;
  }, {} as Record<string, { value: string; label: string }[]>);

  const floorOptions = Object.keys(areaOptions).map((floor) => {
    return { value: floor, label: `${floor}층` };
  });

  const setFloor = (selectFloor: string) => {
    setSelectSeat(({ area }) => ({ area, floor: selectFloor }));
  };
  const setArea = (selectArea: string) => {
    setSelectSeat(({ floor }) => ({ floor, area: selectArea }));
  };

  const handleSelectClick = () => {
    const areaData = seatsData.find(
      (data) => data.floor.toString() === selectSeat.floor && data.area === selectSeat.area,
    );

    if (!areaData?.countReviews) {
      openModal(<AlertModal type="NO_SEAT" />);
    }else {
      openModal(<ReviewListModal seatAreaId={areaData.seatAreaId} />);
    }
  };

  return (
    <SeatInfoWrapper>
      <h1>올림픽 홀</h1>
      <SelectBoxWrapper>
        <Select value={selectSeat.floor} onChange={setFloor} options={floorOptions} />
        <Select
          value={selectSeat.area}
          onChange={setArea}
          options={areaOptions[selectSeat.floor].sort((a, b) => a.label.localeCompare(b.label))}
        />
        <span>구역</span>
        <Button className="seat_select_btn" bgColor="mint" onClick={handleSelectClick}>
          선택
        </Button>
      </SelectBoxWrapper>
      <div>
        <span className="highlight">총 {totalReviewCount}개</span>의 사진 리뷰가 있습니다.
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

  .seat_select_btn {
    width: 44px;
    height: 34px;
    padding: 0;
    border-radius: 4px;
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
