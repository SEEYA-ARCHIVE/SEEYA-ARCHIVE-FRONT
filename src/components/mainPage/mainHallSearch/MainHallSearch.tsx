import React, { FC } from 'react';
import styled from 'styled-components';

import { Button } from 'src/components/common/button/Button';
import { MainQuestion } from '../mainUpload/MainUpload';
import Icon from 'src/components/common/icon/Icon';

interface Props {}

export const MainHallSearch: FC<Props> = () => {
  return (
    <>
      <MainQuestion>유저가 올린 시야 사진을 탐색하세요!</MainQuestion>
      <HallButtonList>
        <Button bgColor="yellow">올림픽홀 시야</Button>
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
