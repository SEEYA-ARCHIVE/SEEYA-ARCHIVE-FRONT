import React, { FC } from 'react';
import styled from 'styled-components';
import Icon from '../icon/Icon';

interface Props {}

export const Header: FC<Props> = () => {
  return (
    <HeaderWrapper>
      <Icon name="iconTypoLogo" />
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  width: 100vw;
  height: 80px;

  display: flex;
  align-items: center;

  padding: 20px;

  position: absolute;
  top: 0;
  left: 0;
`;
