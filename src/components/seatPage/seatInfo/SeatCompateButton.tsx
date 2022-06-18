import React, { FC } from 'react';
import styled, { css } from 'styled-components';

import { Button } from 'src/components/common/button/Button';
import Icon from 'src/components/common/icon/Icon';
import { useRouter } from 'next/router';
import { ROUTE } from 'src/route';

interface Props {}

export const SeatCompateButton: FC<Props> = () => {
  const router = useRouter();

  return (
    <Wrap>
      <CompareInfoWord>두 개의 구역을 동시에 비교하세요.</CompareInfoWord>
      <CompareButton
        bgColor="blue5"
        onClick={() => {
          router.push(ROUTE.SEAT_COMPARE);
        }}>
        <Icon name="iconSeatCompare" />
        비교 시작하기
      </CompareButton>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 36px;
`;

const CompareInfoWord = styled.div`
  font-size: 9px;
  color: #7b7b7b;
  margin-bottom: 8px;
  line-height: 9px;
  letter-spacing: -0.05em;
  text-align: center;
`;

const CompareButton = styled(Button)`
  width: 140px;
  height: 40px;
  font-size: 12px;
  font-weight: 700;

  svg {
    margin-right: 10px;
  }
`;
