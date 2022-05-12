import React, { FC } from 'react';
import styled from 'styled-components';

import Icon from 'src/components/common/icon/Icon';

interface Props {}

export const MainInfo: FC<Props> = () => {
  return (
    <Wrapper>
      <Icon name="iconMainTypoLogo" className="main-icon" />
      <div className="main-title">
        <p>
          <span className="highlight">콘서트</span>를
        </p>
        <p>기다리고 있나요?</p>
      </div>
      <div className="main-desc">
        <p>어떤 좌석의 시야가 더 좋을지 이곳에서 탐색하세요!</p>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-bottom: 70px;
  min-width: 500px;

  .main-icon {
    margin-bottom: 20px;
  }

  .highlight {
    color: ${({ theme }) => theme.color.mint};
  }

  .main-title {
    font-family: 'Black Han Sans', sans-serif;
    font-size: 40px;
    font-weight: 400;
    line-height: 1.15;
    margin-bottom: 20px;
  }

  .main-desc {
    font-weight: 500px;
    color: ${({ theme }) => theme.fontColor.gray};
  }
`;
