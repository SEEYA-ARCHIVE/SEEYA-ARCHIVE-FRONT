import React, { FC } from 'react';
import styled from 'styled-components';

interface Props {}

export const Header: FC<Props> = () => {
  return (
    <HeaderWrapper>
      <MainTitle>시야 아카이브</MainTitle>
      <SubTitle>SEEYA-ARCHIVE</SubTitle>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  width: 100vw;
  height: 60px;
  background-color: ${({ theme }) => theme.color.gray5};

  display: flex;
  align-items: center;

  padding: 15px 50px;
`;

const MainTitle = styled.span`
  margin-right: 16px;
`;

const SubTitle = styled.span``;
