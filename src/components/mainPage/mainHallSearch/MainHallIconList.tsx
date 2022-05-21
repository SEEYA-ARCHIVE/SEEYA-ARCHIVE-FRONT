import React, { FC } from 'react';
import styled from 'styled-components';

import { Button } from 'src/components/common/button/Button';
import { HallListType } from 'src/api/hall';
import { HallIcon } from './HallIcon';

interface Props {
  hallData: HallListType;
}

const HALL_LIST = [
  { name: '올림픽홀', key: 'Olympichall' },
  // { name: '고척 스카이돔', key: 'Skydome' },
  // { name: '화정 체육관', key: 'Hwajunggym' },
  // { name: '올림픽 체조경기장', key: 'KSPOdome' },
  // { name: '잠실 실내체육관', key: 'Jamsilgym' },
];

export const MainHallIconList: FC<Props> = ({ hallData }) => {
  return (
    <>
      <HallList>
        {HALL_LIST.map((data) => {
          const currentHallData = hallData.find((hall) => hall.name === data.name);
          return (
            <HallIcon
              key={data.key}
              concertHallId={currentHallData?.concertHallId}
              name={data.name}
              iconName={data.key}
            />
          );
        })}
      </HallList>
    </>
  );
};

const HallList = styled.div`
  display: flex;
  margin-bottom: 20px;
`;
