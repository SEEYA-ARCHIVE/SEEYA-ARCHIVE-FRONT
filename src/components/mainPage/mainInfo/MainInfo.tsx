import React, { FC } from 'react';
import styled from 'styled-components';

interface Props {}

export const MainInfo: FC<Props> = () => {
  return (
    <div>
      <MainTitle>
        <span className="seeya">시야</span>
        <span className="archive">아카이브</span>
      </MainTitle>
      <MainDesc>
        <p>콘서트를 기다리고 있나요?</p>
        <p>어떤 좌석의 시야가 더 좋을지 이곳에서 탐색하세요.</p>
        <p>최적의 앵글에서 최애를 영접하도록 도와드립니다!</p>
      </MainDesc>
    </div>
  );
};

const MainTitle = styled.div`
  font-size: 48px;
  line-height: 56px;
  margin-bottom: 32px;
  font-family: 'Black Han Sans', sans-serif;

  .archive {
    color: ${({ theme }) => theme.color.mint};
  }
`;

const MainDesc = styled.div`
  font-size: 12px;
  line-height: 20px;
  color: #333333;
`;
