import React, { FC } from 'react';
import { Button } from 'src/components/common/button/Button';
import styled from 'styled-components';

interface Props {}

export const MainUpload: FC<Props> = () => {
  return (
    <MainUploadWrapper>
      <MainQuestion>콘서트 시야 사진을 가지고 계신가요?</MainQuestion>
      <Button bgColor="black">업로드</Button>
    </MainUploadWrapper>
  );
};

const MainUploadWrapper = styled.div`
  margin-bottom: 24px;
`;

export const MainQuestion = styled.div`
  margin: 12px 0;
  font-size: 12px;
  color: ${({ theme }) => theme.fontColor.gray};
`;
