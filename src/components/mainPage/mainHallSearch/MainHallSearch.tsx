import React, { FC } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { Button } from 'src/components/common/button/Button';
import { MainQuestion } from '../mainUpload/MainUpload';
import Icon from 'src/components/common/icon/Icon';
import { HallListType } from 'src/api/hall';

interface Props {
  hallData: HallListType;
}

export const MainHallSearch: FC<Props> = ({ hallData }) => {
  const router = useRouter();

  return (
    <>
      <MainQuestion>유저가 올린 시야 사진을 탐색하세요!</MainQuestion>
      <HallButtonList>
        {hallData.map((hall) => (
          <Button
            key={hall.concertHallId}
            bgColor="yellow"
            onClick={() => {
              router.push(`seat?id=${hall.concertHallId}`);
            }}>
            {hall.name}
          </Button>
        ))}
        <Button bgColor="gray3">업로드</Button>
        <Button bgColor="gray3">업로드</Button>
        <AddButton>
          <Icon name="iconPlus" size={14} />
        </AddButton>
      </HallButtonList>
    </>
  );
};
const HallButtonList = styled.div`
  display: flex;
  margin-bottom: 20px;

  & > *:not(:first-child) {
    margin-left: 12px;
  }
`;

const AddButton = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.gray3};
`;
