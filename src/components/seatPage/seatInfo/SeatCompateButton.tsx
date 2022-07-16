import React, { FC } from 'react';
import styled from 'styled-components';

import { Button } from 'src/components/common/button/Button';
import Icon from 'src/components/common/icon/Icon';
import { useRouter } from 'next/router';
import { ROUTE } from 'src/route';
import { useSetRecoilState } from 'recoil';
import { compareSeatState } from 'src/stores/compare';

interface Props {
  hallId: number;
  isSeatMode: boolean;
}

export const SeatCompateButton: FC<Props> = ({ hallId, isSeatMode }) => {
  const setCompareSeat = useSetRecoilState(compareSeatState);
  const router = useRouter();

  return (
    <Wrap isSeatMode={isSeatMode}>
      {isSeatMode && <CompareInfoWord>두 개의 구역을 동시에 비교하세요.</CompareInfoWord>}
      <CompareButton
        bgColor={isSeatMode ? 'blue5' : 'white'}
        borderColor={!isSeatMode ? 'blue5' : undefined}
        color={!isSeatMode ? 'blue5' : undefined}
        borderRadius="8px"
        onClick={() => {
          isSeatMode && setCompareSeat({ left: null, right: null });
          router.push({ pathname: isSeatMode ? ROUTE.SEAT_COMPARE : ROUTE.SEAT, query: { hallId } });
        }}>
        {isSeatMode ? (
          <>
            <Icon name="iconSeatCompare" />
            <span>비교 시작하기</span>
          </>
        ) : (
          <span>배치도로 돌아가기</span>
        )}
      </CompareButton>
    </Wrap>
  );
};

const Wrap = styled.div<{ isSeatMode: boolean }>`
  width: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: ${({ isSeatMode }) => (isSeatMode ? '36px' : '16px')};
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
