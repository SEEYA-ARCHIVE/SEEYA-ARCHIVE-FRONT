import React, { FC } from 'react';
import styled from 'styled-components';

import { SeatAreaType } from 'src/api/seat';
import { SeatCompateButton } from './SeatCompateButton';

interface Props {
  hallId: number;
  seatsData: SeatAreaType[];
}

export const SeatInfo: FC<Props> = ({ hallId, seatsData }) => {
  const totalReviewCount = seatsData.reduce((acc, cur) => acc + cur.countReviews, 0);

  return (
    <SeatInfoWrapper>
      <h1>올림픽 홀</h1>
      <div>
        <span className="highlight">총 {totalReviewCount}개</span>의 사진 리뷰가 있습니다.
      </div>
      <SeatCompateButton />
    </SeatInfoWrapper>
  );
};

const SeatInfoWrapper = styled.div`
  h1 {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 16px;
  }
  font-size: 12px;
  .highlight {
    color: ${({ theme }) => theme.fontColor.blue};
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
